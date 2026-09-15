import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Search,
  SlidersHorizontal,
  Plus
} from "lucide-react";

import api from "../api/axios";

import {
  useNavigate
} from "react-router-dom";

import TemplateCard from "../components/TemplateCard";
import UpgradePremium from "../components/UpgradePremium";
import UpgradePremiumPlus from "../components/UpgradePremiumPlus";


function Templates() {

  const navigate = useNavigate();


  /* =========================
     STATE
  ========================= */

  const [templates, setTemplates] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const [category, setCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================
     FETCH TEMPLATES + USER
  ========================= */

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);
        setError("");


        // ========================================
        // GET TEMPLATES
        // ========================================

        const templatesResponse =
          await api.get("/templates");

        setTemplates(
          templatesResponse.data.templates || []
        );


        // ========================================
        // GET CURRENT USER
        // ========================================

        try {

          const userResponse =
            await api.get("/auth/me");

          setUser(
            userResponse.data.user
          );

        } catch (userError) {

          console.error(
            "Failed to fetch current user:",
            userError
          );

          // Don't stop templates from displaying
          setUser(null);
        }

      } catch (error) {

        console.error(
          "Failed to fetch templates:",
          error
        );

        setError(
          "Unable to load templates. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, []);


  /* =========================
     CATEGORIES
  ========================= */

  const categories = [
    "All",
    "Wedding",
    "Birthday",
    "Engagement",
    "Baby Shower",
    "Party",
    "Other"
  ];


  /* =========================
     FILTER
  ========================= */

  const filteredTemplates =
    useMemo(() => {

      return templates.filter(
        (template) => {

          const matchesCategory =
            category === "All" ||
            template.category === category;


          const matchesSearch =
            (template.title || "")
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );


          return (
            matchesCategory &&
            matchesSearch
          );

        }
      );

    }, [
      templates,
      category,
      search
    ]);


  /* =========================
     CHECK ACTIVE PLAN
  ========================= */

  const now = new Date();

  const isPlanActive =
    user?.plan !== "free" &&
    user?.planExpiresAt &&
    new Date(user.planExpiresAt) > now;


  const isPremium =
    isPlanActive &&
    user?.plan === "premium";


  const isPremiumPlus =
    isPlanActive &&
    user?.plan === "premium_plus";


  const hasPaidPlan =
    isPremium ||
    isPremiumPlus;


  /* =========================
     USE TEMPLATE
  ========================= */

  const handleUseTemplate =
    (template) => {


      // ========================================
      // PAID USER
      // ========================================

      if (hasPaidPlan) {

        navigate(
          `/invitations/create/${template._id}`
        );

        return;
      }


      // ========================================
      // FREE USER - 3 INVITATIONS USED
      // ========================================

      if (
        user?.plan === "free" &&
        user?.freeInvitationsUsed >= 3
      ) {

        alert(
          "You have used all 3 free invitations. Please upgrade to Premium to continue."
        );

        return;
      }


      // ========================================
      // FREE USER - STILL HAS FREE USES
      // ========================================

      navigate(
        `/invitations/create/${template._id}`
      );

    };


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="templates-page">

        <div className="templates-header">

          <div>

            <p className="templates-eyebrow">
              DESIGN LIBRARY
            </p>

            <h1>
              Choose your template
            </h1>

            <p className="templates-subtitle">
              Start with a beautiful design
              and make it yours.
            </p>

          </div>

        </div>


        <div className="templates-loading">

          <div className="loading-spinner"></div>

          <p>
            Loading templates...
          </p>

        </div>

      </div>

    );

  }


  /* =========================
     ERROR
  ========================= */

  if (error) {

    return (

      <div className="templates-page">

        <div className="templates-header">

          <div>

            <p className="templates-eyebrow">
              DESIGN LIBRARY
            </p>

            <h1>
              Choose your template
            </h1>

            <p className="templates-subtitle">
              Start with a beautiful design
              and make it yours.
            </p>

          </div>

        </div>


        <div className="templates-error">

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>

        </div>

      </div>

    );

  }


  /* =========================
     MAIN PAGE
  ========================= */

  return (

    <div className="templates-page">


      {/* =========================
          PREMIUM SECTION
      ========================= */}

      {/* =========================
          PRICING SECTION
      ========================= */}

      <section className="pricing-section">

        <div className="pricing-heading">

          <p className="pricing-eyebrow">
            SIMPLE PRICING
          </p>

          <h2>
            Choose the perfect plan
          </h2>

          <p>
            Create beautiful invitations with the
            features you need.
          </p>

        </div>


        <div className="pricing-grid">


          {/* =========================
              FREE PLAN
          ========================= */}

          <div className="pricing-card">

            <div className="pricing-card-top">

              <span className="pricing-plan-name">
                Free
              </span>

              <span className="pricing-badge">
                STARTER
              </span>

            </div>


            <div className="pricing-price">

              <span className="currency">
                ₹
              </span>

              <span className="amount">
                0
              </span>

              <span className="period">
                /month
              </span>

            </div>


            <p className="pricing-description">
              Everything you need to create
              beautiful invitations.
            </p>


            <div className="pricing-divider"></div>


            <ul className="pricing-features">

              <li>
                <span>✓</span>
                3 invitations
              </li>

              <li>
                <span>✓</span>
                Free templates
              </li>

              <li>
                <span>✓</span>
                RSVP management
              </li>

              <li>
                <span>✓</span>
                Public invitation URL
              </li>

              <li>
                <span>✓</span>
                Basic sharing
              </li>

            </ul>


            <button
              className={
                user?.plan === "free" ||
                !hasPaidPlan
                  ? "pricing-button current"
                  : "pricing-button"
              }
              disabled
            >
              Current Plan
            </button>

          </div>


          {/* =========================
              PREMIUM PLAN
          ========================= */}

          <div className="pricing-card">

            <div className="pricing-card-top">

              <span className="pricing-plan-name">
                Premium
              </span>

              <span className="pricing-badge premium">
                PRO
              </span>

            </div>


            <div className="pricing-price">

              <span className="currency">
                ₹
              </span>

              <span className="amount">
                199
              </span>

              <span className="period">
                /30 days
              </span>

            </div>


            <p className="pricing-description">
              Unlimited invitations with powerful
              premium features.
            </p>


            <div className="pricing-divider"></div>


            <ul className="pricing-features">

              <li>
                <span>✓</span>
                Unlimited invitations
              </li>

              <li>
                <span>✓</span>
                All premium templates
              </li>

              <li>
                <span>✓</span>
                Advanced RSVP
              </li>

              <li>
                <span>✓</span>
                Invitation analytics
              </li>

              <li>
                <span>✓</span>
                WhatsApp sharing
              </li>

              <li>
                <span>✓</span>
                Google Maps location
              </li>

              <li>
                <span>✓</span>
                Custom invitation URL
              </li>

            </ul>


            {isPremium ? (
  <button
    className="pricing-button plus-button"
    disabled
  >
    ✓ Current Plan
  </button>
) : (
  <UpgradePremium />
)}
          </div>


          {/* =========================
              PREMIUM PLUS PLAN
          ========================= */}

          <div className="pricing-card plus">

            <div className="pricing-card-top">

              <span className="pricing-plan-name">
                Premium Plus
              </span>

              <span className="pricing-badge plus-badge">
                PLUS
              </span>

            </div>


            <div className="pricing-price">

              <span className="currency">
                ₹
              </span>

              <span className="amount">
                299
              </span>

              <span className="period">
                /30 days
              </span>

            </div>


            <p className="pricing-description">
              The ultimate invitation experience
              with advanced creative features.
            </p>


            <div className="pricing-divider"></div>


            <ul className="pricing-features">

              <li>
                <span>✓</span>
                Everything in Premium
              </li>

              <li>
                <span>✓</span>
                Photo gallery
              </li>

              <li>
                <span>✓</span>
                Background music
              </li>

              <li>
                <span>✓</span>
                Advanced analytics
              </li>

              <li>
                <span>✓</span>
                Advanced RSVP
              </li>

              <li>
                <span>✓</span>
                Custom invitation URL
              </li>

              <li>
                <span>✓</span>
                WhatsApp sharing
              </li>

            </ul>


            {isPremiumPlus ? (
  <button
    className="pricing-button plus-button"
    disabled
  >
    ✓ Current Plan
  </button>
) : (
  <UpgradePremiumPlus />
)}

          </div>


        </div>

      </section>


      {/* =========================
          HEADER
      ========================= */}

      <div className="templates-header">

        <div>

          <p className="templates-eyebrow">
            DESIGN LIBRARY
          </p>

          <h1>
            Choose your template
          </h1>

          <p className="templates-subtitle">
            Start with a beautiful design
            and make it yours.
          </p>

        </div>


        <button
          className="template-create-button"
          onClick={() =>
            navigate(
              "/invitations/create"
            )
          }
        >

          <Plus size={18} />

          Create from scratch

        </button>

      </div>


      {/* =========================
          ACTIVE PLAN INFORMATION
      ========================= */}

      {hasPaidPlan &&
        user?.planExpiresAt && (

        <div className="active-plan-info">

          <strong>
            ✓{" "}
            {user.plan === "premium_plus"
              ? "Premium Plus"
              : "Premium"}{" "}
            is active
          </strong>

          <span>
            Active until{" "}
            {new Date(
              user.planExpiresAt
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </span>

        </div>

      )}


      {/* =========================
          SEARCH
      ========================= */}

      <div className="template-toolbar">

        <div className="template-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search templates..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>


        <button
          className="filter-button"
        >

          <SlidersHorizontal
            size={17}
          />

          Filters

        </button>

      </div>


      {/* =========================
          CATEGORY
      ========================= */}

      <div className="category-tabs">

        {categories.map(
          (item) => (

            <button
              key={item}
              className={
                category === item
                  ? "category-tab active"
                  : "category-tab"
              }
              onClick={() =>
                setCategory(item)
              }
            >

              {item}

            </button>

          )
        )}

      </div>


      {/* =========================
          RESULT
      ========================= */}

      <div className="templates-result-header">

        <div>

          <strong>
            {filteredTemplates.length}
          </strong>

          <span>
            {" "}templates
          </span>

        </div>


        <select
          className="sort-select"
        >

          <option>
            Recommended
          </option>

          <option>
            Newest
          </option>

          <option>
            Popular
          </option>

        </select>

      </div>


      {/* =========================
          GRID
      ========================= */}

      {filteredTemplates.length > 0 ? (

        <div className="templates-grid">

          {filteredTemplates.map(
            (template) => (

              <TemplateCard
                key={template._id}
                template={template}
                onUse={
                  handleUseTemplate
                }
              />

            )
          )}

        </div>

      ) : (

        <div className="no-templates">

          <h2>
            No templates found
          </h2>

          <p>
            Try another search or
            category.
          </p>

        </div>

      )}

    </div>

  );

}


export default Templates;