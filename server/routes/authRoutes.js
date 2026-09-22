const express = require("express");

const {
  sendRegisterOtp,
  verifyRegisterOtp,
  sendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  resetPassword,
  loginUser,
  googleLogin,
  updateProfile,
  changePassword,
  getCurrentUser
} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// REGISTER OTP
// ==========================================

router.post(
  "/send-register-otp",
  sendRegisterOtp
);

router.post(
  "/verify-register-otp",
  verifyRegisterOtp
);

// ==========================================
// FORGOT PASSWORD OTP
// ==========================================

router.post(
  "/send-forgot-password-otp",
  sendForgotPasswordOtp
);

router.post(
  "/verify-forgot-password-otp",
  verifyForgotPasswordOtp
);



router.post(
  "/reset-password",
  resetPassword
);
// ==========================================
// LOGIN
// ==========================================

router.post(
  "/login",
  loginUser
);

router.post("/google", googleLogin);
// ==========================================
// PROTECTED ROUTES
// ==========================================

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

router.get(
  "/me",
  authMiddleware,
  getCurrentUser
);

module.exports = router;