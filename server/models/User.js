const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

       role: {
      type: String,
      enum: [
        "user",
        "super_admin",
        "user_admin",
        "template_admin",
        "payment_admin",
        "support_admin"
      ],
      default: "user"
    },


    password: {
      type: String,
      required: true,
      minlength: 6
    },


    // =========================
    // EMAIL VERIFICATION
    // =========================

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    // OTP is stored temporarily
    emailOtp: {
      type: String,
      default: null
    },

    // OTP expiration time
    emailOtpExpires: {
      type: Date,
      default: null
    },


    // =========================
    // PASSWORD RESET
    // =========================

    resetOtp: {
      type: String,
      default: null
    },

    resetOtpExpires: {
      type: Date,
      default: null
    },


    // =========================
    // SUBSCRIPTION
    // =========================

    plan: {
      type: String,
      enum: [
        "free",
        "premium",
        "premium_plus"
      ],
      default: "free"
    },

    planExpiresAt: {
  type: Date,
  default: null
},

    
    // =========================
    // FREE INVITATIONS
    // =========================

    freeInvitationsUsed: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);


const User =
  mongoose.model(
    "User",
    userSchema
  );


module.exports = User;