import { useEffect, useState } from "react";
import socket from "../../socket";
import { useSearchParams } from "react-router-dom";

function AdminSupportChat({ userId }) {

  const admin = JSON.parse(
    localStorage.getItem("invitoAdmin") || "null"
  );

  const [searchParams] = useSearchParams();
const userIdFromUrl = searchParams.get("userId");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  // ==========================================
  // RECEIVE USER MESSAGE
  // ==========================================

  useEffect(() => {

    const handleMessage = (data) => {

      if (data.userId !== userId) {
        return;
      }


      setMessages((previous) => [
        ...previous,
        data
      ]);

    };


    socket.on(
      "admin_receive_message",
      handleMessage
    );


    return () => {

      socket.off(
        "admin_receive_message",
        handleMessage
      );

    };

  }, [userId]);


  // ==========================================
  // SEND ADMIN MESSAGE
  // ==========================================

  const sendMessage = () => {

    if (!message.trim()) {
      return;
    }


    socket.emit(
      "admin_send_message",
      {
        userId,
        adminId: admin?._id,
        message: message.trim()
      }
    );


    setMessages((previous) => [
      ...previous,
      {
        userId,
        adminId: admin?._id,
        message: message.trim(),
        sender: "admin",
        createdAt: new Date()
      }
    ]);


    setMessage("");

  };


  return (

    <div>

      <h2>
        Support Chat
      </h2>


      <div>

        {messages.map(
          (item, index) => (

            <div key={index}>

              <strong>
                {item.sender === "admin"
                  ? "You"
                  : "User"}
              :
              </strong>

              {" "}

              {item.message}

            </div>

          )
        )}

      </div>


      <input
        value={message}
        placeholder="Reply to user..."
        onChange={(e) =>
          setMessage(e.target.value)
        }
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

  );
}

export default AdminSupportChat;