const express = require("express");

const {
  getAdminPlans,
  getAdminPlan,
  updateAdminPlan,
  createAdminPlan
} = require("../controllers/adminPlanController");

const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");

const requireRole =
  require("../middleware/adminRoleMiddleware");

const router = express.Router();


// ==========================================
// GET ALL PLANS
// Super Admin + Payment Admin
// ==========================================

router.get(
  "/",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "payment_admin"
  ),
  getAdminPlans
);


// ==========================================
// CREATE PLAN
// Super Admin only
// ==========================================

router.post(
  "/",
  adminAuthMiddleware,
  requireRole(
    "super_admin"
  ),
  createAdminPlan
);


// ==========================================
// GET SINGLE PLAN
// Super Admin + Payment Admin
// ==========================================

router.get(
  "/:id",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "payment_admin"
  ),
  getAdminPlan
);


// ==========================================
// UPDATE PLAN
// Super Admin only
// ==========================================

router.put(
  "/:id",
  adminAuthMiddleware,
  requireRole(
    "super_admin"
  ),
  updateAdminPlan
);


module.exports = router;