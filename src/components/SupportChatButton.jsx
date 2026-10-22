import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./SupportChatButton.css";

function SupportChatButton() {
  const navigate = useNavigate();

  return (
    <button
      className="support-chat-button"
      onClick={() => navigate("/support")}
      title="Help & Support"
    >
      <MessageCircle size={24} />
    </button>
  );
}

export default SupportChatButton;