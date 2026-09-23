import {
  Search,
  Bell,
  Plus,
  Sparkles
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user =
    JSON.parse(
      localStorage.getItem("invitoUser")
    ) || {
      name: "User"
    };

  // Create avatar initials
  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="topbar">
      <div className="navbar-brand">
  <div className="navbar-logo">
    <Sparkles size={18} />
  </div>

  <span>Invito</span>
</div>

      <div className="topbar-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search invitations..."
        />

      </div>


      <div className="topbar-right">

        <button
          className="create-button"
          onClick={() =>
            navigate("/invitations/create")
          }
        >
          <Plus size={18} />

          <span>
            Create Invitation
          </span>
        </button>


        <button className="icon-button">

          <Bell size={19} />

          <span className="notification-dot"></span>

        </button>


        <div className="profile">

          <div className="profile-avatar">
            {initials}
          </div>

          <div className="profile-info">

            <p className="profile-name">
              {user.name}
            </p>

            <p className="profile-role">
              User
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;