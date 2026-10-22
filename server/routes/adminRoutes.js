const express = require("express");

const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");

const requireRole =
  require("../middleware/adminRoleMiddleware");

const {
  getAdminDashboardStats
} = require("../controllers/adminDashboardController");

const {
  getAllUsers,
  getUserById
} = require("../controllers/adminUserController");

const {
  getAdminInvitations
} = require("../controllers/adminInvitationController");

const router = express.Router();


// ==========================================
// ADMIN TEST
// All authenticated admins
// ==========================================

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


// ==========================================
// DASHBOARD
// All authenticated admins
// ==========================================

router.get(
  "/dashboard/stats",
  adminAuthMiddleware,
  getAdminDashboardStats
);


// ==========================================
// USERS
// View Users:
// Super Admin + User Admin + Support Admin
// ==========================================

router.get(
  "/users",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "user_admin",
    "support_admin"
  ),
  getAllUsers
);


// ==========================================
// GET SINGLE USER
// View Users:
// Super Admin + User Admin + Support Admin
// ==========================================

router.get(
  "/users/:id",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "user_admin",
    "support_admin"
  ),
  getUserById
);


// ==========================================
// INVITATIONS
// View Invitations:
// Super Admin + Support Admin
// ==========================================

router.get(
  "/invitations",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "support_admin"
  ),
  getAdminInvitations
);


module.exports = router;