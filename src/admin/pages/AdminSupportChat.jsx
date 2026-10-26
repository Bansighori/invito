import { useEffect, useState, useCallback } from "react";
import { Send, MessageCircle, Check, CheckCheck } from "lucide-react";
import api from "../../api/axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import socket from "../../socket";
import "./AdminSupportChat.css";

function AdminSupportChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatNotice, setChatNotice] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const admin = JSON.parse(localStorage.getItem("invitoAdmin") || "null");
 
  const adminId = admin?.id || admin?._id;

  const formatTime = (date) => {
    if (!date) return "";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "";

    return parsed.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const loadChats = useCallback(async () => {
  try {
    const response = await api.get("/chat/admin");
    setChats(response.data.chats || []);
  } catch (error) {
    console.error(
      "Failed to load chats:",
      error.response?.data || error.message
    );
  }
}, []);

  const loadMessages = useCallback(async (userId) => {
  try {
    const response = await api.get(`/chat/admin/${userId}`);

    setMessages(response.data.messages || []);

    await api.put(`/chat/admin/${userId}/read`, {});

    await loadChats();
  } catch (error) {
    console.error(
      "Failed to load messages:",
      error.response?.data || error.message
    );
  }
}, [loadChats]);

  useEffect(() => {
  loadChats();

  const interval = setInterval(loadChats, 10000);

  return () => clearInterval(interval);
}, [loadChats]);

  useEffect(() => {
  if (!adminId) {
    console.error("Admin ID not found in localStorage");
    return;
  }

  const joinAdmin = () => {
    console.log("Admin socket connected:", socket.id);
    socket.emit("join_admin_chat", adminId);
  };

  const handleChatNotification = (data) => {
    if (data?.sender !== "user") return;

    console.log("New user chat notification:", data);

    setChatNotice("New message from a user");
    loadChats();

    setTimeout(() => {
      setChatNotice("");
    }, 4000);
  };

  socket.on("connect", joinAdmin);
  socket.on("new_chat_notification", handleChatNotification);

  if (!socket.connected) {
    socket.connect();
  } else {
    joinAdmin();
  }

  return () => {
    socket.off("connect", joinAdmin);
    socket.off("new_chat_notification", handleChatNotification);
  };
}, [adminId, loadChats]);

  const selectChat = (chat) => {
    setSelectedUser(chat);
    setMessages([]);
    loadMessages(chat.userId);
  };

  
const sendMessage = async () => {
  const text = message.trim();

  if (!text || !selectedUser) return;

  try {
    setMessage("");

    await api.post(
      `/chat/admin/${selectedUser.userId}/message`,
      { message: text }
    );

    await loadMessages(selectedUser.userId);
    await loadChats();
  } catch (error) {
    console.error(
      "Send message error:",
      error.response?.data || error.message
    );

    setMessage(text);

    alert(
      error.response?.data?.message ||
      "Failed to send message. Please try again."
    );
  }
};

  const renderTicks = (msg) => {
    // Show ticks beside the admin's own messages.
    if (msg.sender !== "admin") return null;

    if (msg.read) {
      return (
        <CheckCheck
          size={15}
          className="message-ticks seen"
          aria-label="Read"
        />
      );
    }

    if (msg.delivered) {
      return (
        <CheckCheck
          size={15}
          className="message-ticks delivered"
          aria-label="Delivered"
        />
      );
    }

    return (
      <Check
        size={15}
        className="message-ticks sent"
        aria-label="Sent"
      />
    );
  };

  return (
    <>
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <AdminNavbar />

      <div className="admin-support-page">
        <div className="support-chat-list">
          <div className="support-list-header">
            <MessageCircle size={22} />
            <h2>Support Chats</h2>
          </div>

          {chats.length === 0 ? (
            <div className="no-chats">No support messages yet.</div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.userId}
                className={`support-user ${
                  String(selectedUser?.userId) === String(chat.userId)
                    ? "active"
                    : ""
                }`}
                onClick={() => selectChat(chat)}
              >
                <div className="user-avatar">
                  {chat.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="user-info">
                  <strong>
                    {chat.user?.name || chat.user?.email || "User"}
                  </strong>
                  <span>{chat.lastMessage || "No messages"}</span>
                </div>

                {chat.unreadCount > 0 && (
                  <span className="unread-count">{chat.unreadCount}</span>
                )}
              </div>
            ))
          )}
        </div>

        <div className="admin-chat-window">
          {!selectedUser ? (
            <div className="empty-chat">
              <MessageCircle size={50} />
              <h2>Select a conversation</h2>
              <p>Select a user to view their support messages.</p>
            </div>
          ) : (
            <>
              <div className="admin-chat-header">
                <div className="user-avatar">
                  {selectedUser.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h3>{selectedUser.user?.name || "User"}</h3>
                  <span>{selectedUser.user?.email || ""}</span>
                </div>
              </div>

              <div className="admin-messages">
                {messages.map((msg, index) => (
                  <div
                    key={msg._id || index}
                    className={`admin-message-row ${msg.sender}`}
                  >
                    <div className="admin-message-bubble">
                      <span className="admin-message-text">
                        {msg.message}
                      </span>

                      <span className="admin-message-time">
                        {formatTime(msg.createdAt)}
                        {renderTicks(msg)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="admin-message-input">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your reply..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button
  onClick={sendMessage}
  disabled={!message.trim() || !selectedUser}
>
  <Send size={18} />
</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminSupportChat;