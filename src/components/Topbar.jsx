import {
  Search,
  Bell,
  Plus,
  Sparkles,
  Check,
  CheckCheck,
  X
} from "lucide-react";

import { useEffect, useState, useRef } from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";
import socket from "../socket";


function Topbar() {

  const navigate = useNavigate();

  // ========================================
  // USER
  // ========================================

  const user =
    JSON.parse(
      localStorage.getItem("invitoUser")
    ) || {
      name: "User"
    };

useEffect(() => {
  const userId = user?.id || user?._id;
  if (!userId) return;

  const joinUserRoom = () => {
    console.log("Joining user room:", String(userId));
    socket.emit("join_user_chat", String(userId));
  };

  socket.on("connect", joinUserRoom);

  if (socket.connected) {
    joinUserRoom();
  } else {
    socket.connect();
  }

  return () => {
    socket.off("connect", joinUserRoom);
  };
}, [user?.id, user?._id]);

useEffect(() => {
  const handleNewNotification = (notification) => {
    if (!notification?._id) return;

    setNotifications((previous) => {
      const exists = previous.some(
        (item) => String(item._id) === String(notification._id)
      );

      if (exists) return previous;

      setUnreadCount((count) => count + 1);

      return [notification, ...previous];
    });
  };

  socket.on("new_notification", handleNewNotification);

  return () => {
    socket.off("new_notification", handleNewNotification);
  };
}, []);


  // ========================================
  // NOTIFICATIONS
  // ========================================

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [loadingNotifications, setLoadingNotifications] =
    useState(false);

  
const notificationRef = useRef(null);


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



  // ========================================
  // GET NOTIFICATIONS
  // ========================================

  
const fetchNotifications = async () => {
  try {
    setLoadingNotifications(true);

    const response = await api.get("/notifications");

    if (!response.data.success) return;

    const serverNotifications = response.data.notifications || [];

    setNotifications((previous) => {
      const chatNotifications = previous.filter(
        (item) => item.isChat
      );

      const combined = [
        ...chatNotifications,
        ...serverNotifications,
      ].filter(
        (item, index, arr) =>
          arr.findIndex((n) => n._id === item._id) === index
      );

      const localUnreadChats = combined.filter(
        (item) => item.isChat && !item.isRead
      ).length;

      setUnreadCount(
        (response.data.unreadCount || 0) + localUnreadChats
      );

      return combined;
    });
  } catch (error) {
    console.error(
      "Failed to fetch notifications:",
      error.response?.data || error
    );
  } finally {
    setLoadingNotifications(false);
  }
};


useEffect(() => {
  const handleChatNotification = (data) => {
    console.log("TOPBAR NOTIFICATION:", data);

    if (data?.sender !== "admin" || !data.notification) return;

    const notification = {
      ...data.notification,
      _id: String(data.notification._id),
    };

    setNotifications((previous) => {
      const exists = previous.some(
        (item) => String(item._id) === notification._id
      );

      if (exists) return previous;

      return [notification, ...previous];
    });

    setUnreadCount((previous) => previous + 1);
  };

  socket.on("new_chat_notification", handleChatNotification);

  return () => {
    socket.off("new_chat_notification", handleChatNotification);
  };
}, []);


  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {

    fetchNotifications();

  }, []);


  // ========================================
  // OPEN NOTIFICATION DROPDOWN
  // ========================================

  const handleNotificationClick = () => {

    setShowNotifications(
      (previous) => !previous
    );

    if (!showNotifications) {
      fetchNotifications();
    }

  };


  // ========================================
  // MARK ONE AS READ
  // ========================================

