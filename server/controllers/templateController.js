const Template = require("../models/Template");

/* =========================
   GET ALL TEMPLATES
========================= */

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({
      isActive: true
    }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: templates.length,
      templates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch templates",
      error: error.message
    });
  }
};

/* =========================
   GET SINGLE TEMPLATE
========================= */

const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(
      req.params.id
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    res.status(200).json({
      success: true,
      template
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch template",
      error: error.message
    });
  }
};

/* =========================
   GET TEMPLATES BY CATEGORY
========================= */

const getTemplatesByCategory = async (req, res) => {
  try {
    const templates = await Template.find({
      category: req.params.category,
      isActive: true
    }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: templates.length,
      templates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch templates by category",
      error: error.message
    });
  }
};

/* =========================
   CREATE TEMPLATE
========================= */

const createTemplate = async (req, res) => {
  try {
    const template = await Template.create(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      template
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create template",
      error: error.message
    });
  }
};

/* =========================
   DELETE TEMPLATE
========================= */

const deleteTemplate = async (req, res) => {
  try {
    const template =
      await Template.findByIdAndDelete(
        req.params.id
      );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Template deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete template",
      error: error.message
    });
  }
};

module.exports = {
  getTemplates,
  getTemplateById,
  getTemplatesByCategory,
  createTemplate,
  deleteTemplate
};