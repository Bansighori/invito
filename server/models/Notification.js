const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {

    dedupeKey: {
  type: String,
  unique: true,
  sparse: true
},
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
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
        "rsvp",
        "payment",
        "invitation",
        "plan",
        "system"
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

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

module.exports = Notification;