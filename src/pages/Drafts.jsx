import {
  useEffect,
  useState
} from "react";

import {
  FileText,
  Plus,
  CalendarDays,
  Pencil,
  Trash2,
  Globe
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import api from "../api/axios";


function Drafts() {

  const navigate = useNavigate();


  // =========================================
  // STATE
  // =========================================

  const [drafts, setDrafts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================================
  // FETCH DRAFTS
  // =========================================

  useEffect(() => {

    const fetchDrafts = async () => {

      try {

        setLoading(true);

        setError("");


        const response =
          await api.get(
            "/invitations"
          );


        const invitations =
          response.data.invitations || [];


        const draftInvitations =
          invitations.filter(
            (invitation) =>
              invitation.status === "draft"
          );


        setDrafts(
          draftInvitations
        );


      } catch (error) {

        console.error(
          "Failed to fetch drafts:",
          error
        );


        console.error(
          "Server response:",
          error.response?.data
        );


        setError(
          error.response?.data?.message ||
          "Unable to load drafts."
        );


      } finally {

        setLoading(false);

      }

    };


    fetchDrafts();

  }, []);


  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this draft?"
        );


      if (!confirmDelete) {
        return;
      }


      try {

        await api.delete(
          `/invitations/${id}`
        );


        setDrafts(
          (previous) =>
            previous.filter(
              (draft) =>
                draft._id !== id
            )
        );


      } catch (error) {

        console.error(
          "Delete draft error:",
          error
        );


        console.error(
          "Server response:",
          error.response?.data
        );


        alert(
          error.response?.data?.message ||
          "Failed to delete draft."
        );

      }

    };


  // =========================================
  // EDIT DRAFT
  // =========================================

  const handleEdit =
    (draft) => {

      const templateId =
        draft.templateId?._id ||
        draft.templateId;


      navigate(
        `/invitations/create/${templateId}?draftId=${draft._id}`
      );

    };


  // =========================================
  // PUBLISH DRAFT
  // =========================================

  const handlePublish =
    async (id) => {

      const confirmPublish =
        window.confirm(
          "Are you sure you want to publish this invitation?"
        );


      if (!confirmPublish) {
        return;
      }


      try {

        const response =
          await api.put(
            `/invitations/${id}/publish`
          );


        console.log(
          "Published invitation:",
          response.data
        );


        const publicUrl =
          response.data.publicUrl;


        alert(
          `Invitation published successfully!\n\nPublic URL: ${publicUrl}`
        );


        // Remove published invitation
        // from Drafts page

        setDrafts(
          (previous) =>
            previous.filter(
              (draft) =>
                draft._id !== id
            )
        );


      } catch (error) {

        console.error(
          "Publish invitation error:",
          error
        );


        console.error(
          "Server response:",
          error.response?.data
        );


        alert(
          error.response?.data?.message ||
          "Failed to publish invitation."
        );

      }

    };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="simple-page">

        <p className="simple-page-label">
          WORKSPACE
        </p>

        <h1>
          Drafts
        </h1>

        <p>
          Loading your drafts...
        </p>

      </div>
    );

  }


  // =========================================
  // ERROR
  // =========================================

  if (error) {

    return (
      <div className="simple-page">

        <p className="simple-page-label">
          WORKSPACE
        </p>

        <h1>
          Drafts
        </h1>

        <p>
          {error}
        </p>


        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>

      </div>
    );

  }


  // =========================================
  // PAGE
  // =========================================

  return (

    <div className="invitations-page">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="invitations-header">

        <div>

          <p className="invitations-eyebrow">
            WORKSPACE
          </p>

          <h1>
            Drafts
          </h1>

          <p className="invitations-subtitle">
            Continue working on your unfinished
            invitations.
          </p>

        </div>


        <button
          className="invitations-create-button"
          onClick={() =>
            navigate("/templates")
          }
        >

          <Plus size={18} />

          Create Invitation

        </button>

      </div>


      {/* =====================================
          EMPTY STATE
      ===================================== */}

      {drafts.length === 0 ? (

        <div className="invitations-empty">

          <div className="invitations-empty-icon">

            <FileText size={30} />

          </div>


          <h2>
            No drafts yet
          </h2>


          <p>
            Your unfinished invitations
            will appear here.
          </p>


          <button
            onClick={() =>
              navigate("/templates")
            }
          >
            Create Invitation
          </button>

        </div>

      ) : (

        /* ===================================
           DRAFT GRID
        =================================== */

        <div className="invitations-grid">

          {drafts.map(
            (draft) => (

              <div
                className="invitation-card"
                key={draft._id}
              >


                {/* =========================
                    PREVIEW
                ========================= */}

                <div className="invitation-card-preview">

                  <FileText size={38} />

                </div>


                {/* =========================
                    CONTENT
                ========================= */}

                <div className="invitation-card-content">

                  <div>

                    <p className="invitation-card-category">
                      {draft.category}
                    </p>


                    <h3>
                      {draft.title}
                    </h3>

                  </div>


                  <span className="invitation-status draft">
                    Draft
                  </span>


                  {/* DATE */}

                  <div className="invitation-card-date">

                    <CalendarDays
                      size={15}
                    />

                    Last edited{" "}

                    {draft.updatedAt
                      ? new Date(
                          draft.updatedAt
                        ).toLocaleDateString()
                      : "Recently"}

                  </div>


                  {/* =======================
                      ACTIONS
                  ======================= */}

                  <div className="invitation-card-actions">


                    {/* EDIT */}

                    <button
                      type="button"
                      title="Continue Editing"
                      onClick={() =>
                        handleEdit(draft)
                      }
                    >

                      <Pencil size={17} />

                    </button>


                    {/* PUBLISH */}

                    <button
                      type="button"
                      title="Publish Invitation"
                      onClick={() =>
                        handlePublish(
                          draft._id
                        )
                      }
                    >

                      <Globe size={17} />

                    </button>


                    {/* DELETE */}

                    <button
                      type="button"
                      title="Delete"
                      onClick={() =>
                        handleDelete(
                          draft._id
                        )
                      }
                    >

                      <Trash2 size={17} />

                    </button>


                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}


export default Drafts;