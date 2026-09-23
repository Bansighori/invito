const express = require("express");

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  getAdminDashboardStats
} = require("../controllers/adminDashboardController");

const {
  getAllUsers
} = require("../controllers/adminUserController");
const {
  getAdminInvitations
} = require(
  "../controllers/adminInvitationController"
);

const router = express.Router();

router.get(
  "/test",
  adminAuthMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Admin authentication is working",
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role
      }
    });
  }
);

router.get(
  "/dashboard/stats",
  adminAuthMiddleware,
  getAdminDashboardStats
);

router.get(
  "/users",
  adminAuthMiddleware,
  getAllUsers
);

router.get(
  "/invitations",
  adminAuthMiddleware,
  getAdminInvitations
);

module.exports = router;