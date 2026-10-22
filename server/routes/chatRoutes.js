const express = require("express");

const {
  sendUserMessage,
  getUserChat,
  getAllChats,
  getAdminChat,
  sendAdminMessage,
  markChatAsRead
} = require("../controllers/chatController");

const authMiddleware = require("../middleware/authMiddleware");

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const router = express.Router();


// ==========================================
// USER CHAT
// ==========================================

// User sends message
router.post(
  "/message",
  authMiddleware,
  sendUserMessage
);

// User gets own messages
router.get(
  "/",
  authMiddleware,
  getUserChat
);


// ==========================================
// ADMIN CHAT
// ==========================================

// Admin gets all conversations
router.get(
  "/admin",
  adminAuthMiddleware,
  getAllChats
);


// Admin gets specific user's chat
router.get(
  "/admin/:userId",
  adminAuthMiddleware,
  getAdminChat
);


// Admin sends message to user
router.post(
  "/admin/:userId/message",
  adminAuthMiddleware,
  sendAdminMessage
);


// Admin marks messages as read
router.put(
  "/admin/:userId/read",
  adminAuthMiddleware,
  markChatAsRead
);


module.exports = router;