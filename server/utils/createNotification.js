const Notification = require("../models/Notification");

const createNotification = async ({
  userId,
  title,
  message,
  type = "system",
  link = null
}) => {
  try {
    if (!userId || !title || !message) {
      return null;
    }

    const notification =
      await Notification.create({
        userId,
        title,
        message,
        type,
        link
      });

    return notification;

  } catch (error) {
    console.error(
      "Create notification error:",
      error
    );

    return null;
  }
};

module.exports = createNotification;