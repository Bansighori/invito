const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    otp: {
      type: String,
      required: true
    },

    purpose: {
      type: String,
      enum: [
        "register",
        "forgot_password"
      ],
      required: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true
    },

    verified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Otp =
  mongoose.model("Otp", otpSchema);

module.exports = Otp;