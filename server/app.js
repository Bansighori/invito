const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const templateRoutes =
  require("./routes/templateRoutes");

const invitationRoutes =
  require("./routes/invitationRoutes");

const guestRoutes =
  require("./routes/guestRoutes");

const authRoutes =
  require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error(
      "Database connection failed:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Database connection failed"
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

module.exports = app;
