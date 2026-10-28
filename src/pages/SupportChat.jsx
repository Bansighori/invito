import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Send,
  Headphones,
  Check,
  CheckCheck,
} from "lucide-react";
import axios from "axios";
import socket from "../socket";
import "./SupportChat.css";

function SupportChat() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [chatNotice, setChatNotice] = useState("");

  const messagesContainerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const previousMessageCountRef = useRef(0);

  const user = JSON.parse(
    localStorage.getItem("invitoUser") || "null"
  );
  const userId = user?.id || user?._id;
  const token = localStorage.getItem("invitoToken");

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

  // Scroll to the latest message when appropriate.
  const scrollToBottom = useCallback((behavior = "auto") => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }, []);

  // Track whether the user is already near the bottom.
  const handleMessagesScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight;

    shouldAutoScrollRef.current = distanceFromBottom < 120;
  };

  
  // Open the conversation at the latest message.
  useEffect(() => {
    if (loadingHistory) return;

    const container = messagesContainerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight;
      shouldAutoScrollRef.current = true;
      previousMessageCountRef.current = messages.length;
    });
  }, [loadingHistory, scrollToBottom]);

  // Scroll down when new messages arrive, unless the user
  // is reading older messages.
  useEffect(() => {
    if (loadingHistory) return;

    const previousCount = previousMessageCountRef.current;

    if (
      messages.length > previousCount &&
      shouldAutoScrollRef.current
    ) {
      requestAnimationFrame(() => {
        scrollToBottom("smooth");
      });
    }

    previousMessageCountRef.current = messages.length;
  }, [messages, loadingHistory, scrollToBottom]);


  // Update delivery and read status.
  const updateMessageStatus = useCallback((status) => {
    const id = status?._id || status?.messageId;
    if (!id) return;

    setMessages((previous) =>
      previous.map((msg) =>
        String(msg._id) === String(id)
          ? {
              ...msg,
              delivered: status.delivered ?? msg.delivered,
              read: status.read ?? msg.read,
            }
          : msg
      )
    );
  }, []);

  // Load previous messages.
  useEffect(() => {
    let active = true;

    const loadChatHistory = async () => {
      try {
        if (!token) return;

        const response = await axios.get(
          "http://localhost:5000/api/chat",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (active && response.data.success) {
          setMessages(response.data.messages || []);
        }
      } catch (error) {
        console.error(
          "Chat history error:",
          error.response?.data || error
        );
      } finally {
        if (active) setLoadingHistory(false);
      }
    };

    loadChatHistory();

    return () => {
      active = false;
    };
  }, [token]);

  // Socket connection and live messages.
  useEffect(() => {
    if (!userId) return;

    const handleConnect = () => {
      setConnected(true);
      socket.emit("join_user_chat", userId);
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleChatNotification = (data) => {
      if (data?.sender === "admin") {
        setChatNotice("New reply from Invito Support");
      }
    };

    const handleAdminMessage = (data) => {
      if (!data?._id) return;

      setMessages((previous) => {
        if (
          previous.some(
            (msg) => String(msg._id) === String(data._id)
          )
        ) {
          return previous;
        }

        return [...previous, data];
      });

      socket.emit("message_delivered", {
        messageId: data._id,
      });
    };

    const handleUserMessageSaved = (savedMessage) => {
      if (!savedMessage?._id) return;

      setMessages((previous) => {
        if (
          previous.some(
            (msg) => String(msg._id) === String(savedMessage._id)
          )
        ) {
          return previous;
        }

        const tempIndex = previous.findIndex(
          (msg) =>
            String(msg._id).startsWith("temp-") &&
            msg.sender === "user" &&
            msg.message === savedMessage.message
        );

        if (tempIndex !== -1) {
          return previous.map((msg, index) =>
            index === tempIndex ? savedMessage : msg
          );
        }

        return [...previous, savedMessage];
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("new_chat_notification", handleChatNotification);
    socket.on("user_receive_message", handleAdminMessage);
    socket.on("user_message_saved", handleUserMessageSaved);
    socket.on("message_status_update", updateMessageStatus);

    if (!socket.connected) {
      socket.connect();
    } else {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("new_chat_notification", handleChatNotification);
      socket.off("user_receive_message", handleAdminMessage);
      socket.off("user_message_saved", handleUserMessageSaved);
      socket.off("message_status_update", updateMessageStatus);
    };
  }, [userId, updateMessageStatus]);

  // Mark admin messages delivered and read when the chat is open.
  useEffect(() => {
    if (loadingHistory || !connected) return;

    messages.forEach((msg) => {
      if (msg.sender === "admin" && msg._id) {
        socket.emit("message_delivered", {
          messageId: msg._id,
        });

        socket.emit("message_read", {
          messageId: msg._id,
        });
      }
    });
  }, [loadingHistory, connected, messages]);

  // Send a message.
  const sendMessage = () => {
    const text = message.trim();

    if (!text || !userId || !socket.connected) return;

    shouldAutoScrollRef.current = true;

    const tempId = `temp-${Date.now()}`;

    setMessages((previous) => [
      ...previous,
      {
        _id: tempId,
        userId,
        message: text,
        sender: "user",
        createdAt: new Date().toISOString(),
        delivered: false,
        read: false,
      },
    ]);

    socket.emit("user_send_message", {
      userId,
      message: text,
    });

    setMessage("");
  };

  const renderTicks = (msg) => {
    if (msg.sender !== "user") return null;

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
    <div className="support-page">
      {/* Header */}
      <div className="support-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="support-title">
          <div className="support-icon">
            <Headphones size={22} />
          </div>

          <div>
            <h2>Invito Support</h2>
            <span>{connected ? "Online" : "Connecting..."}</span>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="support-chat-container">
        {loadingHistory && (
          <div className="chat-loading">
            Loading conversation...
          </div>
        )}

        {!loadingHistory && messages.length === 0 && (
          <div className="chat-welcome">
            <div className="welcome-icon">
              <Headphones size={28} />
            </div>

            <h3>How can we help?</h3>

            <p>
              Send us a message and our support team
              will get back to you.
            </p>
          </div>
        )}

        <div
          className="messages"
          ref={messagesContainerRef}
          onScroll={handleMessagesScroll}
        >
          {messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`message-row ${
                msg.sender === "user" ? "user" : "admin"
              }`}
            >
              <div className="message-bubble">
                <div className="message-text">
                  {msg.message}
                </div>

                <span className="message-time">
                  {formatTime(msg.createdAt)}
                  {renderTicks(msg)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input */}
      <div className="support-input-area">
        <div className="support-input-box">
          <input
            type="text"
            placeholder={
              connected ? "Type your message..." : "Connecting..."
            }
            value={message}
            disabled={!connected}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!connected || !message.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupportChat;
