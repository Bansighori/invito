import { useEffect, useState } from "react";
import socket from "../socket";

function UserSupportChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (!user?._id) return;

    const handleConnect = () => {
      console.log("User socket connected:", socket.id);

      socket.emit("join_user_chat", user._id);
    };

    const handleAdminMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("connect", handleConnect);
    socket.on("user_receive_message", handleAdminMessage);

    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("user_receive_message", handleAdminMessage);
      socket.disconnect();
    };
  }, [user?._id]);

  const sendMessage = () => {
    if (!message.trim() || !user?._id) return;

    const data = {
      userId: user._id,
      message: message.trim()
    };

    socket.emit("user_send_message", data);

    setMessages((prev) => [
      ...prev,
      {
        ...data,
        sender: "user",
        createdAt: new Date()
      }
    ]);

    setMessage("");
  };

  return (
    <div className="support-chat">

      <h2>💬 Help & Support</h2>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`chat-message ${msg.sender}`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}

export default UserSupportChat;