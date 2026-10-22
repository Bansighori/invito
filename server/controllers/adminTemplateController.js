const Template = require("../models/Template");
const Invitation = require("../models/Invitation");
const User = require("../models/User");
const createNotification = require("../utils/createNotification");


// GET ALL TEMPLATES
const getAdminTemplates = async (req, res) => {
  try {

    const templates = await Template.find()
      .sort({ createdAt: -1 })
      .lean();

    const usageCounts = await Invitation.aggregate([
  {
    $match: {
      templateId: {
        $ne: null
      }
    }
  },
  {
    $group: {
      _id: "$templateId",
      count: {
        $sum: 1
      }
    }
  }
]);

    const usageMap = {};

    usageCounts.forEach((item) => {
      usageMap[item._id.toString()] = item.count;
    });


    const formattedTemplates = templates.map(
      (template) => ({
        ...template,

        usageCount:
          usageMap[template._id.toString()] || 0,

        status:
          template.status || "published"
      })
    );


    const total = templates.length;

    const free = templates.filter(
      (template) =>
        !template.isPremium &&
        !template.isPremiumPlus
    ).length;

    const premium = templates.filter(
      (template) =>
        template.isPremium &&
        !template.isPremiumPlus
    ).length;

    const premiumPlus = templates.filter(
      (template) =>
        template.isPremiumPlus
    ).length;

    const published = formattedTemplates.filter(
      (template) =>
        template.status === "published"
    ).length;

    const draft = formattedTemplates.filter(
      (template) =>
        template.status === "draft"
    ).length;


    return res.json({
      success: true,

      stats: {
        total,
        free,
        premium,
        premiumPlus,
        published,
        draft
      },

      templates: formattedTemplates
    });

  } catch (error) {

    console.error(
      "Admin templates error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load templates"
    });
  }
};

// GET SINGLE TEMPLATE
const getAdminTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findById(id).lean();

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    return res.json({
      success: true,
      template
    });

  } catch (error) {
    console.error(
      "Get admin template error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load template"
    });
  }
};


// UPDATE TEMPLATE
// UPDATE TEMPLATE
const updateAdminTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      category,
      type,
      component,
      fields,
      design,
      plan,
      status,
      featured,
      displayOrder,
      isActive
    } = req.body;

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    // ==========================================
    // BASIC INFORMATION
    // ==========================================

    if (name !== undefined) {
      template.title = String(name).trim();
    }

    if (description !== undefined) {
      template.description = String(description).trim();
    }

    if (category !== undefined) {
      template.category = category;
    }

    if (type !== undefined) {
      template.type = String(type).trim();
    }

    if (component !== undefined) {
      template.component = String(component).trim();
    }


    // ==========================================
    // TEMPLATE FIELDS
    // ==========================================

    if (fields !== undefined) {
      if (!Array.isArray(fields)) {
        return res.status(400).json({
          success: false,
          message: "Fields must be an array"
        });
      }

      template.fields = fields;
    }


    // ==========================================
    // DESIGN
    // ==========================================

    if (design !== undefined) {
      if (
        typeof design !== "object" ||
        Array.isArray(design)
      ) {
        return res.status(400).json({
          success: false,
          message: "Design must be an object"
        });
      }

      template.design = design;
    }


    // ==========================================
    // PLAN
    // ==========================================

    if (plan !== undefined) {

      if (
        ![
          "free",
          "premium",
          "premium_plus"
        ].includes(plan)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid plan"
        });
      }

      if (plan === "free") {
        template.isPremium = false;
        template.isPremiumPlus = false;
      }

      if (plan === "premium") {
        template.isPremium = true;
        template.isPremiumPlus = false;
      }

      if (plan === "premium_plus") {
        template.isPremium = true;
        template.isPremiumPlus = true;
      }
    }


    // ==========================================
    // STATUS
    // ==========================================

    if (status !== undefined) {
      if (
        !["draft", "published"].includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid template status"
        });
      }

      template.status = status;
    }


    // ==========================================
    // FEATURED
    // ==========================================

    if (featured !== undefined) {
      template.featured = Boolean(featured);
    }


    // ==========================================
    // ACTIVE
    // ==========================================

    if (isActive !== undefined) {
      template.isActive = Boolean(isActive);
    }


    // ==========================================
    // DISPLAY ORDER
    // ==========================================

    if (displayOrder !== undefined) {

      let newPosition = Number(displayOrder);

      if (
        !Number.isInteger(newPosition) ||
        newPosition < 1
      ) {
        newPosition = 1;
      }

      const templates = await Template.find({
        isActive: true
      }).sort({
        displayOrder: 1,
        createdAt: 1
      });

      const otherTemplates = templates.filter(
        (item) =>
          item._id.toString() !== id
      );

      if (
        newPosition >
        otherTemplates.length + 1
      ) {
        newPosition =
          otherTemplates.length + 1;
      }

      otherTemplates.splice(
        newPosition - 1,
        0,
        template
      );

      for (
        let i = 0;
        i < otherTemplates.length;
        i++
      ) {
        otherTemplates[i].displayOrder =
          i + 1;

        await otherTemplates[i].save();
      }
    }


    // ==========================================
    // SAVE
    // ==========================================

    await template.save();


    // ==========================================
    // NOTIFY USERS
    // ==========================================

    const users = await User.find(
      {},
      "_id"
    );

    for (const user of users) {
      await createNotification({
        userId: user._id,

        title: "Template Updated 🎨",

        message:
          `The ${template.category} template ` +
          `"${template.title}" has been updated. ` +
          `Check it out now!`,

        type: "invitation",

        link: "/templates"
      });
    }


    return res.json({
      success: true,

      message:
        "Template updated successfully",

      template
    });

  } catch (error) {

    console.error(
      "Update admin template error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to update template"
    });
  }
};

const deleteAdminTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    await Template.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Template deleted successfully"
    });

  } catch (error) {
    console.error(
      "Delete admin template error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete template"
    });
  }
};


const createAdminTemplate = async (req, res) => {
  try {
    const {
  name,
  description,
  category,
  type,
  component,
  fields,
  design,
  plan,
  status,
  featured,
  displayOrder
} = req.body;

    if (!name || !category || !component) {
      return res.status(400).json({
        success: false,
        message:
          "Template name, category and component are required"
      });
    }

    let isPremium = false;
    let isPremiumPlus = false;

    if (plan === "premium") {
      isPremium = true;
    }

    if (plan === "premium_plus") {
      isPremium = true;
      isPremiumPlus = true;
    }

    const template = await Template.create({
      title: name.trim(),

      description:
        description?.trim() || "",

      category,

      type:
        type?.trim() || "Modern",

      component: component.trim(),

      fields: Array.isArray(fields)
        ? fields
        : [],

      design: design || {},

      isPremium,

      isPremiumPlus,

      status:
        status || "published",

      featured:
        Boolean(featured),

      displayOrder:
        Number(displayOrder) || 1,

      isActive: true
    });
    const users = await User.find({}, "_id");

for (const user of users) {
  await createNotification({
    userId: user._id,
    title: "New Template Available 🎉",
    message: `A new ${template.category} template has been added to Invito. Check it out now!`,
    type: "invitation",
    link: "/templates"
  });
}

    return res.status(201).json({
      success: true,
      message: "Template created successfully",
      template
    });

  } catch (error) {
    console.error(
      "Create admin template error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create template"
    });
  }
};


module.exports = {
  getAdminTemplates,
  getAdminTemplate,
  updateAdminTemplate,
  createAdminTemplate,
  deleteAdminTemplate
};