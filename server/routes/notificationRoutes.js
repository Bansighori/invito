const express = require("express");

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// GET NOTIFICATIONS
// GET /api/notifications
// ========================================

router.get(
  "/",
  authMiddleware,
  getNotifications
);


// ========================================
// MARK ONE AS READ
// PUT /api/notifications/:id/read
// ========================================

router.put(
  "/:id/read",
  authMiddleware,
  markAsRead
);


// ========================================
// MARK ALL AS READ
// PUT /api/notifications/read-all
// ========================================

router.put(
  "/read-all",
  authMiddleware,
  markAllAsRead
);


// ========================================
// DELETE NOTIFICATION
// DELETE /api/notifications/:id
// ========================================

router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);


module.exports = router;