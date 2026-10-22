const AdminNotification = require("../models/AdminNotification");

// GET ADMIN NOTIFICATIONS
const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await AdminNotification.find({
      adminId: req.admin._id
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const unreadCount = await AdminNotification.countDocuments({
      adminId: req.admin._id,
      isRead: false
    });

    return res.json({
      success: true,
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error(
      "Get admin notifications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load admin notifications"
    });
  }
};


// MARK ONE AS READ
const markAdminNotificationAsRead = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const notification =
      await AdminNotification.findOneAndUpdate(
        {
          _id: id,
          adminId: req.admin._id
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
      "Mark admin notification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to mark notification as read"
    });
  }
};


// MARK ALL AS READ
const markAllAdminNotificationsAsRead = async (
  req,
  res
) => {
  try {
    await AdminNotification.updateMany(
      {
        adminId: req.admin._id,
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
      "Mark all admin notifications error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to mark all notifications"
    });
  }
};


// DELETE NOTIFICATION
const deleteAdminNotification = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const notification =
      await AdminNotification.findOneAndDelete({
        _id: id,
        adminId: req.admin._id
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
      "Delete admin notification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete notification"
    });
  }
};


module.exports = {
  getAdminNotifications,
  markAdminNotificationAsRead,
  markAllAdminNotificationsAsRead,
  deleteAdminNotification
};