const markAsRead = async (notification) => {
  try {
    if (!notification.isRead) {
      await api.put(`/notifications/${notification._id}/read`);

      setNotifications((previous) =>
        previous.map((item) =>
          String(item._id) === String(notification._id)
            ? { ...item, isRead: true }
            : item
        )
      );

      setUnreadCount((previous) => Math.max(previous - 1, 0));
    }

    if (notification.link) {
      setShowNotifications(false);
      navigate(notification.link);
    }
  } catch (error) {
    console.error(
      "Failed to mark notification as read:",
      error.response?.data || error
    );
  }
};


  // ========================================
  // MARK ALL AS READ
  // ========================================

  const markAllAsRead = async () => {

    try {

      await api.put(
        "/notifications/read-all"
      );

      setNotifications(
        (previous) =>
          previous.map((notification) => ({
            ...notification,
            isRead: true
          }))
      );

      setUnreadCount(0);

    } catch (error) {

      console.error(
        "Failed to mark all notifications:",
        error
      );

    }

  };


  // ========================================
  // FORMAT DATE
  // ========================================

  const formatNotificationDate = (date) => {

    if (!date) {
      return "";
    }

    const notificationDate =
      new Date(date);

    const now = new Date();

    const difference =
      now - notificationDate;

    const minutes =
      Math.floor(
        difference / (1000 * 60)
      );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    const hours =
      Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours}h ago`;
    }

    const days =
      Math.floor(hours / 24);

    if (days < 7) {
      return `${days}d ago`;
    }

    return notificationDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short"
      }
    );

  };


  // ========================================
  // INITIALS
  // ========================================

  const initials = user.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();


  return (
    <header className="topbar">
      

      {/* =====================================
          BRAND
      ===================================== */}

      <div className="navbar-brand">

        <div className="navbar-logo">
          <Sparkles size={18} />
        </div>

        <span>
          Invito
        </span>

      </div>


      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="topbar-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search invitations..."
        />

      </div>


      {/* =====================================
          RIGHT SIDE
      ===================================== */}

      <div className="topbar-right">


        {/* CREATE BUTTON */}

        <button
          className="create-button"
          onClick={() =>
            navigate("/templates")
          }
        >

          <Plus size={18} />


          <span>
            Create Invitation
          </span>

        </button>


        {/* ===================================
            NOTIFICATION
        =================================== */}

        
<div className="notification-wrapper" ref={notificationRef}>


          <button
            className="icon-button notification-button"
            onClick={handleNotificationClick}
            type="button"
            aria-label="Notifications"
          >

            <Bell size={19} />

            {unreadCount > 0 && (
              <span className="notification-count">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}

          </button>


          {/* =================================
              NOTIFICATION DROPDOWN
          ================================= */}

          {showNotifications && (

            <div className="notification-dropdown">

              {/* HEADER */}

              <div className="notification-header">

                <div>

                  <h3>
                    Notifications
                  </h3>

                  {unreadCount > 0 && (
                    <span>
                      {unreadCount} unread
                    </span>
                  )}

                </div>


                {unreadCount > 0 && (

                  <button
                    type="button"
                    className="mark-all-button"
                    onClick={markAllAsRead}
                  >

                    <CheckCheck size={15} />

                    Mark all read

                  </button>

                )}

              </div>


              {/* CONTENT */}

              <div className="notification-list">

                {loadingNotifications ? (

                  <div className="notification-empty">

                    <div className="notification-spinner"></div>

                    <p>
                      Loading notifications...
                    </p>

                  </div>

                ) : notifications.length === 0 ? (

                  <div className="notification-empty">

                    <Bell size={28} />

                    <h4>
                      No notifications
                    </h4>

                    <p>
                      You're all caught up!
                    </p>

                  </div>

                ) : (

                  notifications.map(
                    (notification) => (

                      <button
                        key={notification._id}
                        type="button"
                        className={`notification-item ${
                          !notification.isRead
                            ? "unread"
                            : ""
                        }`}
                        onClick={() =>
                          markAsRead(
                            notification
                          )
                        }
                      >

                        <div className="notification-item-icon">

                          {notification.type ===
                            "rsvp" && "🎉"}

                          {notification.type ===
                            "payment" && "💳"}

                          {notification.type ===
                            "invitation" && "💌"}

                          {notification.type ===
                            "plan" && "⭐"}

                          {notification.type ===
                            "system" && "🔔"}

                        </div>


                        <div className="notification-item-content">

                          <div className="notification-item-title">

                            <strong>
                              {notification.title}
                            </strong>

                            {!notification.isRead && (
                              <span className="unread-dot"></span>
                            )}

                          </div>


                          <p>
                            {notification.message}
                          </p>


                          <small>
                            {formatNotificationDate(
                              notification.createdAt
                            )}
                          </small>

                        </div>


                        {!notification.isRead && (
                          <div className="notification-read-icon">
                            <Check size={14} />
                          </div>
                        )}

                      </button>

                    )
                  )

                )}

              </div>


              {/* FOOTER */}

              {notifications.length > 0 && (

                <div className="notification-footer">

                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(false);
                    }}
                  >
                    View all notifications
                  </button>

                </div>

              )}

            </div>

          )}

        </div>


        {/* ===================================
            PROFILE
        =================================== */}

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