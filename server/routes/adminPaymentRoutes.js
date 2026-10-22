const express = require("express");

const {
  getAdminPayments,
  getAdminPaymentStats,
  getAdminPayment
} = require("../controllers/adminPaymentController");

const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");

const requireRole =
  require("../middleware/adminRoleMiddleware");

const router = express.Router();


// ==========================================
// ALL PAYMENTS
// Super Admin + Payment Admin
// ==========================================

router.get(
  "/",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "payment_admin"
  ),
  getAdminPayments
);

// ==========================================
// PAYMENT STATISTICS
// Super Admin + Payment Admin
// ==========================================

router.get(
  "/stats",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "payment_admin"
  ),
  getAdminPaymentStats
);


// ==========================================
// SINGLE PAYMENT
// Super Admin + Payment Admin
// ==========================================

router.get(
  "/:id",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "payment_admin"
  ),
  getAdminPayment
);


module.exports = router;