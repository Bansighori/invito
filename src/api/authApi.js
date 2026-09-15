import api from "./axios";
import publicApi from "./publicApi";

// ==========================================
// LOGIN
// ==========================================

export const login = (credentials) =>
  publicApi.post(
    "/auth/login",
    credentials
  );


// ==========================================
// REGISTER - SEND OTP
// ==========================================

export const sendRegisterOtp = (userData) =>
  publicApi.post(
    "/auth/send-register-otp",
    userData
  );


// ==========================================
// REGISTER - VERIFY OTP
// ==========================================

export const verifyRegisterOtp = (userData) =>
  publicApi.post(
    "/auth/verify-register-otp",
    userData
  );


// ==========================================
// OLD REGISTER
// ==========================================

// Keep this temporarily in case another
// part of your project is still using it.

export const register = (userData) =>
  publicApi.post(
    "/auth/register",
    userData
  );


// ==========================================
// UPDATE PROFILE
// ==========================================

export const updateProfile = (profileData) =>
  api.put(
    "/auth/profile",
    profileData
  );


// ==========================================
// CHANGE PASSWORD
// ==========================================

export const changePassword = (passwordData) =>
  api.put(
    "/auth/change-password",
    passwordData
  );


// ==========================================
// FORGOT PASSWORD - SEND OTP
// ==========================================

export const sendForgotPasswordOtp = (data) =>
  publicApi.post(
    "/auth/send-forgot-password-otp",
    data
  );


// ==========================================
// FORGOT PASSWORD - VERIFY OTP
// ==========================================

export const verifyForgotPasswordOtp = (data) =>
  publicApi.post(
    "/auth/verify-forgot-password-otp",
    data
  );


// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPassword = (data) =>
  publicApi.post(
    "/auth/reset-password",
    data
  );