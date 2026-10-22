const AdminNotification = require("../models/AdminNotification");
const Admin = require("../models/Admin");

const { getSocketIO } = require("./socket");

const createAdminNotification = async ({
  title,
  message,
  type = "system",
  link = null
}) => {
  try {
    if (!title || !message) {
      return null;
    }

    // Get all active admins
    const admins = await Admin.find({
      isActive: true
    }).select("_id");

    if (!admins.length) {
      return null;
    }

    const notifications = admins.map((admin) => ({
      adminId: admin._id,
      title,
      message,
      type,
      link
    }));

    // Save notifications in MongoDB
    const createdNotifications =
      await AdminNotification.insertMany(notifications);

    // Send real-time notification using Socket.IO
    const io = getSocketIO();

    if (io) {
      admins.forEach((admin) => {
        io.to(admin._id.toString()).emit("new_admin_notification", {
          title,
          message,
          type,
          link
        });
      });
    }

    return createdNotifications;

  } catch (error) {
    console.error(
      "Create admin notification error:",
      error
    );

    return null;
  }
};

module.exports = createAdminNotification;