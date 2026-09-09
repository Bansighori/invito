const dotenv = require("dotenv");

const connectDB = require("../config/db");
const Template = require("../models/Template");
const templates = require("./templates");

dotenv.config();

/* =========================
   SEED TEMPLATES
========================= */

const seedTemplates = async () => {
  try {
    await connectDB();

    await Template.deleteMany();

    await Template.insertMany(
      templates
    );

    console.log(
      "Templates inserted successfully"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Template seeding failed:",
      error.message
    );

    process.exit(1);
  }
};

seedTemplates();