const cron = require("node-cron");
const User = require("../models/User");
const Notification = require("../models/Notification");

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

// Use India time for daily notification keys.
function getIndiaDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

async function createPlanNotification(io, user, kind, daysLeft) {
  const expiry = new Date(user.planExpiresAt);
  const today = getIndiaDateKey();

  const dedupeKey =
    `${user._id}_${expiry.toISOString()}_${kind}_${today}`;

  const planName =
    user.plan === "premium_plus"
      ? "Premium Plus"
      : "Premium";

  let title;
  let message;

  if (kind === "before_expiry") {
    title = "Your plan is expiring soon";
    message =
      daysLeft === 1
        ? `Your ${planName} plan expires tomorrow. Renew now!`
        : `Your ${planName} plan expires in ${daysLeft} days. Renew now!`;
  } else {
    title = "Renew your premium plan";
    message =
      `Your ${planName} plan has expired. ` +
      "Purchase a plan again to enjoy premium features.";
  }

  try {
    const notification = await Notification.create({
      userId: user._id,
      title,
      message,
      type: "plan",
      link: "/pricing",
      dedupeKey
    });

    io.to(`user_${user._id}`).emit(
      "new_notification",
      notification.toObject()
    );
  } catch (error) {
    // A duplicate key means today's notification already exists.
    if (error.code !== 11000) {
      console.error(
        `Plan notification failed for ${user._id}:`,
        error
      );
    }
  }
}

async function checkPlanExpiries(io) {
  try {
    const now = new Date();
    const today = getIndiaDateKey(now);

    // Calculate the current India calendar-day boundaries.
    const indiaTodayStart = new Date(
      `${today}T00:00:00+05:30`
    );

    const indiaTomorrowStart = new Date(
      indiaTodayStart.getTime() + DAY_MS
    );

    const fiveDaysLater = new Date(
      now.getTime() + 5 * DAY_MS
    );

    // Active paid plans expiring in the next five days.
    const upcomingUsers = await User.find({
      plan: { $in: ["premium", "premium_plus"] },
      planExpiresAt: {
        $gt: now,
        $lte: fiveDaysLater
      }
    }).lean();

    for (const user of upcomingUsers) {
      const expiry = new Date(user.planExpiresAt);

      const daysLeft = Math.max(
        1,
        Math.ceil((expiry.getTime() - now.getTime()) / DAY_MS)
      );

      await createPlanNotification(
        io,
        user,
        "before_expiry",
        daysLeft
      );
    }

    // Paid plans expired at least three days ago.
    // Include users whose plan has not yet been reset to "free".
    const expiredUsers = await User.find({
      plan: { $in: ["premium", "premium_plus"] },
      planExpiresAt: {
        $ne: null,
        $lt: new Date(indiaTodayStart.getTime() - 3 * DAY_MS)
      }
    }).lean();

    for (const user of expiredUsers) {
      await createPlanNotification(
        io,
        user,
        "after_expiry",
        0
      );
    }

    console.log("Plan expiry notifications checked.");
  } catch (error) {
    console.error("Plan expiry check failed:", error);
  }
}

function startPlanExpiryNotifications(io) {
  // Check immediately when the server starts.
  checkPlanExpiries(io);

  // Check every hour.
  cron.schedule("0 * * * *", () => {
    checkPlanExpiries(io);
  });

  console.log("Plan expiry notification scheduler started.");
}

module.exports = startPlanExpiryNotifications;
