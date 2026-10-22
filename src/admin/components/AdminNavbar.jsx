import {
  Search,
  Bell,
  ChevronDown,
  ShieldCheck,
  Check,
  CheckCheck,
  X,
  UserPlus,
  CreditCard,
  FileText,
  ShieldAlert,
} from "lucide-react";

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import adminApi from "../api/adminAxios";
import ChatNotification from "../components/ChatNotification";
import socket from "../../socket";

import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const admin = JSON.parse(
    localStorage.getItem("invitoAdmin") || "null"
  );

  const adminId = admin?.id || admin?._id;

  
useEffect(() => {
  const handleOutsideClick = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, []);


  // ==========================================
  // LOAD ADMIN NOTIFICATIONS
  // ==========================================

  const loadNotifications = useCallback(async () => {
    try {
      setLoadingNotifications(true);

      const response = await adminApi.get("/admin/notifications");

      setNotifications(response.data.notifications || []);
      setUnreadCount(response.data.unreadCount || 0);
    } catch (error) {
      console.error(
        "Failed to load admin notifications:",
        error.response?.data || error.message
      );
    } finally {
      setLoadingNotifications(false);
    }
  }, []);

  // Load notifications when navbar mounts.
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // ==========================================
  // JOIN ADMIN SOCKET ROOM
  // ==========================================

  useEffect(() => {
    if (!adminId) return;

    const joinAdminRoom = () => {
      socket.emit("join_admin_chat", adminId);
    };

    // Join immediately if already connected.
    if (socket.connected) {
      joinAdminRoom();
    }

    // Rejoin after reconnecting.
    socket.on("connect", joinAdminRoom);

    return () => {
      socket.off("connect", joinAdminRoom);
    };
  }, [adminId]);

  // ==========================================
  // REAL-TIME CHAT NOTIFICATION
  // ==========================================

  useEffect(() => {
    const handleChatNotification = (data) => {
      // Only refresh admin notifications for user messages.
      if (data?.sender !== "user") return;

      loadNotifications();
    };

    socket.on("new_chat_notification", handleChatNotification);

    return () => {
      socket.off("new_chat_notification", handleChatNotification);
    };
  }, [loadNotifications]);

  // ==========================================
  // MARK ONE NOTIFICATION AS READ
  // ==========================================

  const markAsRead = async (id) => {
    try {
      const notification = notifications.find(
        (item) => item._id === id
      );

      if (!notification || notification.isRead) return;

      await adminApi.put(`/admin/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item
        )
      );

      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error(
        "Failed to mark admin notification:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // MARK ALL NOTIFICATIONS AS READ
  // ==========================================

  const markAllAsRead = async () => {
    try {
      await adminApi.put("/admin/notifications/read-all");

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Failed to mark all admin notifications:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // DELETE NOTIFICATION
  // ==========================================

  const deleteNotification = async (id) => {
    try {
      const notification = notifications.find(
        (item) => item._id === id
      );

      await adminApi.delete(`/admin/notifications/${id}`);

      setNotifications((prev) =>
        prev.filter((item) => item._id !== id)
      );

      if (notification && !notification.isRead) {
        setUnreadCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.error(
        "Failed to delete admin notification:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // NOTIFICATION CLICK
  // ==========================================

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }

    if (notification.link) {
      setShowNotifications(false);
      navigate(notification.link);
    }
  };

  // ==========================================
  // NOTIFICATION ICON
  // ==========================================

  const getNotificationIcon = (type) => {
    switch (type) {
      case "user":
        return <UserPlus size={18} />;

      case "payment":
        return <CreditCard size={18} />;

      case "invitation":
        return <FileText size={18} />;

      case "security":
        return <ShieldAlert size={18} />;

      default:
        return <Bell size={18} />;
    }
  };

  const getNotificationIconClass = (type) => {
    switch (type) {
      case "user":
        return "admin-notification-icon user";

      case "payment":
        return "admin-notification-icon payment";

      case "invitation":
        return "admin-notification-icon invitation";

      case "security":
        return "admin-notification-icon security";

      default:
        return "admin-notification-icon system";
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatNotificationDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <ChatNotification role="admin" />

      <header className="admin-navbar">
        {/* LEFT */}
        <div className="admin-navbar-left">
          <div className="admin-navbar-title">
            <ShieldCheck size={19} />

            <div>
              <strong>Admin Panel</strong>
              <span>Invito Management</span>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="admin-navbar-center">
          <div className="admin-search">
            <Search size={17} />

            <input type="text" placeholder="Search..." />

            <span className="search-shortcut">Ctrl K</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="admin-navbar-right">
          {/* NOTIFICATIONS */}
          <div
  className="admin-notification-wrapper"
  ref={notificationRef}
>
            <button
              className="admin-notification-button"
              type="button"
              onClick={() => {
                const willOpen = !showNotifications;
                setShowNotifications(willOpen);

                if (willOpen) {
                  loadNotifications();
                }
              }}
            >
              <Bell size={19} />

              {unreadCount > 0 && (
                <span className="admin-notification-count">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="admin-notification-dropdown">
                {/* HEADER */}
                <div className="admin-notification-header">
                  <div>
                    <strong>Notifications</strong>

                    {unreadCount > 0 && (
                      <span>{unreadCount} unread</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="admin-notification-close"
                    onClick={() => setShowNotifications(false)}
                  >
                    <X size={17} />
                  </button>
                </div>

                {/* ACTION */}
                {unreadCount > 0 && (
                  <div className="admin-notification-actions">
                    <button type="button" onClick={markAllAsRead}>
                      <CheckCheck size={15} />
                      Mark all as read
                    </button>
                  </div>
                )}

                {/* NOTIFICATION LIST */}
                <div className="admin-notification-list">
                  {loadingNotifications ? (
                    <div className="admin-notification-loading">
                      <div className="admin-notification-spinner" />
                      <span>Loading notifications...</span>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="admin-notification-empty">
                      <Bell size={30} />
                      <strong>No notifications</strong>
                      <span>You're all caught up.</span>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification._id}
                        className={`admin-notification-item ${
                          !notification.isRead ? "unread" : ""
                        }`}
                      >
                        <button
                          type="button"
                          className={getNotificationIconClass(
                            notification.type
                          )}
                          onClick={() =>
                            handleNotificationClick(notification)
                          }
                        >
                          {getNotificationIcon(notification.type)}
                        </button>

                        <div
                          className="admin-notification-content"
                          onClick={() =>
                            handleNotificationClick(notification)
                          }
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (
                              event.key === "Enter" ||
                              event.key === " "
                            ) {
                              event.preventDefault();
                              handleNotificationClick(notification);
                            }
                          }}
                        >
                          <div className="admin-notification-title">
                            <strong>{notification.title}</strong>

                            {!notification.isRead && (
                              <span className="admin-unread-dot" />
                            )}
                          </div>

                          <p>{notification.message}</p>

                          <small>
                            {formatNotificationDate(
                              notification.createdAt
                            )}
                          </small>
                        </div>

                        <div className="admin-notification-item-actions">
                          {!notification.isRead && (
                            <button
                              type="button"
                              title="Mark as read"
                              onClick={() =>
                                markAsRead(notification._id)
                              }
                            >
                              <Check size={15} />
                            </button>
                          )}

                          <button
                            type="button"
                            title="Delete"
                            onClick={() =>
                              deleteNotification(notification._id)
                            }
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ADMIN PROFILE */}
          <div className="admin-navbar-profile">
            <div className="admin-navbar-avatar">
              {admin?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="admin-navbar-user">
              <strong>{admin?.name || "Admin"}</strong>
              <span>{admin?.role || "super_admin"}</span>
            </div>

            <ChevronDown size={16} />
          </div>
        </div>
      </header>
    </>
  );
}

export default AdminNavbar;