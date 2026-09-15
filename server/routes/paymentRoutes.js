const express = require("express");

const {
  createPremiumOrder,
  createPremiumPlusOrder,
  verifyPremiumPayment,
  verifyPremiumPlusPayment,
  markPaymentFailed,
  getPaymentHistory
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create-order",
  authMiddleware,
  createPremiumOrder
);

router.post(
  "/verify",
  authMiddleware,
  verifyPremiumPayment
);

router.post(
  "/create-premium-plus",
  authMiddleware,
  createPremiumPlusOrder
);

router.post(
  "/verify-premium-plus",
  authMiddleware,
  verifyPremiumPlusPayment
);

// PAYMENT FAILED
router.post(
  "/failed",
  authMiddleware,
  markPaymentFailed
);

// PAYMENT HISTORY
router.get(
  "/history",
  authMiddleware,
  getPaymentHistory
);

module.exports = router;