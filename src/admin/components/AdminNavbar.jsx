import {
  Search,
  Bell,
  ChevronDown,
  ShieldCheck
} from "lucide-react";

import "./AdminNavbar.css";

function AdminNavbar() {
  const admin = JSON.parse(
    localStorage.getItem("invitoAdmin") || "null"
  );

  return (
    <header className="admin-navbar">

      <div className="admin-navbar-left">
        <div className="admin-navbar-title">
          <ShieldCheck size={19} />

          <div>
            <strong>Admin Panel</strong>
            <span>Invito Management</span>
          </div>
        </div>
      </div>

      <div className="admin-navbar-center">

        <div className="admin-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search..."
          />

          <span className="search-shortcut">
            Ctrl K
          </span>
        </div>

      </div>

      <div className="admin-navbar-right">

        <button
          className="admin-notification-button"
          type="button"
        >
          <Bell size={19} />

          <span className="admin-notification-dot" />
        </button>

        <div className="admin-navbar-profile">

          <div className="admin-navbar-avatar">
            {admin?.name
              ?.charAt(0)
              ?.toUpperCase() || "A"}
          </div>

          <div className="admin-navbar-user">

            <strong>
              {admin?.name || "Admin"}
            </strong>

            <span>
              {admin?.role || "super_admin"}
            </span>

          </div>

          <ChevronDown size={16} />

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;