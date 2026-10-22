
const mongoose = require("mongoose");

const adminNotificationSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    message: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: [
        "user",
        "payment",
        "invitation",
        "security"
      ],
      default: "system"
    },

    isRead: {
      type: Boolean,
      default: false
    },

    link: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const AdminNotification = mongoose.model(
  "AdminNotification",
  adminNotificationSchema
);

module.exports = AdminNotification;