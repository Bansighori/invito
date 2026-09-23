import { useEffect, useMemo, useState } from "react";
import {
  Search,
  FileText,
  CheckCircle2,
  Clock3,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Heart,
  Cake,
  Baby,
  PartyPopper,
  Sparkles,
  X
} from "lucide-react";

import api from "../../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

import "./AdminInvitations.css";

function AdminInvitations() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [invitations, setInvitations] =
    useState([]);

  const [stats, setStats] = useState({
    totalInvitations: 0,
    publishedInvitations: 0,
    draftInvitations: 0
  });

  const [categoryStats, setCategoryStats] =
    useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");
  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [selectedInvitation, setSelectedInvitation] =
    useState(null);

  const [openMenu, setOpenMenu] =
    useState(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const invitationsPerPage = 8;

  useEffect(() => {
    loadInvitations();
  }, []);

  const loadInvitations = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get(
          "/admin/invitations"
        );

      setStats(
        response.data.stats || {}
      );

      setCategoryStats(
        response.data.categoryStats || []
      );

      setInvitations(
        response.data.invitations || []
      );

    } catch (error) {
      console.error(
        "Admin invitations error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load invitations"
      );

    } finally {
      setLoading(false);
    }
  };

  const categories = [
  "Wedding",
  "Birthday",
  "Engagement",
  "Baby Shower",
  "Party",
  "Other"
];

  const filteredInvitations =
    useMemo(() => {
      return invitations.filter(
        (invitation) => {

          const title =
            invitation.title || "";

          const userName =
            invitation.userId?.name || "";

          const userEmail =
            invitation.userId?.email || "";

          const searchText =
            `${title} ${userName} ${userEmail}`
              .toLowerCase();

          const matchesSearch =
            searchText.includes(
              search.toLowerCase()
            );

          const matchesStatus =
            statusFilter === "all" ||
            invitation.status ===
              statusFilter;

          const matchesCategory =
            categoryFilter === "all" ||
            invitation.category ===
              categoryFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory
          );
        }
      );
    }, [
      invitations,
      search,
      statusFilter,
      categoryFilter
    ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredInvitations.length /
          invitationsPerPage
      )
    );

  const paginatedInvitations =
    filteredInvitations.slice(
      (currentPage - 1) *
        invitationsPerPage,
      currentPage *
        invitationsPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
    categoryFilter
  ]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  const getCategoryIcon = (
    category
  ) => {
    const value =
      String(category || "")
        .toLowerCase();

    if (value.includes("wedding")) {
      return <Heart size={14} />;
    }

    if (value.includes("birthday")) {
      return <Cake size={14} />;
    }

    if (value.includes("baby")) {
      return <Baby size={14} />;
    }

    if (
      value.includes("party") ||
      value.includes("event")
    ) {
      return <PartyPopper size={14} />;
    }

    return <Sparkles size={14} />;
  };

  const getCategoryClass = (
    category
  ) => {
    const value =
      String(category || "")
        .toLowerCase();

    if (value.includes("wedding")) {
      return "wedding";
    }

    if (value.includes("birthday")) {
      return "birthday";
    }

    if (value.includes("baby")) {
      return "baby";
    }

    if (
      value.includes("party") ||
      value.includes("event")
    ) {
      return "party";
    }

    return "other";
  };

  const getPercentage = (count) => {
    const total =
      stats.totalInvitations || 0;

    if (!total) return 0;

    return Math.round(
      (count / total) * 100
    );
  };

  const handleAction = (
    action,
    invitation
  ) => {
    setOpenMenu(null);

    if (action === "view") {
      setSelectedInvitation(
        invitation
      );
    }
  };

  if (loading) {
    return (
      <div className="admin-invitations-loading">
        <div className="admin-invitations-loader">
          <div />
          <span>
            Loading invitations...
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

      <main className="admin-invitations-page">

        {/* HEADER */}

        <section className="admin-invitations-heading">

          <div>
            <span className="admin-page-eyebrow">
              INVITATION MANAGEMENT
            </span>

            <h1>
              Invitations
            </h1>

            <p>
              Monitor and manage invitations
              created across the Invito platform.
            </p>
          </div>

          <div className="admin-invitation-total">

            <div>
              <FileText size={20} />
            </div>

            <section>
              <strong>
                {stats.totalInvitations || 0}
              </strong>

              <span>
                Total Invitations
              </span>
            </section>

          </div>

        </section>

        {/* ERROR */}

        {error && (
          <div className="admin-invitations-error">
            {error}
          </div>
        )}

        {/* STAT CARDS */}

        <section className="admin-invitation-stat-grid">

          <div className="admin-invitation-stat total">

            <div className="admin-invitation-stat-top">

              <span>
                Total Invitations
              </span>

              <div>
                <FileText size={17} />
              </div>

            </div>

            <strong>
              {stats.totalInvitations || 0}
            </strong>

            <p>
              All invitations created
            </p>

          </div>

          <div className="admin-invitation-stat published">

            <div className="admin-invitation-stat-top">

              <span>
                Published
              </span>

              <div>
                <CheckCircle2 size={17} />
              </div>

            </div>

            <strong>
              {stats.publishedInvitations || 0}
            </strong>

            <p>
              Live invitations
            </p>

          </div>

          <div className="admin-invitation-stat drafts">

            <div className="admin-invitation-stat-top">

              <span>
                Drafts
              </span>

              <div>
                <Clock3 size={17} />
              </div>

            </div>

            <strong>
              {stats.draftInvitations || 0}
            </strong>

            <p>
              Unpublished invitations
            </p>

          </div>

          <div className="admin-invitation-stat categories">

            <div className="admin-invitation-stat-top">

              <span>
                Categories
              </span>

              <div>
                <Sparkles size={17} />
              </div>

            </div>

            <strong>
              {categoryStats.length}
            </strong>

            <p>
              Invitation categories
            </p>

          </div>

        </section>

        {/* CATEGORY OVERVIEW */}

        <section className="admin-category-section">

          <div className="admin-section-title">

            <div>
              <h2>
                Invitation Categories
              </h2>

              <p>
                Distribution of invitations
                by event type.
              </p>
            </div>

          </div>

          <div className="admin-category-grid">

            {categoryStats.length === 0 ? (

              <div className="admin-category-empty">
                No category data available.
              </div>

            ) : (

              categoryStats
                .slice(0, 6)
                .map((item) => {

                  const percentage =
                    getPercentage(
                      item.count
                    );

                  return (
                    <div
                      className="admin-category-card"
                      key={
                        item._id ||
                        "unknown"
                      }
                    >

                      <div className="admin-category-top">

                        <div
                          className={`admin-category-icon ${getCategoryClass(
                            item._id
                          )}`}
                        >
                          {getCategoryIcon(
                            item._id
                          )}
                        </div>

                        <div>
                          <strong>
                            {item.count}
                          </strong>

                          <span>
                            {percentage}%
                          </span>
                        </div>

                      </div>

                      <h3>
                        {item._id ||
                          "Other"}
                      </h3>

                      <div className="admin-category-progress">
                        <span
                          style={{
                            width: `${percentage}%`
                          }}
                        />
                      </div>

                    </div>
                  );
                })

            )}

          </div>

        </section>

        {/* INVITATION TABLE */}

        <section className="admin-invitations-card">

          <div className="admin-invitations-card-header">

            <div>
              <h2>
                All Invitations
              </h2>

              <p>
                {filteredInvitations.length}
                {" "}
                invitations matching
                your filters
              </p>
            </div>

            <div className="admin-invitations-filters">

              <div className="admin-invitations-search">

                <Search size={17} />

                <input
                  type="text"
                  placeholder="Search invitations..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />

              </div>

              <select
  value={categoryFilter}
  onChange={(e) =>
    setCategoryFilter(e.target.value)
  }
>
  <option value="all">
    All Categories
  </option>

  {categories.map((category) => (
    <option
      key={category}
      value={category}
    >
      {category}
    </option>
  ))}
</select>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >
                <option value="all">
                  All Status
                </option>

                <option value="published">
                  Published
                </option>

                <option value="draft">
                  Draft
                </option>
              </select>

            </div>

          </div>

          <div className="admin-invitations-table-scroll">

            <table className="admin-invitations-table">

              <thead>

                <tr>

                  <th>
                    INVITATION
                  </th>

                  <th>
                    OWNER
                  </th>

                  <th>
                    CATEGORY
                  </th>

                  <th>
                    TEMPLATE
                  </th>

                  <th>
                    STATUS
                  </th>

                  <th>
                    CREATED
                  </th>

                  <th>
                    ACTION
                  </th>

                </tr>

              </thead>

              <tbody>

                {paginatedInvitations.length ===
                0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="admin-invitations-empty"
                    >

                      <FileText size={35} />

                      <strong>
                        No invitations found
                      </strong>

                      <span>
                        Try changing your
                        search or filters.
                      </span>

                    </td>

                  </tr>

                ) : (

                  paginatedInvitations.map(
                    (invitation) => (

                      <tr
                        key={
                          invitation._id
                        }
                      >

                        {/* INVITATION */}

                        <td>

                          <div className="admin-invitation-name">

                            <div>
                              {getCategoryIcon(
                                invitation.category
                              )}
                            </div>

                            <section>

                              <strong>
                                {invitation.title ||
                                  "Untitled Invitation"}
                              </strong>

                              <span>
                                ID:{" "}
                                {invitation._id
                                  ?.slice(-8)}
                              </span>

                            </section>

                          </div>

                        </td>

                        {/* OWNER */}

                        <td>

                          <div className="admin-invitation-owner">

                            <div>
                              {invitation.userId
                                ?.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "U"}
                            </div>

                            <section>

                              <strong>
                                {invitation.userId
                                  ?.name ||
                                  "Unknown User"}
                              </strong>

                              <span>
                                {invitation.userId
                                  ?.email ||
                                  "-"}
                              </span>

                            </section>

                          </div>

                        </td>

                        {/* CATEGORY */}

                        <td>

                          <span
                            className={`admin-category-badge ${getCategoryClass(
                              invitation.category
                            )}`}
                          >
                            {getCategoryIcon(
                              invitation.category
                            )}

                            {invitation.category ||
                              "Other"}
                          </span>

                        </td>

                        {/* TEMPLATE */}

                        <td>

                          <span className="admin-template-name">

                            {invitation.templateId
                              ?.title ||
                              invitation.templateId
                                ?.component ||
                              "-"}

                          </span>

                          {invitation.templateId
                            ?.isPremium && (
                            <span className="admin-template-premium">
                              Premium
                            </span>
                          )}

                        </td>

                        {/* STATUS */}

                        <td>

                          {invitation.status ===
                          "published" ? (

                            <span className="admin-invitation-status published">

                              <CheckCircle2
                                size={14}
                              />

                              Published

                            </span>

                          ) : (

                            <span className="admin-invitation-status draft">

                              <Clock3
                                size={14}
                              />

                              Draft

                            </span>

                          )}

                        </td>

                        {/* DATE */}

                        <td>

                          <span className="admin-invitation-date">
                            {formatDate(
                              invitation.createdAt
                            )}
                          </span>

                        </td>

                        {/* ACTION */}

                        <td>

                          <div className="admin-invitation-actions">

                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenu(
                                  openMenu ===
                                  invitation._id
                                    ? null
                                    : invitation._id
                                )
                              }
                              className="admin-invitation-more"
                            >
                              <MoreHorizontal
                                size={18}
                              />
                            </button>

                            {openMenu ===
                              invitation._id && (

                              <div className="admin-invitation-menu">

                                <button
                                  onClick={() =>
                                    handleAction(
                                      "view",
                                      invitation
                                    )
                                  }
                                >
                                  <Eye
                                    size={15}
                                  />

                                  View Details
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

          <div className="admin-invitations-pagination">

            <span>
              Showing{" "}
              {filteredInvitations.length ===
              0
                ? 0
                : (currentPage - 1) *
                    invitationsPerPage +
                  1}
              {" - "}
              {Math.min(
                currentPage *
                  invitationsPerPage,
                filteredInvitations.length
              )}
              {" of "}
              {filteredInvitations.length}
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
                <ChevronLeft
                  size={16}
                />
              </button>

              <span>
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
                <ChevronRight
                  size={16}
                />
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* DETAILS MODAL */}

      {selectedInvitation && (

        <div
          className="admin-invitation-modal-overlay"
          onClick={() =>
            setSelectedInvitation(
              null
            )
          }
        >

          <div
            className="admin-invitation-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="admin-invitation-modal-header">

              <div>

                <span>
                  INVITATION DETAILS
                </span>

                <h2>
                  {selectedInvitation.title ||
                    "Untitled Invitation"}
                </h2>

              </div>

              <button
                onClick={() =>
                  setSelectedInvitation(
                    null
                  )
                }
              >
                <X size={18} />
              </button>

            </div>

            <div className="admin-invitation-modal-body">

              <div className="admin-modal-invitation-icon">
                {getCategoryIcon(
                  selectedInvitation.category
                )}
              </div>

              <h3>
                {selectedInvitation.title ||
                  "Untitled Invitation"}
              </h3>

              <p>
                Created by{" "}
                <strong>
                  {selectedInvitation
                    .userId?.name ||
                    "Unknown User"}
                </strong>
              </p>

              <div className="admin-invitation-details-grid">

                <div>
                  <span>
                    CATEGORY
                  </span>

                  <strong>
                    {selectedInvitation.category ||
                      "Other"}
                  </strong>
                </div>

                <div>
                  <span>
                    STATUS
                  </span>

                  <strong>
                    {selectedInvitation.status ===
                    "published"
                      ? "Published"
                      : "Draft"}
                  </strong>
                </div>

                <div>
                  <span>
                    TEMPLATE
                  </span>

                  <strong>
                    {selectedInvitation
                      .templateId?.title ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    CREATED
                  </span>

                  <strong>
                    {formatDate(
                      selectedInvitation.createdAt
                    )}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default AdminInvitations;