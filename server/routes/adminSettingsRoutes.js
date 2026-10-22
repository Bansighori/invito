const express = require("express");

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  getAdminProfile,
  updateAdminProfile,
} = require("../controllers/adminSettingsController");

const router = express.Router();

// ==========================================
// ADMIN PROFILE
// ==========================================

// GET /api/admin/settings/profile
router.get(
  "/profile",
  adminAuthMiddleware,
  getAdminProfile
);

// PUT /api/admin/settings/profile
router.put(
  "/profile",
  adminAuthMiddleware,
  updateAdminProfile
);

module.exports = router;