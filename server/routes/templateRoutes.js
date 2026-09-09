const express = require("express");

const {
  getTemplates,
  getTemplateById,
  getTemplatesByCategory,
  createTemplate,
  deleteTemplate
} = require("../controllers/templateController");

const router = express.Router();

/* =========================
   GET ALL TEMPLATES
   GET /api/templates
========================= */

router.get("/", getTemplates);

/* =========================
   GET TEMPLATES BY CATEGORY
   GET /api/templates/category/:category
========================= */

router.get(
  "/category/:category",
  getTemplatesByCategory
);

/* =========================
   GET SINGLE TEMPLATE
   GET /api/templates/:id
========================= */

router.get(
  "/:id",
  getTemplateById
);

/* =========================
   CREATE TEMPLATE
   POST /api/templates
========================= */

router.post("/", createTemplate);

/* =========================
   DELETE TEMPLATE
   DELETE /api/templates/:id
========================= */

router.delete(
  "/:id",
  deleteTemplate
);

module.exports = router;