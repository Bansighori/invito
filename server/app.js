const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, ".env")
});

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const seedTemplatesIfEmpty =
  require("./config/seedTemplatesIfEmpty");

const templateRoutes =
  require("./routes/templateRoutes");

const invitationRoutes =
  require("./routes/invitationRoutes");

const guestRoutes =
  require("./routes/guestRoutes");

const authRoutes =
  require("./routes/authRoutes");

const paymentRoutes =
  require("./routes/paymentRoutes");

const adminRoutes = require("./routes/adminRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

dotenv.config({
  path: path.join(__dirname, ".env")
});
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASSWORD exists:",
  !!process.env.EMAIL_PASSWORD
);
console.log(
  "EMAIL_PASSWORD length:",
  process.env.EMAIL_PASSWORD
    ? process.env.EMAIL_PASSWORD.length
    : 0
);
const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    await seedTemplatesIfEmpty();
    next();
  } catch (error) {
    console.error(
      "Database connection failed:",
      error.message
    );

    let message = "Database connection failed";

    if (error.message === "MONGO_URI is not defined") {
      message =
        "MONGO_URI is not set in environment variables";
    } else if (
      error.message.includes("127.0.0.1") ||
      error.message.includes("localhost")
    ) {
      message =
        "MONGO_URI points to localhost. Use a MongoDB Atlas connection string on Vercel";
    } else if (
      process.env.NODE_ENV !== "production"
    ) {
      message = error.message;
    }

    res.status(500).json({
      success: false,
      message
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Invito API is running"
  });
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Invito API is running"
  });
});

app.use(
  "/api/templates",
  templateRoutes
);

app.use(
  "/api/invitations",
  invitationRoutes
);

app.use(
  "/api/guests",
  guestRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/admin/auth",
  adminAuthRoutes
);

module.exports = app;
