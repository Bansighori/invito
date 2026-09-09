const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    invitationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invitation",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    attendance: {
      type: String,
      enum: [
        "yes",
        "no",
        "maybe"
      ],
      required: true
    },

    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },

    message: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model(
    "Guest",
    guestSchema
  );