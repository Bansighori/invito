const ChatMessage = require("../models/ChatMessage");
const User = require("../models/User");

// ==========================================
// USER SEND MESSAGE
// ==========================================


const sendUserMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    const chatMessage = await ChatMessage.create({
      userId,
      sender: "user",
      message: message.trim(),
      delivered: false,
      read: false
    });

    const io = req.app.get("io");

    const savedMessage = chatMessage.toObject();

    io.to("support_admins").emit(
      "admin_receive_message",
      savedMessage
    );

    io.to("support_admins").emit(
      "new_chat_notification",
      {
        userId: String(userId),
        sender: "user",
        message: chatMessage.message,
        messageId: String(chatMessage._id)
      }
    );

    io.to(`user_${userId}`).emit(
      "user_message_saved",
      savedMessage
    );

    return res.status(201).json({
      success: true,
      message: "Message sent",
      chatMessage
    });

  } catch (error) {
    console.error("User message error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
};



// ==========================================
// USER GET OWN CHAT
// ==========================================

const getUserChat = async (req, res) => {
  try {

    const userId =
      req.user._id ||
      req.user.id ||
      req.user.userId;

    console.log("========== CHAT HISTORY ==========");
    console.log("User ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found"
      });
    }

    const messages = await ChatMessage.find({
      userId: userId
    })
      .sort({ createdAt: 1 })
      .populate(
        "adminId",
        "name email role"
      )
      .lean();

    console.log(
      "Messages found:",
      messages.length
    );

    console.log(
      "Messages:",
      messages
    );

    res.json({
      success: true,
      messages
    });

  } catch (error) {

    console.error(
      "Get user chat error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load chat"
    });
  }
};

// ==========================================
// ADMIN GET ALL SUPPORT CHATS
// ==========================================

const getAllChats = async (req, res) => {
  try {

    const chats = await ChatMessage.aggregate([
      {
        $sort: {
          createdAt: -1
        }
      },
      {
        $group: {
          _id: "$userId",

          lastMessage: {
            $first: "$message"
          },

          lastMessageAt: {
            $first: "$createdAt"
          },

          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$sender", "user"] },
                    { $eq: ["$read", false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $project: {
          _id: 0,

          userId: "$_id",

          lastMessage: 1,

          lastMessageAt: 1,

          unreadCount: 1,

          user: {
            _id: "$user._id",
            name: "$user.name",
            email: "$user.email"
          }
        }
      },

      {
        $sort: {
          lastMessageAt: -1
        }
      }
    ]);

    res.json({
      success: true,
      chats
    });

  } catch (error) {

    console.error(
      "Get all chats error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load chats"
    });
  }
};

// ==========================================
// ADMIN GET CHAT WITH USER
// ==========================================

const getAdminChat = async (req, res) => {
  try {

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const messages = await ChatMessage.find({
      userId
    })
      .sort({ createdAt: 1 })
      .populate(
        "adminId",
        "name email role"
      );

    res.json({
      success: true,
      messages
    });

  } catch (error) {

    console.error(
      "Get admin chat error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to load chat"
    });
  }
};


// ==========================================
// ADMIN SEND MESSAGE
// ==========================================

const sendAdminMessage = async (req, res) => {
  try {

    const { userId } = req.params;
    const { message } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required"
      });
    }

    // Check user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const chatMessage =
      await ChatMessage.create({
        userId,
        adminId: req.admin._id,
        sender: "admin",
        message: message.trim()
      });

    res.status(201).json({
      success: true,
      message: "Admin message sent",
      chatMessage
    });

  } catch (error) {

    console.error(
      "Admin chat message error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to send admin message"
    });
  }
};


// ==========================================
// ADMIN MARK CHAT AS READ
// ==========================================

const markChatAsRead = async (req, res) => {
  try {

    const { userId } = req.params;

    await ChatMessage.updateMany(
      {
        userId,
        sender: "user",
        read: false
      },
      {
        $set: {
          read: true,
          adminId: req.admin._id
        }
      }
    );

    res.json({
      success: true,
      message: "Messages marked as read"
    });

  } catch (error) {

    console.error(
      "Mark chat read error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to mark messages as read"
    });
  }
};


module.exports = {
  sendUserMessage,
  getUserChat,
  getAllChats,
  getAdminChat,
  sendAdminMessage,
  markChatAsRead
};