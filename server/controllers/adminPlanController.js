const Plan = require("../models/Plan");

// ==========================================
// GET ALL PLANS
// ==========================================

const getAdminPlans = async (req, res) => {
  try {
    const plans = await Plan.find()
      .sort({ price: 1 })
      .lean();

    return res.json({
      success: true,
      plans
    });

  } catch (error) {
    console.error(
      "Get admin plans error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch plans"
    });
  }
};


// ==========================================
// GET SINGLE PLAN
// ==========================================

const getAdminPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id).lean();

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found"
      });
    }

    return res.json({
      success: true,
      plan
    });

  } catch (error) {
    console.error(
      "Get admin plan error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch plan"
    });
  }
};


// ==========================================
// UPDATE PLAN
// ==========================================

const updateAdminPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      price,
      duration,
      invitationLimit,
      description,
      features,
      active
    } = req.body;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found"
      });
    }

    if (name !== undefined) {
      plan.name = name;
    }

    if (price !== undefined) {
      plan.price = Number(price);
    }

    if (duration !== undefined) {
      plan.duration = duration;
    }

    if (invitationLimit !== undefined) {
      plan.invitationLimit =
        invitationLimit;
    }

    if (description !== undefined) {
      plan.description = description;
    }

    if (Array.isArray(features)) {
      plan.features = features;
    }

    if (active !== undefined) {
      plan.active = active;
    }

    await plan.save();

    return res.json({
      success: true,
      message: "Plan updated successfully",
      plan
    });

  } catch (error) {
    console.error(
      "Update admin plan error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update plan"
    });
  }
};


// ==========================================
// CREATE PLAN
// ==========================================

const createAdminPlan = async (req, res) => {
  try {
    const {
      key,
      name,
      price,
      duration,
      invitationLimit,
      description,
      features,
      active
    } = req.body;

    if (!key || !name) {
      return res.status(400).json({
        success: false,
        message: "Plan key and name are required"
      });
    }

    const existingPlan =
      await Plan.findOne({ key });

    if (existingPlan) {
      return res.status(409).json({
        success: false,
        message: "Plan already exists"
      });
    }

    const plan = await Plan.create({
      key,
      name,
      price: Number(price || 0),
      duration: duration || "Forever",
      invitationLimit:
        invitationLimit ?? "Unlimited",
      description: description || "",
      features: Array.isArray(features)
        ? features
        : [],
      active:
        active !== undefined
          ? active
          : true
    });

    return res.status(201).json({
      success: true,
      message: "Plan created successfully",
      plan
    });

  } catch (error) {
    console.error(
      "Create admin plan error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create plan"
    });
  }
};


module.exports = {
  getAdminPlans,
  getAdminPlan,
  updateAdminPlan,
  createAdminPlan
};