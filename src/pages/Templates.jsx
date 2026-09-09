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

import axios from "axios";

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

  const [category, setCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================
     FETCH TEMPLATES
  ========================= */

  useEffect(() => {

    const fetchTemplates = async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await axios.get(
            "http://localhost:5000/api/templates"
          );

        setTemplates(
          response.data.templates
        );

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

    fetchTemplates();

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
     USE TEMPLATE
  ========================= */

  const handleUseTemplate =
    (template) => {

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