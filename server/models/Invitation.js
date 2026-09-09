const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    data: {
      type: Object,
      default: {}
    },

    status: {
      type: String,
      enum: [
        "draft",
        "published"
      ],
      default: "draft"
    },

    slug: {
      type: String,
      unique: true,
      sparse: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model(
    "Invitation",
    invitationSchema
  );