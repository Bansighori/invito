import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  Crown,
  Sparkles,
  UserRound,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Eye,
  UserX,
  UserCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import api from "../../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "./AdminUsers.css";

function AdminUsers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 8;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/admin/users"
      );

      setUsers(response.data.users || []);

    } catch (error) {
      console.error(
        "Admin users error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load users"
      );

    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    return {
      total: users.length,

      free: users.filter(
        (user) => user.plan === "free"
      ).length,

      premium: users.filter(
        (user) => user.plan === "premium"
      ).length,

      premiumPlus: users.filter(
        (user) => user.plan === "premium_plus"
      ).length
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {

      const searchText =
        `${user.name || ""} ${user.email || ""}`
          .toLowerCase();

      const matchesSearch =
        searchText.includes(
          search.toLowerCase()
        );

      const matchesPlan =
        planFilter === "all" ||
        user.plan === planFilter;

      const isVerified =
        user.isEmailVerified === true;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "verified" && isVerified) ||
        (statusFilter === "unverified" && !isVerified);

      return (
        matchesSearch &&
        matchesPlan &&
        matchesStatus
      );
    });
  }, [
    users,
    search,
    planFilter,
    statusFilter
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length /
      usersPerPage
    )
  );

  const paginatedUsers =
    filteredUsers.slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    planFilter,
    statusFilter
  ]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  const getInitial = (name) => {
    return (
      name
        ?.trim()
        ?.charAt(0)
        ?.toUpperCase() || "U"
    );
  };

  const getPlanLabel = (plan) => {
    if (plan === "premium_plus") {
      return "Premium Plus";
    }

    if (plan === "premium") {
      return "Premium";
    }

    return "Free";
  };

  const getPlanIcon = (plan) => {
    if (plan === "premium_plus") {
      return <Sparkles size={14} />;
    }

    if (plan === "premium") {
      return <Crown size={14} />;
    }

    return <UserRound size={14} />;
  };

  const handleUserAction = (
    action,
    user
  ) => {
    setOpenMenu(null);

    if (action === "view") {
      setSelectedUser(user);
      return;
    }

    if (action === "disable") {
      alert(
        `Disable ${user.name} functionality will be connected to the backend next.`
      );
      return;
    }

    if (action === "enable") {
      alert(
        `Enable ${user.name} functionality will be connected to the backend next.`
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-users-loading">
        <div className="admin-users-loader">
          <div />
          <span>
            Loading users...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <AdminSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <AdminNavbar />

      <main className="admin-users-page">

        {/* HEADER */}

        <section className="admin-users-heading">

          <div>
            <span className="admin-page-eyebrow">
              USER MANAGEMENT
            </span>

            <h1>
              Users
            </h1>

            <p>
              Manage customer accounts,
              plans and account activity.
            </p>
          </div>

          <div className="admin-user-count">

            <div className="admin-user-count-icon">
              <Users size={20} />
            </div>

            <div>
              <strong>
                {stats.total}
              </strong>

              <span>
                Total customers
              </span>
            </div>

          </div>

        </section>

        {error && (
          <div className="admin-users-error">
            <XCircle size={17} />
            {error}
          </div>
        )}

        {/* STATISTICS */}

        <section className="admin-user-stat-grid">

          <div className="admin-user-stat total">

            <div className="admin-user-stat-top">
              <span>
                Total Users
              </span>

              <div className="admin-stat-small-icon">
                <Users size={17} />
              </div>
            </div>

            <strong>
              {stats.total}
            </strong>

            <p>
              All registered customers
            </p>

          </div>

          <div className="admin-user-stat free">

            <div className="admin-user-stat-top">
              <span>
                Free
              </span>

              <div className="admin-stat-small-icon">
                <UserRound size={17} />
              </div>
            </div>

            <strong>
              {stats.free}
            </strong>

            <p>
              Free plan users
            </p>

          </div>

          <div className="admin-user-stat premium">

            <div className="admin-user-stat-top">
              <span>
                Premium
              </span>

              <div className="admin-stat-small-icon">
                <Crown size={17} />
              </div>
            </div>

            <strong>
              {stats.premium}
            </strong>

            <p>
              Premium customers
            </p>

          </div>

          <div className="admin-user-stat plus">

            <div className="admin-user-stat-top">
              <span>
                Premium Plus
              </span>

              <div className="admin-stat-small-icon">
                <Sparkles size={17} />
              </div>
            </div>

            <strong>
              {stats.premiumPlus}
            </strong>

            <p>
              Premium Plus customers
            </p>

          </div>

        </section>

        {/* INSIGHT */}

        <section className="admin-users-insight">

          <div className="admin-insight-icon">
            <TrendingUp size={20} />
          </div>

          <div>
            <strong>
              Customer overview
            </strong>

            <p>
              {stats.total > 0
                ? `${stats.premium + stats.premiumPlus} customers currently have a paid plan.`
                : "No customer data available yet."}
            </p>
          </div>

        </section>

        {/* TABLE CARD */}

        <section className="admin-users-card">

          <div className="admin-users-card-header">

            <div>
              <h2>
                All Customers
              </h2>

              <p>
                {filteredUsers.length} users
                matching your filters
              </p>
            </div>

            <div className="admin-users-card-actions">

              <div className="admin-users-search">

                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />

              </div>

              <select
                value={planFilter}
                onChange={(e) =>
                  setPlanFilter(
                    e.target.value
                  )
                }
                className="admin-users-select"
              >
                <option value="all">
                  All Plans
                </option>

                <option value="free">
                  Free
                </option>

                <option value="premium">
                  Premium
                </option>

                <option value="premium_plus">
                  Premium Plus
                </option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="admin-users-select"
              >
                <option value="all">
                  All Status
                </option>

                <option value="verified">
                  Verified
                </option>

                <option value="unverified">
                  Unverified
                </option>
              </select>

            </div>

          </div>

          {/* TABLE */}

          <div className="admin-users-table-scroll">

            <table className="admin-users-table">

              <thead>
                <tr>
                  <th>
                    CUSTOMER
                  </th>

                  <th>
                    PLAN
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    FREE INVITES
                  </th>

                  <th>
                    JOINED
                  </th>

                  <th>
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>

                {paginatedUsers.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="admin-users-empty"
                    >
                      <Users size={35} />

                      <strong>
                        No users found
                      </strong>

                      <span>
                        Try changing your
                        search or filters.
                      </span>
                    </td>
                  </tr>

                ) : (

                  paginatedUsers.map(
                    (user) => (
                      <tr
                        key={user._id}
                      >

                        <td>
                          <div className="admin-customer">

                            <div className="admin-customer-avatar">
                              {getInitial(
                                user.name
                              )}
                            </div>

                            <div>
                              <strong>
                                {user.name ||
                                  "Unnamed User"}
                              </strong>

                              <span>
                                {user.email}
                              </span>
                            </div>

                          </div>
                        </td>

                        <td>

                          <span
                            className={`admin-user-plan ${user.plan}`}
                          >
                            {getPlanIcon(
                              user.plan
                            )}

                            {getPlanLabel(
                              user.plan
                            )}
                          </span>

                        </td>

                        <td>

                          {user.isEmailVerified ? (

                            <span className="admin-user-status verified">

                              <CheckCircle2
                                size={15}
                              />

                              Verified

                            </span>

                          ) : (

                            <span className="admin-user-status unverified">

                              <XCircle
                                size={15}
                              />

                              Unverified

                            </span>

                          )}

                        </td>

                        <td>

                          <div className="admin-invite-usage">

                            <span>
                              {user.freeInvitationsUsed || 0}
                              {" / 3"}
                            </span>

                            <div>
                              <i
                                style={{
                                  width: `${Math.min(
                                    ((user.freeInvitationsUsed || 0) /
                                      3) *
                                      100,
                                    100
                                  )}%`
                                }}
                              />
                            </div>

                          </div>

                        </td>

                        <td>
                          <span className="admin-user-date">
                            {formatDate(
                              user.createdAt
                            )}
                          </span>
                        </td>

                        <td>

                          <div className="admin-user-actions">

                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenu(
                                  openMenu ===
                                    user._id
                                    ? null
                                    : user._id
                                )
                              }
                              className="admin-more-button"
                            >
                              <MoreHorizontal
                                size={18}
                              />
                            </button>

                            {openMenu ===
                              user._id && (

                              <div className="admin-user-menu">

                                <button
                                  onClick={() =>
                                    handleUserAction(
                                      "view",
                                      user
                                    )
                                  }
                                >
                                  <Eye
                                    size={15}
                                  />
                                  View User
                                </button>

                                <button
                                  onClick={() =>
                                    handleUserAction(
                                      user.isActive === false
                                        ? "enable"
                                        : "disable",
                                      user
                                    )
                                  }
                                >
                                  {user.isActive ===
                                  false ? (
                                    <>
                                      <UserCheck
                                        size={15}
                                      />
                                      Enable User
                                    </>
                                  ) : (
                                    <>
                                      <UserX
                                        size={15}
                                      />
                                      Disable User
                                    </>
                                  )}
                                </button>

                              </div>

                            )}

                          </div>

                        </td>

                      </tr>
                    )
                  )

                )}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}

          <div className="admin-users-pagination">

            <span>
              Showing{" "}
              {filteredUsers.length === 0
                ? 0
                : (currentPage - 1) *
                    usersPerPage +
                  1}
              {" - "}
              {Math.min(
                currentPage *
                  usersPerPage,
                filteredUsers.length
              )}
              {" of "}
              {filteredUsers.length}
            </span>

            <div>

              <button
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.max(
                        1,
                        page - 1
                      )
                  )
                }
              >
                <ChevronLeft size={16} />
              </button>

              <span className="admin-page-number">
                {currentPage}
              </span>

              <button
                disabled={
                  currentPage >=
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.min(
                        totalPages,
                        page + 1
                      )
                  )
                }
              >
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* USER DETAILS */}

      {selectedUser && (

        <div
          className="admin-user-modal-overlay"
          onClick={() =>
            setSelectedUser(null)
          }
        >

          <div
            className="admin-user-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="admin-user-modal-header">

              <div>
                <span>
                  CUSTOMER DETAILS
                </span>

                <h2>
                  User Profile
                </h2>
              </div>

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
              >
                ×
              </button>

            </div>

            <div className="admin-user-profile">

              <div className="admin-modal-avatar">
                {getInitial(
                  selectedUser.name
                )}
              </div>

              <div>
                <h3>
                  {selectedUser.name}
                </h3>

                <p>
                  {selectedUser.email}
                </p>
              </div>

            </div>

            <div className="admin-user-details-grid">

              <div>
                <span>
                  PLAN
                </span>

                <strong>
                  {getPlanLabel(
                    selectedUser.plan
                  )}
                </strong>
              </div>

              <div>
                <span>
                  EMAIL
                </span>

                <strong>
                  {selectedUser.isEmailVerified
                    ? "Verified"
                    : "Not Verified"}
                </strong>
              </div>

              <div>
                <span>
                  FREE INVITATIONS
                </span>

                <strong>
                  {selectedUser.freeInvitationsUsed ||
                    0}
                  {" / 3"}
                </strong>
              </div>

              <div>
                <span>
                  JOINED
                </span>

                <strong>
                  {formatDate(
                    selectedUser.createdAt
                  )}
                </strong>
              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default AdminUsers;