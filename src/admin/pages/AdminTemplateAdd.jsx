import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save
} from "lucide-react";

import api from "../../api/axios";
import "./AdminTemplateAdd.css";
import AdminTemplateDesigner
  from "./AdminTemplateDesigner";

const CATEGORY_FIELDS = {
  Wedding: [
    ["brideName", "Bride Name", "text"],
    ["groomName", "Groom Name", "text"],
    ["eventDate", "Event Date", "date"],
    ["eventTime", "Event Time", "time"],
    ["venue", "Venue", "text"],
    ["address", "Address", "textarea"],
    ["message", "Message", "textarea"]
  ],

  Birthday: [
    ["personName", "Birthday Person", "text"],
    ["age", "Age", "number"],
    ["eventDate", "Event Date", "date"],
    ["eventTime", "Event Time", "time"],
    ["venue", "Venue", "text"],
    ["address", "Address", "textarea"],
    ["message", "Message", "textarea"]
  ],

  Engagement: [
    ["brideName", "Bride Name", "text"],
    ["groomName", "Groom Name", "text"],
    ["eventDate", "Engagement Date", "date"],
    ["eventTime", "Event Time", "time"],
    ["venue", "Venue", "text"],
    ["address", "Address", "textarea"],
    ["message", "Message", "textarea"]
  ],

  "Baby Shower": [
    ["parentName", "Parent Name", "text"],
    ["eventDate", "Event Date", "date"],
    ["eventTime", "Event Time", "time"],
    ["venue", "Venue", "text"],
    ["address", "Address", "textarea"],
    ["message", "Message", "textarea"]
  ],

  Party: [
    ["eventName", "Event Name", "text"],
    ["eventDate", "Event Date", "date"],
    ["eventTime", "Event Time", "time"],
    ["venue", "Venue", "text"],
    ["address", "Address", "textarea"],
    ["message", "Message", "textarea"]
  ],

  Other: [
    ["eventName", "Event Name", "text"],
    ["eventDate", "Event Date", "date"],
    ["eventTime", "Event Time", "time"],
    ["venue", "Venue", "text"],
    ["address", "Address", "textarea"],
    ["message", "Message", "textarea"]
  ]
};

const DEFAULT_DESIGN = {
  background: {
    type: "solid",
    color: "#ffffff",
    color1: "#ffffff",
    color2: "#f8e8ef",
    direction: "135deg",
    image: ""
  },

  typography: {
    titleFont: "Playfair Display",
    bodyFont: "Poppins",
    titleSize: 32,
    bodySize: 16,
    titleColor: "#8b4a62",
    bodyColor: "#555555",
    titleAlignment: "center",
    bodyAlignment: "center"
  },

  border: {
    enabled: true,
    style: "solid",
    color: "#c89b3c",
    width: 2,
    radius: 20
  },

  layout: {
    width: 420,
    height: 650,
    padding: 30,
    alignment: "center"
  },

  decoration: {
    type: "none",
    enabled: false
  },

  button: {
    enabled: true,
    text: "RSVP",
    backgroundColor: "#8b4a62",
    textColor: "#ffffff",
    radius: 10
  },

  image: {
    enabled: false,
    url: "",
    width: 180,
    height: 180,
    radius: 50,
    position: "top"
  }
};

function AdminTemplateAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Wedding",
    type: "Modern",
    component: "",
    plan: "free",
    status: "published",
    featured: false,
    displayOrder: 1
  });

  const [fields, setFields] = useState(
    CATEGORY_FIELDS.Wedding.map(
      ([name, label, type]) => ({
        name,
        label,
        type,
        required: false
      })
    )
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [design, setDesign] =
  useState(DEFAULT_DESIGN);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;

    setForm((prev) => ({
      ...prev,
      category
    }));

    setFields(
      (CATEGORY_FIELDS[category] || []).map(
        ([name, label, type]) => ({
          name,
          label,
          type,
          required: false
        })
      )
    );
  };

  const handleFieldChange = (
    index,
    property,
    value
  ) => {
    setFields((prev) =>
      prev.map((field, i) =>
        i === index
          ? {
              ...field,
              [property]: value
            }
          : field
      )
    );
  };

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        name: "",
        label: "",
        type: "text",
        required: false
      }
    ]);
  };

  const removeField = (index) => {
    setFields((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Template name is required.");
      return;
    }


    const validFields = fields.filter(
      (field) =>
        field.name.trim() &&
        field.label.trim()
    );

    try {
      setSaving(true);

      await api.post("/admin/templates", {
  ...form,

  component: "DynamicTemplate",

  displayOrder: Number(
    form.displayOrder
  ),

  featured:
    form.featured === true ||
    form.featured === "true",

  fields: validFields,

  design
});

      navigate("/admin/templates");
    } catch (error) {
      console.error(
        "Create template error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to create template."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-template-add-page">

      <div className="admin-template-add-header">
        <button
          className="admin-template-back"
          onClick={() =>
            navigate("/admin/templates")
          }
        >
          <ArrowLeft size={18} />
          Back to Templates
        </button>

        <div>
          <h1>Add Template</h1>
          <p>
            Create a new invitation template
            for your users.
          </p>
        </div>
      </div>

      {error && (
        <div className="admin-template-error">
          {error}
        </div>
      )}

      <form
        className="admin-template-form"
        onSubmit={handleSubmit}
      >

        {/* BASIC INFORMATION */}

        <section className="template-form-card">
          <div className="form-section-title">
            <div>
              <h2>Basic Information</h2>
              <p>
                Add the main information about
                this template.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group full">
  <label>Template Name *</label>

  <input
    type="text"
    name="name"
    value={form.name}
    onChange={handleChange}
    placeholder="Enter template name"
  />
</div>

            

            <div className="form-group full">
              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe this template..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleCategoryChange}
              >
                <option value="Wedding">
                  Wedding
                </option>

                <option value="Birthday">
                  Birthday
                </option>

                <option value="Engagement">
                  Engagement
                </option>

                <option value="Baby Shower">
                  Baby Shower
                </option>

                <option value="Party">
                  Party
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Template Type</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option value="Modern">
                  Modern
                </option>

                <option value="Classic">
                  Classic
                </option>

                <option value="Elegant">
                  Elegant
                </option>

                <option value="Minimal">
                  Minimal
                </option>

                <option value="Luxury">
                  Luxury
                </option>

                <option value="Floral">
                  Floral
                </option>

                <option value="Photo">
                  Photo
                </option>
              </select>
            </div>

            

          </div>
        </section>

        {/* PLAN */}

        <section className="template-form-card">

          <div className="form-section-title">
            <div>
              <h2>Plan & Access</h2>
              <p>
                Decide which users can use this
                template.
              </p>
            </div>
          </div>

          <div className="plan-options">

            <label
              className={`plan-option ${
                form.plan === "free"
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="plan"
                value="free"
                checked={
                  form.plan === "free"
                }
                onChange={handleChange}
              />

              <div>
                <strong>Free</strong>
                <span>
                  Available to all users
                </span>
              </div>
            </label>

            <label
              className={`plan-option ${
                form.plan === "premium"
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="plan"
                value="premium"
                checked={
                  form.plan === "premium"
                }
                onChange={handleChange}
              />

              <div>
                <strong>Premium</strong>
                <span>
                  Available to Premium users
                </span>
              </div>
            </label>

            <label
              className={`plan-option ${
                form.plan === "premium_plus"
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="plan"
                value="premium_plus"
                checked={
                  form.plan ===
                  "premium_plus"
                }
                onChange={handleChange}
              />

              <div>
                <strong>Premium Plus</strong>
                <span>
                  Available to Premium Plus
                  users
                </span>
              </div>
            </label>

          </div>
        </section>

        {/* DISPLAY SETTINGS */}

        <section className="template-form-card">

          <div className="form-section-title">
            <div>
              <h2>Display Settings</h2>
              <p>
                Control how this template appears
                to users.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>
                Display Order
              </label>

              <input
                type="number"
                name="displayOrder"
                min="1"
                value={form.displayOrder}
                onChange={handleChange}
              />

              <small>
                1 = first position
              </small>
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="published">
                  Published
                </option>

                <option value="draft">
                  Draft
                </option>
              </select>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      featured:
                        e.target.checked
                    }))
                  }
                />

                <span>
                  Featured Template
                </span>
              </label>
            </div>

          </div>
        </section>

        {/* TEMPLATE FIELDS */}

        

        <AdminTemplateDesigner
  design={design}
  setDesign={setDesign}
  fields={fields}
/>

        {/* ACTIONS */}

        <div className="template-form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() =>
              navigate("/admin/templates")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-template-button"
            disabled={saving}
          >
            <Save size={18} />

            {saving
              ? "Creating..."
              : "Create Template"}
          </button>

        </div>

      </form>
    </div>
  );
}

export default AdminTemplateAdd;