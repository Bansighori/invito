const mongoose = require("mongoose");
require("dotenv").config();

const Template = require("./models/Template");

async function seedTemplate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const templateData = {
      title: "Birthday Photo Premium Plus",
      description:
        "Elegant birthday invitation with a personal photo, event details, and RSVP.",
      category: "Birthday",
      type: "Premium Plus",
      component: "BirthdayPhotoPremiumPlus",

      fields: [
        { name: "birthdayPerson", label: "Birthday Person", type: "text", required: true },
        { name: "age", label: "Age", type: "text", required: false },
        { name: "birthdayDate", label: "Birthday Date", type: "date", required: true },
        { name: "partyTime", label: "Party Time", type: "text", required: true },
        { name: "venue", label: "Venue", type: "text", required: true },
        { name: "address", label: "Address", type: "text", required: true },
        { name: "message", label: "Message", type: "textarea", required: false }
      ],

      isPremium: true,
      isPremiumPlus: true,
      status: "published",
      isActive: true,
      featured: true,

      design: {
        background: {
          type: "gradient",
          color1: "#fff1f5",
          color2: "#f9e6c8",
          direction: "135deg"
        },
        typography: {
          titleFont: "Playfair Display",
          bodyFont: "Poppins",
          titleColor: "#8b4a62",
          bodyColor: "#555555",
          titleAlignment: "center",
          bodyAlignment: "center"
        },
        border: {
          enabled: true,
          style: "double",
          color: "#c89b3c",
          width: 3,
          radius: 20
        },
        image: {
          enabled: true,
          width: 180,
          height: 180,
          radius: 50,
          position: "top"
        },
        button: {
          enabled: true,
          text: "RSVP",
          backgroundColor: "#8b4a62",
          textColor: "#ffffff"
        },
        layout: {
          width: 420,
          height: 650,
          padding: 30,
          alignment: "center"
        },
        decoration: {
          type: "stars",
          enabled: true
        }
      }
    };

    await Template.findOneAndUpdate(
      { component: "BirthdayPhotoPremiumPlus" },
      { $set: templateData },
      { upsert: true, new: true, runValidators: true }
    );

    console.log("Birthday Photo Premium Plus template saved!");
  } catch (error) {
    console.error("Template seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedTemplate();