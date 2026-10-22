const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    // Basic information
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true,
      default: ""
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

    // Existing React component
    // Existing templates can continue using this.
    // New admin-created templates will use "DynamicTemplate".
    component: {
      type: String,
      required: true
    },

    // Fields shown to the user while customizing
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

    // NEW: Visual design configuration
    design: {
      background: {
        type: {
          type: String,
          enum: ["solid", "gradient", "image"],
          default: "solid"
        },

        color: {
          type: String,
          default: "#ffffff"
        },

        color1: {
          type: String,
          default: "#ffffff"
        },

        color2: {
          type: String,
          default: "#f8e8ef"
        },

        direction: {
          type: String,
          default: "135deg"
        },

        image: {
          type: String,
          default: ""
        }
      },

      typography: {
        titleFont: {
          type: String,
          default: "Playfair Display"
        },

        bodyFont: {
          type: String,
          default: "Poppins"
        },

        titleSize: {
          type: Number,
          default: 32
        },

        bodySize: {
          type: Number,
          default: 16
        },

        titleColor: {
          type: String,
          default: "#8b4a62"
        },

        bodyColor: {
          type: String,
          default: "#555555"
        },

        titleAlignment: {
          type: String,
          enum: ["left", "center", "right"],
          default: "center"
        },

        bodyAlignment: {
          type: String,
          enum: ["left", "center", "right"],
          default: "center"
        }
      },

      border: {
        enabled: {
          type: Boolean,
          default: true
        },

        style: {
          type: String,
          enum: [
            "solid",
            "double",
            "dashed",
            "dotted",
            "none"
          ],
          default: "solid"
        },

        color: {
          type: String,
          default: "#c89b3c"
        },

        width: {
          type: Number,
          default: 2
        },

        radius: {
          type: Number,
          default: 20
        }
      },

      layout: {
        width: {
          type: Number,
          default: 420
        },

        height: {
          type: Number,
          default: 650
        },

        padding: {
          type: Number,
          default: 30
        },

        alignment: {
          type: String,
          enum: ["left", "center", "right"],
          default: "center"
        }
      },

      decoration: {
        type: {
          type: String,
          enum: [
            "none",
            "floral",
            "hearts",
            "leaves",
            "stars",
            "confetti"
          ],
          default: "none"
        },

        enabled: {
          type: Boolean,
          default: false
        }
      },

      button: {
        enabled: {
          type: Boolean,
          default: true
        },

        text: {
          type: String,
          default: "RSVP"
        },

        backgroundColor: {
          type: String,
          default: "#8b4a62"
        },

        textColor: {
          type: String,
          default: "#ffffff"
        },

        radius: {
          type: Number,
          default: 10
        }
      },

      image: {
        enabled: {
          type: Boolean,
          default: false
        },

        url: {
          type: String,
          default: ""
        },

        width: {
          type: Number,
          default: 180
        },

        height: {
          type: Number,
          default: 180
        },

        radius: {
          type: Number,
          default: 50
        },

        position: {
          type: String,
          enum: ["top", "center", "bottom"],
          default: "top"
        }
      }
    },

    // Pricing
    isPremium: {
      type: Boolean,
      default: false
    },

    isPremiumPlus: {
      type: Boolean,
      default: false
    },

    // Publishing
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published"
    },

    featured: {
      type: Boolean,
      default: false
    },

    displayOrder: {
      type: Number,
      default: 0
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