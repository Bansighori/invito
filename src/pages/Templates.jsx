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
     PHOTO TEMPLATES
     PREMIUM PLUS ONLY
  ========================= */

  const photoTemplates = [
    "PhotoWeddingFloral",
    "PhotoWeddingRomantic",
    "PhotoWeddingRoyal"
  ];


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

      // Check whether this is
      // one of the 3 photo templates
      const isPhotoTemplate =
        photoTemplates.includes(
          template.component
        );


      // ========================================
      // PHOTO TEMPLATE
      // PREMIUM PLUS ONLY
      // ========================================

      if (
        isPhotoTemplate &&
        !isPremiumPlus
      ) {

        navigate("/pricing");

        return;

      }


      // ========================================
      // NORMAL PREMIUM TEMPLATE
      // ========================================

      if (
        template.isPremium &&
        !hasPaidPlan
      ) {

        navigate("/pricing");

        return;

      }


      // ========================================
      // FREE INVITATION LIMIT
      // ========================================

      if (
        !hasPaidPlan &&
        user?.freeInvitationsUsed >= 3
      ) {

        alert(
          "You have used all 3 free invitations. Please upgrade to Premium to continue."
        );

        navigate("/pricing");

        return;

      }


      // ========================================
      // OPEN TEMPLATE
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
            (template) => {

              const isPhotoTemplate =
                photoTemplates.includes(
                  template.component
                );


              const isLocked =
                (
                  template.isPremium &&
                  !hasPaidPlan
                ) ||
                (
                  isPhotoTemplate &&
                  !isPremiumPlus
                );


              return (

                <TemplateCard
                  key={template._id}
                  template={template}
                  onUse={handleUseTemplate}
                  isLocked={isLocked}
                  isPhotoTemplate={
                    isPhotoTemplate
                  }
                  isPremiumPlus={
                    isPremiumPlus
                  }
                />

              );

            }
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