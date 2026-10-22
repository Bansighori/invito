const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const AdminNotification = require("./models/AdminNotification");
const app = require("./app");
const ChatMessage = require("./models/ChatMessage");
const Notification = require("./models/Notification");
const startPlanExpiryNotifications =
  require("./jobs/planExpiryNotifications");
const planRoutes = require("./routes/planRoutes");

app.use("/api/plans", planRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});
app.set("io", io);

// Send status to the original sender.
function notifySender(msg) {
  const status = {
    _id: String(msg._id),
    messageId: String(msg._id),
    delivered: msg.delivered,
    read: msg.read,
  };

  if (msg.sender === "user") {
    io.to(`user_${msg.userId}`).emit("message_status_update", status);
  } else if (msg.adminId) {
    io.to(`admin_${msg.adminId}`).emit("message_status_update", status);
  }
}

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_user_chat", (userId) => {
    if (!userId) return;
    socket.join(`user_${userId}`);
  });

  socket.on("join_admin_chat", (adminId) => {
    if (!adminId) return;

    socket.join("support_admins");
    socket.join(`admin_${adminId}`);
  });

  // USER SENDS MESSAGE
  
socket.on("user_send_message", async (data) => {
  try {
    const { userId, message } = data || {};
    if (!userId || !message?.trim()) return;

    const msg = await ChatMessage.create({
      userId,
      sender: "user",
      message: message.trim(),
      delivered: false,
      read: false,
    });

    const savedMessage = {
      _id: String(msg._id),
      userId: String(msg.userId),
      message: msg.message,
      sender: msg.sender,
      createdAt: msg.createdAt,
      delivered: msg.delivered,
      read: msg.read,
    };

    // Notify all admins who use the shared support inbox.
    io.to("support_admins").emit("new_chat_notification", {
      userId: String(userId),
      message: savedMessage.message,
      sender: "user",
      messageId: savedMessage._id,
    });

    // Save a persistent notification for each admin.
    const Admin = require("./models/Admin");
    const admins = await Admin.find({}, "_id").lean();

    if (admins.length > 0) {
      await AdminNotification.insertMany(
        admins.map((admin) => ({
          adminId: admin._id,
          title: "New chat message",
          message: savedMessage.message,
          type: "user",
          isRead: false,
          link: `/admin/support?userId=${userId}`,
        }))
      );
    }

    io.to("support_admins").emit(
      "admin_receive_message",
      savedMessage
    );

    io.to(`user_${userId}`).emit(
      "user_message_saved",
      savedMessage
    );
  } catch (error) {
    console.error("User message error:", error);
  }
});


  // ADMIN SENDS MESSAGE
  

socket.on("admin_send_message", async (data) => {
  try {
    const { userId, adminId, message } = data || {};

    if (!userId || !adminId || !message?.trim()) return;

    const uid = String(userId);
    const aid = String(adminId);
    const text = message.trim();

    // 1. Save chat message.
    const msg = await ChatMessage.create({
      userId: uid,
      adminId: aid,
      sender: "admin",
      message: text,
      delivered: false,
      read: false,
    });

    const savedMessage = {
      _id: String(msg._id),
      userId: uid,
      adminId: aid,
      sender: "admin",
      message: text,
      createdAt: msg.createdAt,
      delivered: msg.delivered,
      read: msg.read,
    };

    // 2. Save persistent user notification.
    const notification = await Notification.create({
      userId: uid,
      title: "New reply from Invito Support",
      message: text,
      type: "system",
      isRead: false,
      link: "/support",
    });

    const savedNotification = notification.toObject();

    // 3. Send notification to the user's Topbar.
    io.to(`user_${uid}`).emit("new_chat_notification", {
      sender: "admin",
      messageId: String(msg._id),
      notification: savedNotification,
    });

    // 4. Deliver the chat message.
    io.to(`user_${uid}`).emit(
      "user_receive_message",
      savedMessage
    );

    // 5. Acknowledge the message to the admin.
    io.to(`admin_${aid}`).emit(
      "admin_message_saved",
      savedMessage
    );

    console.log("User notification saved:", notification._id);
  } catch (error) {
    console.error("Admin message error:", error);
  }
});


  // RECIPIENT CONFIRMS DELIVERY
  socket.on("message_delivered", async ({ messageId } = {}) => {
    try {
      if (!messageId) return;

      const msg = await ChatMessage.findById(messageId);
      if (!msg) return;

      if (!msg.delivered) {
        msg.delivered = true;
        await msg.save();
      }

      notifySender(msg);

      // Update admin views when a user message is delivered.
      if (msg.sender === "user") {
        io.to("support_admins").emit("message_status_update", {
          _id: String(msg._id),
          messageId: String(msg._id),
          delivered: true,
          read: msg.read,
        });
      }
    } catch (error) {
      console.error("Delivery status error:", error);
    }
  });

  // RECIPIENT READS MESSAGE
  socket.on("message_read", async ({ messageId } = {}) => {
    try {
      if (!messageId) return;

      const msg = await ChatMessage.findById(messageId);
      if (!msg) return;

       if (!msg.read || !msg.delivered) {
      msg.delivered = true;
      msg.read = true;
      await msg.save();
    }
    const status = {
      _id: String(msg._id),
      messageId: String(msg._id),
      delivered: true,
      read: true,
    };
      notifySender(msg);

      // Update admin views when a user has read an admin message.
      if (msg.sender === "admin") {
        io.to("support_admins").emit("message_status_update", {
          _id: String(msg._id),
          messageId: String(msg._id),
          delivered: true,
          read: true,
        });
      }
    } catch (error) {
      console.error("Read status error:", error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", socket.id, reason);
  });
});

io.engine.on("connection_error", (error) => {
  console.error("Socket connection error:", error.message);
});

async function startServer() {
  try {
    // 1. Connect to MongoDB first
    await connectDB();

    console.log("MongoDB connected successfully");

    // 2. Start the HTTP server
    server.listen(PORT, () => {
      console.log(
        `Invito server running on http://localhost:${PORT}`
      );

      // 3. Start plan-expiry notifications
      startPlanExpiryNotifications(io);
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
}

startServer();
