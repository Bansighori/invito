import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminSettings.css";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

function AdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [admin, setAdmin] = useState(null);

  const [notifications, setNotifications] = useState({
    loginAlerts: true,
    securityAlerts: true,
    systemNotifications: true
  });


  // ==========================================
 // LOAD ADMIN PROFILE
  // ==========================================

  const loadProfile = async () => {
  try {
    const response = await api.get("/admin/settings/profile");
    setAdmin(response.data.admin);
  } catch (error) {
    console.error(
      "Load profile error:",
      error.response?.data || error.message
    );
  }
};

  useEffect(() => {
    loadProfile();
  }, []);

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
  };

  const saveProfile = async () => {
  try {
    await api.put("/admin/settings/profile", {
      name: admin.name,
      email: admin.email,
    });

    alert("Profile updated successfully");
    loadProfile();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to update profile"
    );
  }
};

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

    window.location.href =
      "/admin/login";
  };

  // ==========================================
  // NOTIFICATION TOGGLE
  // ==========================================

  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  if (!admin) {
    return (
      <>
        <AdminSidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <AdminNavbar />

        <div className="settings-loading">
          Loading settings...
        </div>
      </>
    );
  }

  return (
    <>
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <AdminNavbar />

      <main className="admin-settings">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="settings-header">

          <div>
            <h1>Admin Settings</h1>

            <p>
              Manage your administrator account
              and panel preferences.
            </p>
          </div>

        </div>


        {/* =====================================
            PROFILE
        ===================================== */}

        <section className="settings-card">

          <div className="settings-card-header">
            <div>
              <h2>Profile</h2>

              <p>
                Manage your administrator
                profile information.
              </p>
            </div>
          </div>


          <div className="profile-grid">

            <div className="setting-field">

              <label>Name</label>

              <input
                type="text"
                name="name"
                value={admin.name || ""}
                onChange={handleChange}
              />

            </div>


            <div className="setting-field">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={admin.email || ""}
                onChange={handleChange}
              />

            </div>


            <div className="setting-field">

              <label>Role</label>

              <div className="readonly-field">
                {admin.role?.replaceAll(
                  "_",
                  " "
                )}
              </div>

            </div>


            <div className="setting-field">

              <label>Account Status</label>

              <div className="status-field">

                <span
                  className={
                    admin.isActive
                      ? "status-dot active"
                      : "status-dot inactive"
                  }
                />

                {admin.isActive
                  ? "Active"
                  : "Inactive"}

              </div>

            </div>

          </div>


          <div className="settings-actions">

            <button
              className="save-btn"
              onClick={saveProfile}
            >
              Save Changes
            </button>

          </div>

        </section>


        {/* =====================================
            NOTIFICATIONS
        ===================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div>
              <h2>Notifications</h2>

              <p>
                Choose which admin notifications
                you want to receive.
              </p>
            </div>

          </div>


          <div className="notification-list">

            {/* LOGIN ALERTS */}

            <div className="notification-item">

              <div>
                <strong>
                  Admin Login Alerts
                </strong>

                <p>
                  Receive notifications when
                  an admin logs into the panel.
                </p>
              </div>

              <button
                className={
                  notifications.loginAlerts
                    ? "toggle on"
                    : "toggle"
                }
                onClick={() =>
                  toggleNotification(
                    "loginAlerts"
                  )
                }
              >
                <span />
              </button>

            </div>


            {/* SECURITY ALERTS */}

            <div className="notification-item">

              <div>
                <strong>
                  Security Alerts
                </strong>

                <p>
                  Receive important security
                  notifications.
                </p>
              </div>

              <button
                className={
                  notifications.securityAlerts
                    ? "toggle on"
                    : "toggle"
                }
                onClick={() =>
                  toggleNotification(
                    "securityAlerts"
                  )
                }
              >
                <span />
              </button>

            </div>


            {/* SYSTEM NOTIFICATIONS */}

            <div className="notification-item">

              <div>
                <strong>
                  System Notifications
                </strong>

                <p>
                  Receive important system
                  notifications.
                </p>
              </div>

              <button
                className={
                  notifications.systemNotifications
                    ? "toggle on"
                    : "toggle"
                }
                onClick={() =>
                  toggleNotification(
                    "systemNotifications"
                  )
                }
              >
                <span />
              </button>

            </div>

          </div>

        </section>


        {/* =====================================
            SECURITY STATUS
        ===================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div>
              <h2>Security Status</h2>

              <p>
                Current security status of
                your administrator account.
              </p>
            </div>

          </div>


          <div className="security-list">

            <div className="security-item">

              <span>
                Admin Authentication
              </span>

              <strong className="enabled">
                ✓ Enabled
              </strong>

            </div>


            <div className="security-item">

              <span>
                Role-Based Access
              </span>

              <strong className="enabled">
                ✓ Enabled
              </strong>

            </div>


            <div className="security-item">

              <span>
                Account Status
              </span>

              <strong
                className={
                  admin.isActive
                    ? "enabled"
                    : "disabled"
                }
              >
                {admin.isActive
                  ? "✓ Active"
                  : "✕ Disabled"}
              </strong>

            </div>

          </div>

        </section>


        {/* =====================================
            SESSION
        ===================================== */}

        <section className="settings-card">

          <div className="settings-card-header">

            <div>
              <h2>Current Session</h2>

              <p>
                Manage your current admin session.
              </p>
            </div>

          </div>


          <div className="session-box">

            <div className="session-info">

              <div className="session-icon">
                ●
              </div>

              <div>

                <strong>
                  Current Admin Session
                </strong>

                <p>
                  Your account is currently
                  signed in to the admin panel.
                </p>

              </div>

            </div>


            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </section>

      </main>
    </>
  );
}

export default AdminSettings;