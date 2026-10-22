import { useEffect, useState } from "react";

import {
  Check,
  Crown,
  Sparkles,
  Gift,
  X,
  Save
} from "lucide-react";

import api from "../../api/axios";

import "./AdminPlans.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

function AdminPlans() {
    const [sidebarOpen, setSidebarOpen] =
          useState(false);

  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingPlan, setEditingPlan] =
    useState(null);

  const [featureText, setFeatureText] =
    useState("");

  const [saving, setSaving] =
    useState(false);


  // ==========================================
  // PLAN ICON
  // ==========================================

  const getPlanIcon = (key) => {
    if (key === "premium_plus") {
      return Sparkles;
    }

    if (key === "premium") {
      return Crown;
    }

    return Gift;
  };


  // ==========================================
  // PLAN CLASS
  // ==========================================

  const getPlanClass = (key) => {
    if (key === "premium_plus") {
      return "premium-plus";
    }

    if (key === "premium") {
      return "premium";
    }

    return "free";
  };


  // ==========================================
  // LOAD PLANS
  // ==========================================

  useEffect(() => {
    loadPlans();
  }, []);


  const loadPlans = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/admin/plans");

      setPlans(
        response.data.plans || []
      );

    } catch (error) {
      console.error(
        "Load plans error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to load plans."
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // MANAGE PLAN
  // ==========================================

  const handleManagePlan = (plan) => {
    setEditingPlan({
      ...plan,
      features: [
        ...(plan.features || [])
      ]
    });

    setFeatureText("");
  };


  // ==========================================
  // CHANGE FIELD
  // ==========================================

  const handleChange = (
    field,
    value
  ) => {
    setEditingPlan((prev) => ({
      ...prev,
      [field]: value
    }));
  };


  // ==========================================
  // ADD FEATURE
  // ==========================================

  const addFeature = () => {
    if (!featureText.trim()) {
      return;
    }

    setEditingPlan((prev) => ({
      ...prev,

      features: [
        ...(prev.features || []),
        featureText.trim()
      ]
    }));

    setFeatureText("");
  };


  // ==========================================
  // REMOVE FEATURE
  // ==========================================

  const removeFeature = (index) => {
    setEditingPlan((prev) => ({
      ...prev,

      features:
        prev.features.filter(
          (_, i) => i !== index
        )
    }));
  };


  // ==========================================
  // SAVE PLAN
  // ==========================================

  const savePlan = async () => {
    if (!editingPlan?._id) {
      alert("Plan ID not found.");
      return;
    }

    try {
      setSaving(true);

      const response =
        await api.put(
          `/admin/plans/${editingPlan._id}`,
          {
            name: editingPlan.name,

            price: Number(
              editingPlan.price
            ),

            duration:
              editingPlan.duration,

            invitationLimit:
              editingPlan.invitationLimit,

            description:
              editingPlan.description,

            features:
              editingPlan.features,

            active:
              editingPlan.active
          }
        );

      const updatedPlan =
        response.data.plan;

      setPlans((prev) =>
        prev.map((plan) =>
          plan._id === updatedPlan._id
            ? updatedPlan
            : plan
        )
      );

      setEditingPlan(null);

      alert(
        "Plan updated successfully."
      );

    } catch (error) {
      console.error(
        "Update plan error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update plan."
      );

    } finally {
      setSaving(false);
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-plans-loading">
        Loading plans...
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
    <div className="admin-plans-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="admin-plans-header">

        <div>

          <span className="admin-page-label">
            PLAN MANAGEMENT
          </span>

          <h1>
            Plans
          </h1>

          <p>
            Manage Invito subscription plans,
            pricing and features.
          </p>

        </div>

      </div>


      {/* ======================================
          SUMMARY
      ====================================== */}

      <div className="admin-plans-summary">

        <div className="plan-summary-card">

          <span>
            Total Plans
          </span>

          <strong>
            {plans.length}
          </strong>

        </div>


        <div className="plan-summary-card">

          <span>
            Free Plan
          </span>

          <strong>
            ₹
            {
              plans.find(
                (plan) =>
                  plan.key === "free"
              )?.price ?? 0
            }
          </strong>

        </div>


        <div className="plan-summary-card">

          <span>
            Premium
          </span>

          <strong>
            ₹
            {
              plans.find(
                (plan) =>
                  plan.key === "premium"
              )?.price ?? 0
            }
          </strong>

        </div>


        <div className="plan-summary-card">

          <span>
            Premium Plus
          </span>

          <strong>
            ₹
            {
              plans.find(
                (plan) =>
                  plan.key === "premium_plus"
              )?.price ?? 0
            }
          </strong>

        </div>

      </div>


      {/* ======================================
          PLAN CARDS
      ====================================== */}

      <div className="admin-plans-grid">

        {plans.map((plan) => {

          const Icon =
            getPlanIcon(plan.key);

          const planClass =
            getPlanClass(plan.key);

          return (

            <div
              className={`admin-plan-card ${planClass}`}
              key={plan._id}
            >

              {/* TOP */}

              <div className="admin-plan-card-top">

                <div className="admin-plan-icon">
                  <Icon size={24} />
                </div>

                <span className="admin-plan-status">

                  {plan.active
                    ? "Active"
                    : "Inactive"}

                </span>

              </div>


              {/* TITLE */}

              <div className="admin-plan-title">

                <h2>
                  {plan.name}
                </h2>

                <p>
                  {plan.description}
                </p>

              </div>


              {/* PRICE */}

              <div className="admin-plan-price">

                <strong>
                  ₹{plan.price}
                </strong>

                <span>
                  / {plan.duration}
                </span>

              </div>


              <div className="admin-plan-divider" />


              {/* FEATURES */}

              <div className="admin-plan-features">

                <h4>
                  Plan Features
                </h4>

                {(plan.features || []).map(
                  (feature, index) => (

                    <div
                      className="admin-plan-feature"
                      key={index}
                    >

                      <span>
                        <Check size={15} />
                      </span>

                      <p>
                        {feature}
                      </p>

                    </div>

                  )
                )}

              </div>


              {/* MANAGE */}

              <button
                className="admin-plan-edit"
                type="button"
                onClick={() =>
                  handleManagePlan(plan)
                }
              >
                Manage Plan
              </button>

            </div>

          );
        })}

      </div>


      {/* ======================================
          EDIT MODAL
      ====================================== */}

      {editingPlan && (

        <div
          className="admin-plan-modal-overlay"
          onClick={() =>
            setEditingPlan(null)
          }
        >

          <div
            className="admin-plan-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="admin-plan-modal-header">

              <div>

                <span>
                  PLAN MANAGEMENT
                </span>

                <h2>
                  Edit {editingPlan.name}
                </h2>

              </div>


              <button
                type="button"
                onClick={() =>
                  setEditingPlan(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            {/* FORM */}

            <div className="admin-plan-form">

              {/* BASIC FIELDS */}

              <div className="admin-plan-form-grid">

                {/* NAME */}

                <div className="admin-plan-field">

                  <label>
                    Plan Name
                  </label>

                  <input
                    value={
                      editingPlan.name || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "name",
                        e.target.value
                      )
                    }
                  />

                </div>


                {/* PRICE */}

                <div className="admin-plan-field">

                  <label>
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      editingPlan.price ?? 0
                    }
                    onChange={(e) =>
                      handleChange(
                        "price",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>


                {/* DURATION */}

                <div className="admin-plan-field">

                  <label>
                    Duration
                  </label>

                  <input
                    value={
                      editingPlan.duration || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "duration",
                        e.target.value
                      )
                    }
                  />

                </div>


                {/* INVITATION LIMIT */}

                <div className="admin-plan-field">

                  <label>
                    Invitation Limit
                  </label>

                  <input
                    value={
                      editingPlan.invitationLimit ??
                      ""
                    }
                    onChange={(e) =>
                      handleChange(
                        "invitationLimit",
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="admin-plan-field">

                <label>
                  Description
                </label>

                <textarea
                  value={
                    editingPlan.description || ""
                  }
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }
                />

              </div>


              {/* FEATURES */}

              <div className="admin-plan-feature-editor">

                <label>
                  Features
                </label>


                {(
                  editingPlan.features || []
                ).map(
                  (feature, index) => (

                    <div
                      className="admin-feature-edit-row"
                      key={index}
                    >

                      <input
                        value={feature}
                        onChange={(e) => {

                          const updated =
                            [
                              ...(editingPlan.features ||
                                [])
                            ];

                          updated[index] =
                            e.target.value;

                          setEditingPlan(
                            (prev) => ({
                              ...prev,
                              features:
                                updated
                            })
                          );

                        }}
                      />


                      <button
                        type="button"
                        onClick={() =>
                          removeFeature(index)
                        }
                      >
                        <X size={16} />
                      </button>

                    </div>

                  )
                )}


                {/* ADD FEATURE */}

                <div className="admin-add-feature">

                  <input
                    placeholder="Add new feature..."
                    value={featureText}
                    onChange={(e) =>
                      setFeatureText(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter"
                      ) {
                        e.preventDefault();

                        addFeature();
                      }

                    }}
                  />


                  <button
                    type="button"
                    onClick={addFeature}
                  >
                    Add
                  </button>

                </div>

              </div>


              {/* ACTIVE */}

              <label className="admin-plan-toggle">

                <input
                  type="checkbox"
                  checked={
                    editingPlan.active ?? false
                  }
                  onChange={(e) =>
                    handleChange(
                      "active",
                      e.target.checked
                    )
                  }
                />

                <span>
                  Plan Active
                </span>

              </label>


              {/* ACTIONS */}

              <div className="admin-plan-modal-actions">

                <button
                  type="button"
                  className="admin-plan-cancel"
                  onClick={() =>
                    setEditingPlan(null)
                  }
                  disabled={saving}
                >
                  Cancel
                </button>


                <button
                  type="button"
                  className="admin-plan-save"
                  onClick={savePlan}
                  disabled={saving}
                >

                  <Save size={17} />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
    </>
  );
}

export default AdminPlans;