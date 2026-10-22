import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import socket from "../../socket";

function ChatNotification({ role = "admin" }) {
  const [notification, setNotification] = useState(null);
const timerRef = useRef(null);

useEffect(() => {
  const handleNotification = (data) => {
    if (!data) return;
    if (role === "admin" && data.sender !== "user") return;
    if (role === "user" && data.sender !== "admin") return;

    setNotification(data);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  socket.on("new_chat_notification", handleNotification);

  return () => {
    socket.off("new_chat_notification", handleNotification);
    clearTimeout(timerRef.current);
  };
}, [role]);

const closeNotification = () => {
  clearTimeout(timerRef.current);
  setNotification(null);
};

  function clearTimeoutTimer() {
    // The effect cleanup also clears its timer.
    // This function is kept separate for manual dismissal.
  }

  if (!notification) return null;

  return (
    <>
      <style>
        {`
          .chat-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            width: 320px;
            max-width: calc(100vw - 32px);
            padding: 16px;
            color: #222;
            background: #fff;
            border-radius: 14px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.14);
            border-left: 4px solid #6c63ff;
            animation: chatNotificationIn 0.25s ease-out;
          }

          .chat-notification-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
          }

          .chat-notification-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            flex-shrink: 0;
            color: #6c63ff;
            background: #f0efff;
            border-radius: 10px;
          }

          .chat-notification-heading {
            flex: 1;
            min-width: 0;
          }

          .chat-notification-heading strong {
            display: block;
            font-size: 14px;
          }

          .chat-notification-heading small {
            display: block;
            margin-top: 3px;
            color: #777;
            font-size: 12px;
          }

          .chat-notification-close {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            color: #777;
            background: transparent;
            border: none;
            border-radius: 6px;
            cursor: pointer;
          }

          .chat-notification-close:hover {
            color: #222;
            background: #f3f3f3;
          }

          .chat-notification p {
            margin: 8px 0;
            font-size: 13px;
            line-height: 1.5;
          }

          .chat-notification-message {
            display: block;
            overflow-wrap: anywhere;
            color: #666;
            font-size: 13px;
          }

          @keyframes chatNotificationIn {
            from {
              opacity: 0;
              transform: translateX(15px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @media (max-width: 480px) {
            .chat-notification {
              top: 12px;
              right: 12px;
            }
          }
        `}
      </style>

      <div
        className="chat-notification"
        role="status"
        aria-live="polite"
      >
        <div className="chat-notification-header">
          <div className="chat-notification-icon">
            <MessageCircle size={20} />
          </div>

          <div className="chat-notification-heading">
            <strong>New chat message</strong>

            <small>
              {role === "admin"
                ? "A user sent you a message"
                : "You received a reply from admin"}
            </small>
          </div>

          <button
            type="button"
            className="chat-notification-close"
            onClick={closeNotification}
            aria-label="Close notification"
          >
            <X size={17} />
          </button>
        </div>

        <p>
          {role === "admin"
            ? "New message from a user:"
            : "New message from support:"}
        </p>

        <span className="chat-notification-message">
          {notification.message}
        </span>
      </div>
    </>
  );
}

export default ChatNotification;