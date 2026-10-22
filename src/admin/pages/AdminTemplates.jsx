import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LayoutTemplate,
  Crown,
  Sparkles,
  Eye,
  Pencil,
  Trash2,
  Plus,
  CheckCircle2,
  FileText
} from "lucide-react";

import api from "../../api/axios";
import "./AdminTemplates.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import TemplateRenderer from "../../components/TemplateRenderer";

function AdminTemplates() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [templates, setTemplates] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    free: 0,
    premium: 0,
    premiumPlus: 0,
    published: 0,
    draft: 0
  });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const categories = [
    "Wedding",
    "Birthday",
    "Engagement",
    "Baby Shower",
    "Party",
    "Other"
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/templates");

      setTemplates(response.data.templates || []);

      setStats(
        response.data.stats || {
          total: 0,
          free: 0,
          premium: 0,
          premiumPlus: 0,
          published: 0,
          draft: 0
        }
      );
    } catch (error) {
      console.error("Admin templates error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to load templates"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const searchText = `
        ${template.name || ""}
        ${template.component || ""}
        ${template.category || ""}
      `.toLowerCase();

      const matchesSearch =
        searchText.includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        template.category === categoryFilter;

      const templatePlan = template.isPremiumPlus
  ? "premium_plus"
  : template.isPremium
  ? "premium"
  : "free";

      const matchesPlan =
        planFilter === "all" ||
        templatePlan === planFilter;

      const templateStatus =
        template.status || "published";

      const matchesStatus =
        statusFilter === "all" ||
        templateStatus === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPlan &&
        matchesStatus
      );
    });
  }, [
    templates,
    search,
    categoryFilter,
    planFilter,
    statusFilter
  ]);

  const getPlan = (template) => {
    if (template.isPremiumPlus) {
      return "Premium Plus";
    }

    if (template.isPremium) {
      return "Premium";
    }

    return "Free";
  };

  const getPlanIcon = (template) => {
    if (template.isPremiumPlus) {
      return <Sparkles size={14} />;
    }

    if (template.isPremium) {
      return <Crown size={14} />;
    }

    return <LayoutTemplate size={14} />;
  };

  if (loading) {
    return (
      <div className="admin-templates-loading">
        Loading templates...
      </div>
    );
  }

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this template?"
  );

  if (!confirmed) return;

  try {
    await api.delete(`/admin/templates/${id}`);

    setTemplates((prev) =>
      prev.filter((template) => template._id !== id)
    );

    alert("Template deleted successfully.");
  } catch (error) {
    console.error("Delete template error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete template."
    );
  }
};

  return (
    <>
    <AdminSidebar
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />
    
          <AdminNavbar />
    <div className="admin-templates-page">

      {/* Header */}

      <div className="admin-templates-header">

        <div>
          <p className="admin-templates-label">
            TEMPLATE MANAGEMENT
          </p>

          <h1>Templates</h1>

          <p>
            Manage invitation templates,
            categories and pricing access.
          </p>
        </div>

        <button className="admin-add-template-btn"
  onClick={() =>
    navigate("/admin/templates/add")
  }
>
  <Plus size={18} />
  Add Template
</button>


      </div>

      {/* Error */}

      {error && (
        <div className="admin-templates-error">
          {error}
        </div>
      )}

      {/* Statistics */}

      <div className="admin-template-stats">

        <div className="template-stat-card total">
          <div className="template-stat-icon">
            <LayoutTemplate size={20} />
          </div>

          <div>
            <span>Total Templates</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className="template-stat-card free">
          <div className="template-stat-icon">
            <FileText size={20} />
          </div>

          <div>
            <span>Free</span>
            <strong>{stats.free}</strong>
          </div>
        </div>

        <div className="template-stat-card premium">
          <div className="template-stat-icon">
            <Crown size={20} />
          </div>

          <div>
            <span>Premium</span>
            <strong>{stats.premium}</strong>
          </div>
        </div>

        <div className="template-stat-card premium-plus">
          <div className="template-stat-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <span>Premium Plus</span>
            <strong>{stats.premiumPlus}</strong>
          </div>
        </div>

        <div className="template-stat-card published">
          <div className="template-stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Published</span>
            <strong>{stats.published}</strong>
          </div>
        </div>

        <div className="template-stat-card draft">
          <div className="template-stat-icon">
            <FileText size={20} />
          </div>

          <div>
            <span>Draft</span>
            <strong>{stats.draft}</strong>
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="admin-template-filters">

        <div className="admin-template-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
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
          value={planFilter}
          onChange={(e) =>
            setPlanFilter(e.target.value)
          }
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
            setStatusFilter(e.target.value)
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

      {/* Template Table */}

      <div className="admin-template-table-card">

        <div className="admin-template-table-header">
          <div>
            <h2>All Templates</h2>

            <span>
              {filteredTemplates.length} templates
            </span>
          </div>
        </div>

        <div className="admin-template-table-wrapper">

          <table className="admin-template-table">

            <thead>
              <tr>
                <th>Template</th>
                <th>Category</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Usage</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredTemplates.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="admin-template-empty"
                  >
                    No templates found.
                  </td>
                </tr>

              ) : (

                filteredTemplates.map((template) => (

                  <tr key={template._id}>

                    {/* Template */}

                    <td>

                      <div className="admin-template-info">

                        <div className="admin-template-preview">

                          {template.previewImage ? (
                            <img
                              src={template.previewImage}
                              alt={template.name}
                            />
                          ) : (
                            <LayoutTemplate
                              size={24}
                            />
                          )}

                        </div>

                        <div>
                          <strong>
                            {template.name}
                          </strong>

                          <span>
                            {template.title}
                          </span>
                        </div>

                      </div>

                    </td>

                    {/* Category */}

                    <td>
                      <span className="template-category">
                        {template.category || "Other"}
                      </span>
                    </td>

                    {/* Plan */}

                    <td>

                      <span
                        className={`template-plan ${getPlan(template)
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {getPlanIcon(template)}
                        {getPlan(template)}
                      </span>

                    </td>

                    {/* Status */}

                    <td>

                      <span
                        className={`template-status ${
                          template.status === "draft"
                            ? "draft"
                            : "published"
                        }`}
                      >
                        {template.status === "draft"
                          ? "Draft"
                          : "Published"}
                      </span>

                    </td>

                    {/* Usage */}

                    <td>
                      <strong>
                        {template.usageCount || 0}
                      </strong>
                    </td>

                    {/* Actions */}

                    <td>

                      <div className="admin-template-actions">

                        <button
  type="button"
  title="Preview"
  className="preview"
  onClick={() => setSelectedTemplate(template)}
>
  <Eye size={16} />
</button>

                        <button
  type="button"
  title="Edit"
  className="edit"
  onClick={() =>
    navigate(`/admin/templates/edit/${template._id}`)
  }
>
  <Pencil size={16} />
</button>

                        <button
  className="admin-template-action delete"
  onClick={() => handleDelete(template._id)}
>
  <Trash2 size={16} />
</button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
{selectedTemplate && (
  <div
    className="admin-template-modal-overlay"
    onClick={() => setSelectedTemplate(null)}
  >
    <div
      className="admin-template-modal"
      onClick={(e) => e.stopPropagation()}
    >

      <div className="admin-template-modal-header">
        <div>
          <span>Template Preview</span>

          <h2>
            {selectedTemplate.name}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setSelectedTemplate(null)}
        >
          ×
        </button>
      </div>

      <div className="admin-template-modal-body">

        <div className="admin-template-modal-preview">

  <div className="admin-template-square">

    <div className="admin-template-live-preview">

      <TemplateRenderer
  component={selectedTemplate.component}
  category={selectedTemplate.category}
  data={{
    hostName: "William",
    guestName: "Sophia",
    date: "20/12/2026",
    time: "7:00 PM",
    venue: "Beautiful Celebration Venue",
    address: "Surat, Gujarat",
    message:
      "Together with their families, they request the pleasure of your company.",
    couplePhoto: ""
  }}
  design={selectedTemplate.design || {}}
  onRSVP={() => {}}
  enableOpeningAnimation={false}
/>

    </div>

  </div>

</div>

        <div className="admin-template-modal-details">

          <div>
            <span>Template</span>
            <strong>
              {selectedTemplate.title}
            </strong>
          </div>

          <div>
            <span>Category</span>
            <strong>
              {selectedTemplate.category || "Other"}
            </strong>
          </div>

          <div>
            <span>Plan</span>
            <strong>
              {getPlan(selectedTemplate)}
            </strong>
          </div>

          <div>
            <span>Usage</span>
            <strong>
              {selectedTemplate.usageCount || 0}
              {" "}invitations
            </strong>
          </div>

        </div>

      </div>

    </div>
  </div>
)}
    </div>
    </>
  );
}

export default AdminTemplates;