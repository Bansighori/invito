import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  UserCheck,
  CreditCard,
  Crown,
  Sparkles
} from "lucide-react";

import api from "../../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "./AdminDashboard.css";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvitations: 0,
    totalGuests: 0,
    totalPayments: 0,
    premiumUsers: 0,
    premiumPlusUsers: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      setStats(response.data.stats);

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

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
      {/* Admin Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <AdminNavbar />

      {/* Dashboard */}
      <div className="admin-dashboard">

        <div className="admin-dashboard-header">
          <div>
            <p className="admin-dashboard-label">
                       
            </p>

            <h1>
              Dashboard
            </h1>

            <p>
              Manage and monitor your Invito platform.
            </p>
          </div>
        </div>

        {error && (
          <div className="admin-dashboard-error">
            {error}
          </div>
        )}

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
              </div>
            );
          })}

        </div>

        <div className="admin-dashboard-info">

          <div className="admin-info-card">
            <h3>
              Platform Overview
            </h3>

            <p>
              Use the admin panel to manage users,
              invitations, templates, payments,
              guests and platform settings.
            </p>
          </div>

          <div className="admin-info-card">
            <h3>
              Admin Access
            </h3>

            <p>
              Your current admin account is authenticated
              separately from customer accounts.
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;