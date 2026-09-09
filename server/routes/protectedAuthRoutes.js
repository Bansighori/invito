const express = require("express");

const {
  updateProfile,
  changePassword
} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.put("/profile", updateProfile);
router.put("/change-password", changePassword);

module.exports = router;
