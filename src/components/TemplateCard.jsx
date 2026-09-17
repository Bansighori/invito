import {
  useEffect,
  useState
} from "react";

import TemplateRenderer from "./TemplateRenderer";
import getTemplateSampleData from "../utils/templateSampleData";

import {
  Heart,
  Crown,
  ArrowUpRight,
  Lock
} from "lucide-react";


function TemplateCard({
  template,
  onUse,
  isLocked = false,
  isPhotoTemplate = false,
  isPremiumPlus = false
}) {

  const [isFavorite, setIsFavorite] =
    useState(false);


  /* =========================
     FAVORITE
  ========================= */

  useEffect(() => {

    const savedFavorites =
      localStorage.getItem(
        "invitoFavorites"
      );

    const favorites =
      savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

    setIsFavorite(
      favorites.includes(template._id)
    );

  }, [template._id]);


  const handleFavorite = (event) => {

    event.preventDefault();
    event.stopPropagation();

    const savedFavorites =
      localStorage.getItem(
        "invitoFavorites"
      );

    const favorites =
      savedFavorites
        ? JSON.parse(savedFavorites)
        : [];

    let updatedFavorites;

    if (
      favorites.includes(template._id)
    ) {

      updatedFavorites =
        favorites.filter(
          (id) =>
            id !== template._id
        );

      setIsFavorite(false);

    } else {

      updatedFavorites = [
        ...favorites,
        template._id
      ];

      setIsFavorite(true);
    }

    localStorage.setItem(
      "invitoFavorites",
      JSON.stringify(
        updatedFavorites
      )
    );

    window.dispatchEvent(
      new Event("favoritesUpdated")
    );

  };


  /* =========================
     PREVIEW CLASS
  ========================= */

  const getPreviewClass = () => {

    if (
      isPhotoTemplate ||
      template.component ===
        "PhotoWeddingFloral" ||
      template.component ===
        "PhotoWeddingRomantic" ||
      template.component ===
        "PhotoWeddingRoyal"
    ) {
      return "template-mini-photo";
    }

    if (template.category === "Wedding") {
      return "template-mini-wedding";
    }

    if (template.category === "Birthday") {
      return "template-mini-birthday";
    }

    if (template.category === "Engagement") {
      return "template-mini-engagement";
    }

    if (template.category === "Baby Shower") {
      return "template-mini-baby";
    }

    if (template.category === "Party") {
      return "template-mini-party";
    }

    return "template-mini-default";
  };


  return (

    <div
      className={`template-card ${
        isLocked
          ? "template-card-locked"
          : ""
      } ${
        isPhotoTemplate
          ? "photo-template-card"
          : ""
      }`}
    >

      {/* =========================
          PREVIEW
      ========================= */}

      <div
        className={`template-preview template-preview-live ${getPreviewClass()}`}
      >

        <div className="template-preview-scaler">

          <TemplateRenderer
            component={template.component}
            data={getTemplateSampleData(template)}
          />

        </div>


        {/* =========================
            OVERLAY
        ========================= */}

        <div className="template-overlay">


          {/* FAVORITE */}

          <button
            type="button"
            className={`template-favorite ${
              isFavorite
                ? "active"
                : ""
            }`}
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >

            <Heart
              size={17}
              fill={
                isFavorite
                  ? "currentColor"
                  : "none"
              }
            />

          </button>


          {/* =========================
              PREMIUM PLUS BADGE
          ========================= */}

          {isPhotoTemplate ? (

            <div className="photo-premium-badge">

              <Crown size={13} />

              Premium Plus

            </div>

          ) : template.isPremium ? (

            <div className="premium-badge">

              <Crown size={13} />

              Premium

            </div>

          ) : null}

        </div>


        {/* =========================
            PHOTO TEMPLATE LABEL
        ========================= */}

        {isPhotoTemplate && (

          <div className="photo-template-label">

            📸 Add Your Couple Photo

          </div>

        )}


        {/* =========================
            LOCK OVERLAY
        ========================= */}

        {isLocked && (

          <div className="template-lock-overlay">

            <div className="template-lock-content">

              <div className="template-lock-icon">

                <Lock size={22} />

              </div>

              <strong>

                {isPhotoTemplate
                  ? "Premium Plus Template"
                  : "Premium Template"}

              </strong>

              <span>

                {isPhotoTemplate
                  ? "Upgrade to Premium Plus"
                  : "Upgrade to unlock"}

              </span>

            </div>

          </div>

        )}


        {/* =========================
            USE BUTTON
        ========================= */}

        <button
          type="button"
          className={`template-use-overlay ${
            isLocked
              ? "template-use-locked"
              : ""
          }`}
          onClick={(event) => {

            event.preventDefault();
            event.stopPropagation();

            onUse(template);

          }}
        >

          {isLocked ? (

            <>

              <Lock size={15} />

              {isPhotoTemplate
                ? "Upgrade to Premium Plus"
                : "Unlock Template"}

            </>

          ) : (

            <>

              Use Template

              <ArrowUpRight
                size={16}
              />

            </>

          )}

        </button>

      </div>


      {/* =========================
          CARD INFORMATION
      ========================= */}

      <div className="template-card-info">

        <div>

          <p className="template-category">

            {template.category}

          </p>

          <h3>

            {template.title}

          </h3>

        </div>


        <span className="template-type">

          {template.type}

        </span>

      </div>

    </div>

  );

}


export default TemplateCard;