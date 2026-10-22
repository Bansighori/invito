
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const app = express();

// Database and template setup
const connectDB = require("./config/db");
const seedTemplatesIfEmpty = require("./config/seedTemplatesIfEmpty");

// Routes
const templateRoutes = require("./routes/templateRoutes");
const invitationRoutes = require("./routes/invitationRoutes");
const guestRoutes = require("./routes/guestRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const planRoutes = require("./routes/planRoutes");

const adminRoutes = require("./routes/adminRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminTemplateRoutes = require("./routes/adminTemplateRoutes");
const adminPaymentRoutes = require("./routes/adminPaymentRoutes");
const adminPlanRoutes = require("./routes/adminPlanRoutes");
const adminNotificationRoutes = require("./routes/adminNotificationRoutes");
const adminRoleRoutes = require("./routes/adminRoleRoutes");
const adminSettingsRoutes = require("./routes/adminSettingsRoutes");

const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");

const checkPlanExpiry = require("./utils/checkPlanExpiry");

// CORS CONFIGURATION
const allowedOrigins = [
  "http://localhost:5173",
  "https://invito-zeta.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as server-to-server.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// DATABASE MIDDLEWARE
app.use(async (req, res, next) => {
  try {
    await connectDB();
    await seedTemplatesIfEmpty();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    let message = "Database connection failed";

    if (error.message === "MONGO_URI is not defined") {
      message = "MONGO_URI is not set in environment variables";
    } else if (
      error.message.includes("127.0.0.1") ||
      error.message.includes("localhost")
    ) {
      message =
        "MONGO_URI points to localhost. Use a MongoDB Atlas connection string on Vercel";
    } else if (process.env.NODE_ENV !== "production") {
      message = error.message;
    }

    res.status(500).json({
      success: false,
      message,
    });
  }
});

// PLAN EXPIRY CHECK
// Runs every day at 9:00 AM according to the server's timezone.
cron.schedule("0 9 * * *", async () => {
  console.log("Running daily plan expiry check...");

  try {
    await checkPlanExpiry();
  } catch (error) {
    console.error("Plan expiry check failed:", error.message);
  }
});

// HEALTH CHECK ROUTES
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Invito API is running",
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Invito API is running",
  });
});

// USER ROUTES
app.use("/api/templates", templateRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);

// ADMIN ROUTES
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/payments", adminPaymentRoutes);
app.use("/api/admin/templates", adminTemplateRoutes);
app.use("/api/admin/plans", adminPlanRoutes);
app.use("/api/admin/notifications", adminNotificationRoutes);
app.use("/api/admin/roles", adminRoleRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
