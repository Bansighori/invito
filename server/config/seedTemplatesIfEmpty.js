const Template = require("../models/Template");
const templates = require("../data/templates");

const syncTemplates = async () => {
  let added = 0;

  for (const template of templates) {
    const exists = await Template.findOne({
      component: template.component
    });

    if (!exists) {
      await Template.create(template);
      added += 1;
    }
  }

  return added;
};

let hasChecked = false;

const seedTemplatesIfEmpty = async () => {
  if (hasChecked) {
    return;
  }

  hasChecked = true;

  const count = await Template.countDocuments();

  if (count === 0) {
    await Template.insertMany(templates);
    console.log("Default templates seeded successfully");
    return;
  }

  const added = await syncTemplates();

  if (added > 0) {
    console.log(`Added ${added} new template(s)`);
  }
};

module.exports = seedTemplatesIfEmpty;
module.exports.syncTemplates = syncTemplates;
