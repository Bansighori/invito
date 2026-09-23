import {
  LayoutDashboard,
  Users,
  FileText,
  Palette,
  UserCheck,
  CreditCard,
  Crown,
  BarChart3,
  Bell,
  ShieldCheck,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import "./AdminSidebar.css";


function AdminSidebar({
  isOpen,
  setIsOpen
}) {
  const navigate = useNavigate();

  const admin =
    JSON.parse(
      localStorage.getItem("invitoAdmin") || "null"
    );

  const menuItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users
    },
    {
      label: "Invitations",
      path: "/admin/invitations",
      icon: FileText
    },
    {
      label: "Templates",
      path: "/admin/templates",
      icon: Palette
    },
    {
      label: "Guests / RSVPs",
      path: "/admin/guests",
      icon: UserCheck
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard
    },
    {
      label: "Plans",
      path: "/admin/plans",
      icon: Crown
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3
    },
    {
      label: "Notifications",
      path: "/admin/notifications",
      icon: Bell
    },
    {
      label: "Admin Roles",
      path: "/admin/roles",
      icon: ShieldCheck
    },
    {
      label: "Activity Logs",
      path: "/admin/activity-logs",
      icon: Activity
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem(
      "invitoAdminToken"
    );

    localStorage.removeItem(
      "invitoAdmin"
    );

    navigate(
      "/admin/login",
      { replace: true }
    );
  };

  return (
    <>
      <button
        className="admin-sidebar-menu-button"
        onClick={() =>
          setIsOpen(!isOpen)
        }
      >
        {isOpen ? (
          <X size={20} />
        ) : (
          <Menu size={20} />
        )}
      </button>

      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() =>
            setIsOpen(false)
          }
        />
      )}

      <aside
        className={`admin-sidebar ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">

            <div className="admin-sidebar-logo">
              <Sparkles size={19} />
            </div>

            <div>
              <strong>
                Invito
              </strong>

              <span>
                Admin Panel
              </span>
            </div>

          </div>
        </div>

        <div className="admin-sidebar-section">
          MAIN
        </div>

        <nav className="admin-sidebar-nav">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `admin-sidebar-link ${
                    isActive
                      ? "active"
                      : ""
                  }`
                }
                onClick={() =>
                  setIsOpen(false)
                }
              >
                <Icon size={18} />

                <span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}

        </nav>

        <div className="admin-sidebar-bottom">

          <div className="admin-sidebar-profile">

            <div className="admin-avatar">
              {admin?.name
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div className="admin-profile-info">

              <strong>
                {admin?.name ||
                  "Admin"}
              </strong>

              <span>
                {admin?.role ||
                  "administrator"}
              </span>

            </div>

          </div>

          <button
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={17} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default AdminSidebar;