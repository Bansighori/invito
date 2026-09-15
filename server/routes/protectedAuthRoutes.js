const express = require("express");

const {
  updateProfile,
  changePassword,
  getCurrentUser
} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// AUTHENTICATION MIDDLEWARE
// ========================================

router.use(authMiddleware);


// ========================================
// GET CURRENT USER
// ========================================

router.get(
  "/me",
  getCurrentUser
);


// ========================================
// UPDATE PROFILE
// ========================================

router.put(
  "/profile",
  updateProfile
);


// ========================================
// CHANGE PASSWORD
// ========================================

router.put(
  "/change-password",
  changePassword
);


module.exports = router;