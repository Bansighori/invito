const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "free",
        "premium",
        "premium_plus"
      ]
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    duration: {
      type: String,
      required: true
    },

    invitationLimit: {
      type: mongoose.Schema.Types.Mixed,
      default: "Unlimited"
    },

    description: {
      type: String,
      default: ""
    },

    features: {
      type: [String],
      default: []
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;