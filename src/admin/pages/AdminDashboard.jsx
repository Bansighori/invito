import { useEffect, useState } from "react";

import {
  Users,
  FileText,
  UserCheck,
  CreditCard,
  Crown,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Settings,
  LayoutTemplate,
  UserCog,
  Gem,
  MessageCircle
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

import api from "../../api/axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import socket from "../../socket";

import "./AdminDashboard.css";

function AdminDashboard() {
  const admin = JSON.parse(
    localStorage.getItem("invitoAdmin") || "null"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvitations: 0,
    totalGuests: 0,
    totalPayments: 0,
    premiumUsers: 0,
    premiumPlusUsers: 0
  });

  const [monthlyUsage, setMonthlyUsage] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
// SOCKET.IO - ADMIN
// ==========================================

useEffect(() => {

  if (!admin?._id) return;


  // ==========================================
  // SOCKET CONNECT
  // ==========================================

  const handleConnect = () => {

    console.log(
      "Admin socket connected:",
      socket.id
    );


    // Join admin support room
    socket.emit(
      "join_admin_chat",
      admin._id
    );


    console.log(
      "Admin joined support chat:",
      admin._id
    );

  };


  // ==========================================
  // ADMIN NOTIFICATION
  // ==========================================

  const handleNotification = (data) => {

    console.log(
      "🔔 New admin notification:",
      data
    );

  };


  // ==========================================
  // USER CHAT MESSAGE
  // ==========================================

  const handleUserMessage = (data) => {

    console.log(
      "💬 New user chat message:",
      data
    );


    /*
      Example data:

      {
        userId: "...",
        message: "I need help",
        sender: "user",
        createdAt: "..."
      }
    */
  };


  // ==========================================
  // LISTENERS
  // ==========================================

  socket.on(
    "connect",
    handleConnect
  );

  socket.on(
    "new_admin_notification",
    handleNotification
  );

  socket.on(
    "admin_receive_message",
    handleUserMessage
  );


  // ==========================================
  // CONNECT
  // ==========================================

  socket.connect();


  // ==========================================
  // CLEANUP
  // ==========================================

  return () => {

    socket.off(
      "connect",
      handleConnect
    );

    socket.off(
      "new_admin_notification",
      handleNotification
    );

    socket.off(
      "admin_receive_message",
      handleUserMessage
    );

    socket.disconnect();

  };

}, [admin?._id]);

  // ==========================================
  // SOCKET.IO - ADMIN NOTIFICATIONS
  // ==========================================

  

  useEffect(() => {

  const handleUserMessage = (data) => {

    console.log(
      "🔔 New user chat message:",
      data
    );

  };

  
  return () => {

    socket.off(
      "admin_receive_message",
      handleUserMessage
    );

  };

}, []);

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/admin/dashboard/stats"
      );

      setStats(
        response.data.stats || {
          totalUsers: 0,
          totalInvitations: 0,
          totalGuests: 0,
          totalPayments: 0,
          premiumUsers: 0,
          premiumPlusUsers: 0
        }
      );

      setMonthlyUsage(
        response.data.monthlyUsage || []
      );

    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load dashboard"
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // STAT CARDS
  // ==========================================

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      className: "users"
    },
    {
      title: "Invitations",
      value: stats.totalInvitations,
      icon: FileText,
      className: "invitations"
    },
    {
      title: "Guests / RSVPs",
      value: stats.totalGuests,
      icon: UserCheck,
      className: "guests"
    },
    {
      title: "Payments",
      value: stats.totalPayments,
      icon: CreditCard,
      className: "payments"
    },
    {
      title: "Premium Users",
      value: stats.premiumUsers,
      icon: Crown,
      className: "premium"
    },
    {
      title: "Premium Plus",
      value: stats.premiumPlusUsers,
      icon: Sparkles,
      className: "premium-plus"
    }
  ];

  // ==========================================
  // PLATFORM CHART DATA
  // ==========================================

  const platformData = [
    {
      name: "Users",
      value: Number(stats.totalUsers) || 0
    },
    {
      name: "Invitations",
      value: Number(stats.totalInvitations) || 0
    },
    {
      name: "Guests",
      value: Number(stats.totalGuests) || 0
    },
    {
      name: "Payments",
      value: Number(stats.totalPayments) || 0
    }
  ];

  // ==========================================
  // PLAN CHART DATA
  // ==========================================

  const freeUsers = Math.max(
    (Number(stats.totalUsers) || 0) -
      (Number(stats.premiumUsers) || 0) -
      (Number(stats.premiumPlusUsers) || 0),
    0
  );

  const planData = [
    {
      name: "Free",
      value: freeUsers
    },
    {
      name: "Premium",
      value: Number(stats.premiumUsers) || 0
    },
    {
      name: "Premium Plus",
      value: Number(stats.premiumPlusUsers) || 0
    }
  ];

  const planColors = [
    "#c4b5fd",
    "#8b5cf6",
    "#ec4899"
  ];

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      {/* SIDEBAR */}

      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* NAVBAR */}

      <AdminNavbar />

      {/* DASHBOARD */}

      <div className="admin-dashboard">

        {/* HEADER */}

        <div className="admin-dashboard-header">

          <div>

            <p className="admin-dashboard-label">
              ADMIN PANEL
            </p>

            <h1>
              Dashboard
            </h1>

            <p>
              Manage and monitor your Invito platform.
            </p>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="admin-dashboard-error">
            {error}
          </div>
        )}

        {/* STATISTICS */}

        <div className="admin-stats-grid">

          {cards.map((card) => {

            const Icon = card.icon;

            return (
              <div
                className={`admin-stat-card ${card.className}`}
                key={card.title}
              >

                <div className="admin-stat-icon">
                  <Icon size={22} />
                </div>

                <div>

                  <p>
                    {card.title}
                  </p>

                  <h2>
                    {card.value}
                  </h2>

                </div>

                <ArrowUpRight
                  className="stat-arrow"
                  size={18}
                />

              </div>
            );

          })}

        </div>

        {/* TOP CHARTS */}

        <div className="admin-charts-grid">

          {/* PLATFORM OVERVIEW */}

          <div className="admin-chart-card">

            <div className="admin-chart-header">

              <div>

                <h3>
                  Platform Overview
                </h3>

                <p>
                  Current platform activity
                </p>

              </div>

              <div className="chart-icon">
                <FileText size={18} />
              </div>

            </div>

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={platformData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 5
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 12
                    }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fontSize: 11
                    }}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[7, 7, 0, 0]}
                    fill="#8b5cf6"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* USER PLANS */}

          <div className="admin-chart-card">

            <div className="admin-chart-header">

              <div>

                <h3>
                  User Plans
                </h3>

                <p>
                  User subscription distribution
                </p>

              </div>

              <div className="chart-icon pink">
                <Crown size={18} />
              </div>

            </div>

            <div className="chart-container plan-chart">

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={planData}
                    cx="50%"
                    cy="45%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >

                    {planData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={planColors[index]}
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* MONTHLY USAGE */}

          <div className="admin-chart-card monthly-usage-card">

            <div className="admin-chart-header">

              <div>

                <h3>
                  Monthly Usage
                </h3>

                <p>
                  Users, invitations and guests activity
                </p>

              </div>

              <div className="chart-icon">
                <Users size={18} />
              </div>

            </div>

            <div className="chart-container monthly-chart">

              {monthlyUsage.length > 0 ? (

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >

                  <LineChart
                    data={monthlyUsage}
                    margin={{
                      top: 10,
                      right: 15,
                      left: -15,
                      bottom: 5
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="month"
                      tick={{
                        fontSize: 11
                      }}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{
                        fontSize: 11
                      }}
                    />

                    <Tooltip />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="users"
                      name="Users"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{
                        r: 3
                      }}
                      activeDot={{
                        r: 6
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="invitations"
                      name="Invitations"
                      stroke="#ec4899"
                      strokeWidth={3}
                      dot={{
                        r: 3
                      }}
                      activeDot={{
                        r: 6
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="guests"
                      name="Guests"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      dot={{
                        r: 3
                      }}
                      activeDot={{
                        r: 6
                      }}
                    />

                  </LineChart>

                </ResponsiveContainer>

              ) : (

                <div className="monthly-empty">

                  <Users size={30} />

                  <p>
                    No monthly usage data available
                  </p>

                  <span>
                    Monthly activity will appear here
                    when usage data is available.
                  </span>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* LOWER SECTION */}

        <div className="admin-lower-grid">

          {/* PLATFORM OVERVIEW */}

          <div className="admin-info-card">

            <div className="info-card-title">

              <div className="info-icon purple">
                <ShieldCheck size={19} />
              </div>

              <div>

                <h3>
                  Platform Overview
                </h3>

                <p>
                  Invito administration
                </p>

              </div>

            </div>

            <p className="info-description">
              Use the admin panel to manage users,
              invitations, templates, payments,
              guests and platform settings.
            </p>

            <div className="overview-items">

              <div>
                <Users size={17} />
                <span>
                  User Management
                </span>
              </div>

              <div>
                <LayoutTemplate size={17} />
                <span>
                  Invitation Templates
                </span>
              </div>

              <div>
                <CreditCard size={17} />
                <span>
                  Payments & Plans
                </span>
              </div>

              <div>
                <UserCog size={17} />
                <span>
                  Admin Management
                </span>
              </div>

            </div>

          </div>

          {/* ADMIN ACCESS */}

          <div className="admin-info-card">

            <div className="info-card-title">

              <div className="info-icon blue">
                <ShieldCheck size={19} />
              </div>

              <div>

                <h3>
                  Admin Access
                </h3>

                <p>
                  Role based access control
                </p>

              </div>

            </div>

            <p className="info-description">
              Your admin account is authenticated
              separately from customer accounts.
              Access is controlled using admin roles
              and permissions.
            </p>

            <div className="access-status">

              <span className="access-dot"></span>

              <span>
                Admin authentication active
              </span>

            </div>

            <div className="access-status">

              <span className="access-dot"></span>

              <span>
                Role-based access enabled
              </span>

            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="quick-actions-card">

          <div className="quick-actions-header">

            <div>

              <h3>
                Quick Actions
              </h3>

              <p>
                Common admin operations
              </p>

            </div>

          </div>

          <div className="quick-actions-grid">

            <button
              className="quick-action"
              onClick={() =>
                window.location.href =
                  "/admin/users"
              }
            >
              <Users size={19} />
              <span>
                Manage Users
              </span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                window.location.href =
                  "/admin/invitations"
              }
            >
              <FileText size={19} />
              <span>
                Invitations
              </span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                window.location.href =
                  "/admin/templates"
              }
            >
              <LayoutTemplate size={19} />
              <span>
                Templates
              </span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                window.location.href =
                  "/admin/payments"
              }
            >
              <CreditCard size={19} />
              <span>
                Payments
              </span>
            </button>

            
<button
  className="quick-action"
  onClick={() => window.location.href = "/admin/plans"}
>
  <Gem size={19} />
  <span>Plans</span>
</button>


<button
  className="quick-action"
  onClick={() => window.location.href = "/admin/support"}
>
  <MessageCircle size={19} />
  <span>Support</span>
</button>


            <button
              className="quick-action"
              onClick={() =>
                window.location.href =
                  "/admin/roles"
              }
            >
              <UserCog size={19} />
              <span>
                Admin Roles
              </span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                window.location.href =
                  "/admin/settings"
              }
            >
              <Settings size={19} />
              <span>
                Settings
              </span>
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;