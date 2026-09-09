import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

import TemplateCard from "../components/TemplateCard";

import {
  Heart
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";


function Favorites() {

  const navigate = useNavigate();

  const [templates, setTemplates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  /*
    Get favourite template IDs
    from localStorage
  */
  const getFavoriteIds = () => {

    const savedFavorites =
      localStorage.getItem(
        "invitoFavorites"
      );

    return savedFavorites
      ? JSON.parse(savedFavorites)
      : [];

  };


  /*
    Load favourite templates
    from MongoDB
  */
  const loadFavorites = async () => {

    try {

      setLoading(true);

      const favoriteIds =
        getFavoriteIds();


      /*
        If there are no favourites,
        don't need to request MongoDB.
      */
      if (favoriteIds.length === 0) {

        setTemplates([]);

        return;

      }


      const response =
        await api.get(
          "/templates"
        );


      const allTemplates =
        response.data.templates || [];


      /*
        Keep only templates whose
        MongoDB ID exists in favourites.
      */
      const favoriteTemplates =
        allTemplates.filter(
          (template) =>
            favoriteIds.includes(
              template._id
            )
        );


      setTemplates(
        favoriteTemplates
      );

    } catch (error) {

      console.error(
        "Failed to load favourites:",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  /*
    Load favourites when page opens
  */
  useEffect(() => {

    loadFavorites();


    /*
      Listen for changes made by
      the Heart button.
    */
    const handleFavoritesUpdated =
      () => {

        loadFavorites();

      };


    window.addEventListener(
      "favoritesUpdated",
      handleFavoritesUpdated
    );


    /*
      Cleanup listener when page
      is removed.
    */
    return () => {

      window.removeEventListener(
        "favoritesUpdated",
        handleFavoritesUpdated
      );

    };

  }, []);


  /*
    Use Template
  */
  const handleUseTemplate =
    (template) => {

      navigate(
        `/invitations/create/${template._id}`
      );

    };


  /*
    Loading
  */
  if (loading) {

    return (
      <div className="simple-page">

        <p className="simple-page-label">
          SAVED
        </p>

        <h1>Favorites</h1>

        <p>
          Loading your favorite templates...
        </p>

      </div>
    );

  }


  return (
    <div className="favorites-page">

      {/* Header */}

      <div className="favorites-header">

        <div>

          <p className="simple-page-label">
            SAVED
          </p>

          <h1>
            Favorites
          </h1>

          

        </div>


        {/* Count */}

        

      </div>


      {/* Empty State */}

      {templates.length === 0 && (

        <div className="favorites-empty">

          <div className="favorites-empty-icon">

            <Heart size={30} />

          </div>

          <h2>
            No favorite templates yet
          </h2>

          <p>
            Click the heart icon on any
            template to save it here.
          </p>


          <button
            type="button"
            onClick={() =>
              navigate("/templates")
            }
          >
            Browse Templates
          </button>

        </div>

      )}


      {/* Favourite Templates */}

      {templates.length > 0 && (

        <div className="templates-grid">

          {templates.map(
            (template) => (

              <TemplateCard
                key={template._id}
                template={template}
                onUse={handleUseTemplate}
              />

            )
          )}

        </div>

      )}

    </div>
  );

}


export default Favorites;