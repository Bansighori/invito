
import { useEffect, useState, useCallback } from "react";
import { Send, MessageCircle, Check, CheckCheck } from "lucide-react";
import api from "../../api/axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminSupportChat.css";

function AdminSupportChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingChats, setLoadingChats] = useState(true);
  const [chatError, setChatError] = useState("");
  const [sending, setSending] = useState(false);

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

  // Load all support conversations
  const loadChats = useCallback(async () => {
    try {
      const response = await api.get("/chat/admin");

      console.log("Support chats:", response.data);

      setChats(response.data.chats || []);
      setChatError("");
    } catch (error) {
      console.error(
        "Load chats error:",
        error.response?.status,
        error.response?.data || error.message
      );

      setChatError(
        error.response?.data?.message ||
          `Unable to load chats (${error.response?.status || "network error"})`
      );
    } finally {
      setLoadingChats(false);
    }
  }, []);

  // Load messages for a selected user
  const loadMessages = useCallback(
    async (userId) => {
      try {
        const response = await api.get(`/chat/admin/${userId}`);

        setMessages(response.data.messages || []);

        await api.put(`/chat/admin/${userId}/read`, {});
        await loadChats();
      } catch (error) {
        console.error(
          "Load messages error:",
          error.response?.data || error.message
        );

        setMessages([]);
        alert(
          error.response?.data?.message ||
            "Unable to load this conversation."
        );
      }
    },
    [loadChats]
  );

  // Initial load and automatic refresh
  useEffect(() => {
    loadChats();

    const interval = setInterval(() => {
      loadChats();
    }, 10000);

    return () => clearInterval(interval);
  }, [loadChats]);

  // Refresh selected conversation periodically
  useEffect(() => {
    if (!selectedUser?.userId) return;

    const interval = setInterval(() => {
      loadMessages(selectedUser.userId);
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedUser, loadMessages]);

  const selectChat = (chat) => {
    setSelectedUser(chat);
    setMessages([]);
    loadMessages(chat.userId);
  };

  // Send admin reply using the REST API
  const sendMessage = async () => {
    const text = message.trim();

    if (!text || !selectedUser || sending) return;

    setSending(true);

    try {
      await api.post(
        `/chat/admin/${selectedUser.userId}/message`,
        { message: text }
      );

      setMessage("");

      await loadMessages(selectedUser.userId);
      await loadChats();
    } catch (error) {
      console.error(
        "Send message error:",
        error.response?.status,
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  const renderTicks = (msg) => {
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
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <AdminNavbar />

      <div className="admin-support-page">
        <div className="support-chat-list">
          <div className="support-list-header">
            <MessageCircle size={22} />
            <h2>Support Chats</h2>
          </div>

          {loadingChats ? (
            <div className="no-chats">Loading support chats...</div>
          ) : chatError ? (
            <div className="no-chats">
              <p>{chatError}</p>
              <button onClick={loadChats}>Retry</button>
            </div>
          ) : chats.length === 0 ? (
            <div className="no-chats">
              No support messages yet.
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.userId}
                className={`support-user ${
                  String(selectedUser?.userId) ===
                  String(chat.userId)
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

                  <span>
                    {chat.lastMessage || "No messages"}
                  </span>
                </div>

                {chat.unreadCount > 0 && (
                  <span className="unread-count">
                    {chat.unreadCount}
                  </span>
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
                {messages.length === 0 ? (
                  <p className="no-chats">No messages in this conversation.</p>
                ) : (
                  messages.map((msg, index) => (
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
                  ))
                )}
              </div>

              <div className="admin-message-input">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your reply..."
                  disabled={sending}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />

                <button
                  onClick={sendMessage}
                  disabled={!message.trim() || sending}
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
