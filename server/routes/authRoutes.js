const express = require("express");

const publicAuthRoutes =
  require("./publicAuthRoutes");

const protectedAuthRoutes =
  require("./protectedAuthRoutes");

const router = express.Router();

router.use(publicAuthRoutes);
router.use(protectedAuthRoutes);

module.exports = router;
