const Notification = require("../models/Notification");

// ========================================
// GET USER NOTIFICATIONS
// ========================================

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.user.id
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const unreadCount = await Notification.countDocuments({
      userId: req.user.id,
      isRead: false
    });

    return res.json({
      success: true,
      notifications,
      unreadCount
    });

  } catch (error) {
    console.error(
      "Get notifications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications"
    });
  }
};


// ========================================
// MARK ONE NOTIFICATION AS READ
// ========================================

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification =
      await Notification.findOneAndUpdate(
        {
          _id: id,
          userId: req.user.id
        },
        {
          isRead: true
        },
        {
          new: true
        }
      );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    return res.json({
      success: true,
      message: "Notification marked as read",
      notification
    });

  } catch (error) {
    console.error(
      "Mark notification read error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update notification"
    });
  }
};


// ========================================
// MARK ALL AS READ
// ========================================

const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        userId: req.user.id,
        isRead: false
      },
      {
        isRead: true
      }
    );

    return res.json({
      success: true,
      message: "All notifications marked as read"
    });

  } catch (error) {
    console.error(
      "Mark all notifications read error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update notifications"
    });
  }
};


// ========================================
// DELETE NOTIFICATION
// ========================================

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification =
      await Notification.findOneAndDelete({
        _id: id,
        userId: req.user.id
      });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    return res.json({
      success: true,
      message: "Notification deleted"
    });

  } catch (error) {
    console.error(
      "Delete notification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete notification"
    });
  }
};


module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
};