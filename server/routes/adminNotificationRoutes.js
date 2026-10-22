const express = require("express");

const {
  getAdminNotifications,
  markAdminNotificationAsRead,
  markAllAdminNotificationsAsRead,
  deleteAdminNotification
} = require("../controllers/adminNotificationController");

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const router = express.Router();


// GET ALL ADMIN NOTIFICATIONS
router.get(
  "/",
  adminAuthMiddleware,
  getAdminNotifications
);


// MARK ONE AS READ
router.put(
  "/:id/read",
  adminAuthMiddleware,
  markAdminNotificationAsRead
);


// MARK ALL AS READ
router.put(
  "/read-all",
  adminAuthMiddleware,
  markAllAdminNotificationsAsRead
);


// DELETE NOTIFICATION
router.delete(
  "/:id",
  adminAuthMiddleware,
  deleteAdminNotification
);


module.exports = router;