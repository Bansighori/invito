const express = require("express");

const {
  getAdminTemplates,
  getAdminTemplate,
  updateAdminTemplate,
  createAdminTemplate,
  deleteAdminTemplate
} = require("../controllers/adminTemplateController");

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const requireRole =
  require("../middleware/adminRoleMiddleware");

const router = express.Router();

router.get(
  "/",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "template_admin"
  ),
  getAdminTemplates
);

router.post(
  "/",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "template_admin"
  ),
  createAdminTemplate
);

router.get(
  "/:id",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "template_admin"
  ),
  getAdminTemplate
);

router.put(
  "/:id",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "template_admin"
  ),
  updateAdminTemplate
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  requireRole(
    "super_admin",
    "template_admin"
  ),
  deleteAdminTemplate
);

module.exports = router;