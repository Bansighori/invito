const express = require("express");

const {
  registerUser,
  loginUser,
  updateProfile,
  changePassword
} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// REGISTER
// ==========================================

router.post(
  "/register",
  registerUser
);


// ==========================================
// LOGIN
// ==========================================

router.post(
  "/login",
  loginUser
);


// ==========================================
// UPDATE PROFILE
// ==========================================

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);


// ==========================================
// CHANGE PASSWORD
// ==========================================

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);


module.exports = router;