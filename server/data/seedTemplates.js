const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("../config/db");
const {
  syncTemplates
} = require("../config/seedTemplatesIfEmpty");
const Template = require("../models/Template");
const templates = require("./templates");

dotenv.config({
  path: path.join(__dirname, "..", ".env")
});

const seedTemplates = async () => {
  try {
    await connectDB();

    const shouldReset =
      process.argv.includes("--reset");

    if (shouldReset) {
      await Template.deleteMany();
      await Template.insertMany(templates);

      console.log(
        `Reset complete. Inserted ${templates.length} templates.`
      );

      process.exit(0);
      return;
    }

    const added = await syncTemplates();

    console.log(
      `Templates synced. Added ${added} new template(s). Total available: ${templates.length}.`
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
