import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Search,
  SlidersHorizontal,
  Plus,
  ArrowLeft,
} from "lucide-react";

import api from "../api/axios";

import {
  useNavigate
} from "react-router-dom";

import TemplateCard from "../components/TemplateCard";
import SupportChatButton from "../components/SupportChatButton";

function Templates() {

  const navigate = useNavigate();

  /* =========================
     STATE
  ========================= */

  const [templates, setTemplates] =
    useState([]);

  const [user, setUser] =
    useState(null);

  const [checkingPlan, setCheckingPlan] = useState(true);

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
    "PhotoWeddingRoyal",
    "BirthdayPhotoPremiumPlus"
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

        const templatesResponse = await api.get("/templates");

console.log(
  "TEMPLATES FROM API:",
  templatesResponse.data.templates
);

const loadUser = async () => {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Unable to load user:", error);
    } finally {
      setCheckingPlan(false);
    }
  };

  loadUser();

const handleCreateInvitation = async (template) => {
  try {
    const response = await api.get("/auth/me");
    const user = response.data.user;

    const isPaidPlan =
      user.plan === "premium" ||
      user.plan === "premium_plus";

    const isExpired =
      !user.planExpiresAt ||
      new Date(user.planExpiresAt) <= new Date();

    if (isPaidPlan && isExpired) {
      navigate("/pricing");
      return;
    }

    if (
      user.plan === "free" &&
      user.freeInvitationsUsed >= 3
    ) {
      navigate("/pricing");
      return;
    }

    navigate(`/invitations/create/${template._id}`);
  } catch (error) {
    console.error("Unable to check plan:", error);
    alert("Unable to verify your plan. Please try again.");
  }
};

const fetchedTemplates =
  templatesResponse.data.templates || [];

fetchedTemplates.sort(
  (a, b) =>
    Number(a.displayOrder ?? 9999) -
    Number(b.displayOrder ?? 9999)
);

console.log(
  "TEMPLATES AFTER SORT:",
  fetchedTemplates.map((t) => ({
    title: t.title,
    displayOrder: t.displayOrder
  }))
);

setTemplates(fetchedTemplates);


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



const handleUseTemplate = (template) => {
  if (!user) {
    navigate("/login");
    return;
  }

  const isPaid =
    user.plan === "premium" ||
    user.plan === "premium_plus";

  const isExpired =
    !user.planExpiresAt ||
    new Date(user.planExpiresAt) <= new Date();

  // Block expired subscriptions.
  if (isPaid && isExpired) {
    navigate("/pricing");
    return;
  }

  // Free users can create only 3 invitations.
  if (
    user.plan === "free" &&
    user.freeInvitationsUsed >= 3
  ) {
    navigate("/pricing");
    return;
  }

  // Premium Plus templates are exclusive.
  if (
    template.isPremiumPlus &&
    user.plan !== "premium_plus"
  ) {
    navigate("/pricing");
    return;
  }

  // Photo templates are also Premium Plus only.
  const isPhoto =
    photoTemplates.includes(template.component) ||
    template.isPhotoTemplate;

  if (isPhoto && user.plan !== "premium_plus") {
    navigate("/pricing");
    return;
  }

  // Regular Premium templates.
  if (
    template.isPremium &&
    user.plan !== "premium" &&
    user.plan !== "premium_plus"
  ) {
    navigate("/pricing");
    return;
  }

  navigate(`/invitations/create/${template._id}`);
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
    <>
    <style>
      {`

      /* Main template page */
.templates-page {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 22px 26px;
  box-sizing: border-box;
}

/* Page heading */
.templates-header {
  margin-bottom: 24px;
}

/* Search and category section */
.template-toolbar {
  margin-bottom: 20px;
}

/* Category buttons */
.template-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

/* Template cards grid */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 22px;
  width: 100%;
  margin-top: 0;
  align-items: start;
}

/* Individual card */
.template-card {
  min-width: 0;
  width: 100%;
}

/* Responsive layout */
@media (max-width: 1200px) {
  .templates-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .templates-page {
    padding: 16px;
  }

  .templates-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .templates-grid {
    grid-template-columns: 1fr;
  }
}


      .templates-back-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  border: none;
  outline: none;
  background: transparent;
  color: #6554ff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.templates-back-button:hover {
  color: #4b3de0;
}

.templates-back-button svg {
  width: 18px;
  height: 18px;
}`}
    </style>

    <div className="templates-page">
      <SupportChatButton />


      {/* =========================
          HEADER
      ========================= */}

      <div className="templates-header">

        <div>
          <button
  className="templates-back-button"
  onClick={() => navigate("/home")}
>
  <ArrowLeft size={18} />
  Back
</button>

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
    isPhotoTemplate={isPhotoTemplate}
    isPremiumPlus={isPremiumPlus}
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
    </>

  );

}


export default Templates;