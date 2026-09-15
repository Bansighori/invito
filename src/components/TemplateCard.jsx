import {
  useEffect,
  useState
} from "react";

import TemplateRenderer from "./TemplateRenderer";
import getTemplateSampleData from "../utils/templateSampleData";

import {
  Heart,
  Crown,
  ArrowUpRight
} from "lucide-react";


function TemplateCard({
  template,
  onUse
}) {

  const [isFavorite, setIsFavorite] =
    useState(false);

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


  const getPreviewClass = () => {
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
    <div className="template-card">

      <div
        className={`template-preview template-preview-live ${getPreviewClass()}`}
      >

        <div className="template-preview-scaler">
          <TemplateRenderer
            component={template.component}
            data={getTemplateSampleData(template)}
          />
        </div>


        <div className="template-overlay">

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


          {template.isPremium && (

            <div className="premium-badge">

              <Crown size={13} />

              Premium

            </div>

          )}

        </div>



        <button
          type="button"
          className="template-use-overlay"
          onClick={(event) => {

            event.preventDefault();
            event.stopPropagation();

            onUse(template);

          }}
        >

          Use Template

          <ArrowUpRight size={16} />

        </button>

      </div>


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