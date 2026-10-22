const User = require("../models/User");
const Notification = require("../models/Notification");

const createNotification =
  require("./createNotification");


const checkPlanExpiry = async () => {

  try {

    const now = new Date();


    // ========================================
    // 2 DAYS FROM NOW
    // ========================================

    const twoDaysFromNow =
      new Date(
        now.getTime() +
        2 * 24 * 60 * 60 * 1000
      );


    // ========================================
    // FIND PLANS EXPIRING SOON
    // ========================================

    const users = await User.find({

      plan: {
        $in: [
          "premium",
          "premium_plus"
        ]
      },

      planExpiresAt: {
        $gt: now,
        $lte: twoDaysFromNow
      }

    });


    // ========================================
    // CHECK EACH USER
    // ========================================

    for (const user of users) {

      const planName =
        user.plan === "premium_plus"
          ? "Premium Plus"
          : "Premium";


      const expiryDate =
        new Date(
          user.planExpiresAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric"
          }
        );


      // ========================================
      // UNIQUE MESSAGE
      // ========================================

      const message =
        `Your ${planName} plan expires on ${expiryDate}. Renew your plan to continue using premium features.`;


      // ========================================
      // CHECK EXISTING NOTIFICATION
      // ========================================

      const existingNotification =
        await Notification.findOne({

          userId: user._id,

          type: "plan",

          title:
            `${planName} Plan Expiring Soon`,

          message

        });


      // ========================================
      // SKIP DUPLICATE
      // ========================================

      if (existingNotification) {

        console.log(
          `Expiry notification already exists for ${user.email}`
        );

        continue;

      }


      // ========================================
      // CREATE NOTIFICATION
      // ========================================

      await createNotification({

        userId:
          user._id,

        title:
          `${planName} Plan Expiring Soon`,

        message,

        type:
          "plan",

        link:
          "/pricing"

      });


      console.log(
        `Expiry notification created for ${user.email}`
      );

    }


    console.log(
      `Plan expiry check completed. ${users.length} expiring plan(s) found.`
    );


  } catch (error) {

    console.error(
      "Plan expiry check error:",
      error
    );

  }

};


module.exports =
  checkPlanExpiry;