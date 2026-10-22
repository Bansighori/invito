const express = require("express");

const {
  getRoles,
  getAllAdmins,
  createAdmin,
  deleteAdmin
} = require("../controllers/adminRoleController");

const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");

const requireRole =
  require("../middleware/adminRoleMiddleware");

const router = express.Router();


// ==========================================
// GET ROLES
// Super Admin only
// ==========================================

router.get(
  "/",
  adminAuthMiddleware,
  requireRole("super_admin"),
  getRoles
);


// ==========================================
// GET ALL ADMINS
// Super Admin only
// ==========================================

router.get(
  "/admins",
  adminAuthMiddleware,
  requireRole("super_admin"),
  getAllAdmins
);


// ==========================================
// CREATE ADMIN
// Super Admin only
// ==========================================

router.post(
  "/admins",
  adminAuthMiddleware,
  requireRole("super_admin"),
  createAdmin
);


// ==========================================
// DELETE ADMIN
// Super Admin only
// ==========================================

router.delete(
  "/admins/:id",
  adminAuthMiddleware,
  requireRole("super_admin"),
  deleteAdmin
);


module.exports = router;