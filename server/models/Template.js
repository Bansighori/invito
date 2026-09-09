const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Wedding",
        "Birthday",
        "Engagement",
        "Baby Shower",
        "Party",
        "Other"
      ]
    },

    type: {
      type: String,
      default: "Modern"
    },

    /*
     * Name of the React component
     * that represents this template.
     *
     * Example:
     * WeddingClassic
     * BirthdayModern
     */
    component: {
      type: String,
      required: true
    },

    /*
     * Fields that the user fills in
     */
    fields: [
      {
        name: {
          type: String,
          required: true
        },

        label: {
          type: String,
          required: true
        },

        type: {
          type: String,
          required: true
        },

        required: {
          type: Boolean,
          default: false
        }
      }
    ],

    isPremium: {
      type: Boolean,
      default: false
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

module.exports = mongoose.model(
  "Template",
  templateSchema
);