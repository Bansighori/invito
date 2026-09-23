const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: [
        "super_admin",
        "user_admin",
        "template_admin",
        "payment_admin",
        "support_admin"
      ],
      default: "super_admin"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;