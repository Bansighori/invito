const express = require("express");
const { getAdminPlans } = require("../controllers/adminPlanController");

const router = express.Router();

// Public: show active plans on the Pricing page
router.get("/", getAdminPlans);

module.exports = router;