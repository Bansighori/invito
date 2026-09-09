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

// Connect MongoDB
connectDB();

const app = express();

const PORT =
  process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

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

app.listen(
  PORT,
  () => {

    console.log(
      `Invito server running on http://localhost:${PORT}`
    );

  }
);