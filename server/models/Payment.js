const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // ============================================
    // USER
    // ============================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // ============================================
    // PLAN
    // ============================================

    plan: {
      type: String,
      enum: [
        "premium",
        "premium_plus"
      ],
      required: true
    },

    // ============================================
    // AMOUNT
    // ============================================

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    },

    // ============================================
    // RAZORPAY ORDER
    // ============================================

    razorpayOrderId: {
      type: String,
      required: true,
      unique: true
    },

    // ============================================
    // RAZORPAY PAYMENT
    // ============================================

    razorpayPaymentId: {
      type: String,
      default: null
    },

    // ============================================
    // PAYMENT STATUS
    // ============================================

    status: {
      type: String,
      enum: [
        "created",
        "success",
        "failed"
      ],
      default: "created"
    },

    // ============================================
    // FAILURE INFORMATION
    // ============================================

    failureReason: {
      type: String,
      default: null
    },

    failureCode: {
      type: String,
      default: null
    },

    // ============================================
    // PAYMENT METHOD
    // ============================================

    paymentMethod: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Payment = mongoose.model(
  "Payment",
  paymentSchema
);

module.exports = Payment;