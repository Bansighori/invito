import {
  LayoutDashboard,
  Users,
  FileText,
  Palette,
  CreditCard,
  Crown,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  MessageCircle
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import "./AdminSidebar.css";

function AdminSidebar({
  isOpen,
  setIsOpen
}) {
  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("invitoAdmin") || "null"
  );

  const adminRole =
    admin?.role || "super_admin";


  // ==========================================
  // MENU ITEMS
  // ==========================================

  const menuItems = [

    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: [
        "super_admin",
        "user_admin",
        "template_admin",
        "payment_admin",
        "support_admin"
      ]
    },

    {
      label: "Users",
      path: "/admin/users",
      icon: Users,
      roles: [
        "super_admin",
        "user_admin",
        "support_admin"
      ]
    },

    {
      label: "Invitations",
      path: "/admin/invitations",
      icon: FileText,
      roles: [
        "super_admin",
        "support_admin"
      ]
    },

    {
      label: "Templates",
      path: "/admin/templates",
      icon: Palette,
      roles: [
        "super_admin",
        "template_admin"
      ]
    },

    {
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
      roles: [
        "super_admin",
        "payment_admin"
      ]
    },

    {
      label: "Plans",
      path: "/admin/plans",
      icon: Crown,
      roles: [
        "super_admin",
        "payment_admin"
      ]
    },

    // ==========================================
    // SUPPORT
    // ==========================================

    {
      label: "Support",
      path: "/admin/support",
      icon: MessageCircle,
      roles: [
        "super_admin",
        "support_admin"
      ]
    },

    {
      label: "Admin Roles",
      path: "/admin/roles",
      icon: ShieldCheck,
      roles: [
        "super_admin"
      ]
    },

    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
      roles: [
        "super_admin"
      ]
    }

  ];


  // ==========================================
  // FILTER MENU BY ADMIN ROLE
  // ==========================================

  const visibleMenuItems =
    menuItems.filter((item) =>
      item.roles.includes(adminRole)
    );


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "invitoAdminToken"
    );

    localStorage.removeItem(
      "invitoAdmin"
    );

    navigate(
      "/admin/login",
      {
        replace: true
      }
    );
  };


  return (
    <>
      {/* =====================================
          MOBILE MENU BUTTON
      ===================================== */}

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


      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}

      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() =>
            setIsOpen(false)
          }
        />
      )}


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`admin-sidebar ${
          isOpen ? "open" : ""
        }`}
      >

        {/* =====================================
            HEADER
        ===================================== */}

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


        {/* =====================================
            MAIN MENU
        ===================================== */}

        <div className="admin-sidebar-section">
          MAIN
        </div>


        <nav className="admin-sidebar-nav">

          {visibleMenuItems.map((item) => {

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


        {/* =====================================
            ADMIN PROFILE
        ===================================== */}

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


          {/* =====================================
              LOGOUT
          ===================================== */}

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