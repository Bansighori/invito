import { useEffect, useState } from "react";

import {
  FileText,
  Plus,
  CalendarDays,
  Pencil,
  Trash2,
  Globe,
  ArrowLeft
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import TemplateRenderer from "../components/TemplateRenderer";
import SupportChatButton from "../components/SupportChatButton";
import api from "../api/axios";

function Drafts() {
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH DRAFTS
  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/invitations");
        const invitations = response.data.invitations || [];

        const draftInvitations = invitations.filter(
          (invitation) => invitation.status === "draft"
        );

        setDrafts(draftInvitations);
      } catch (error) {
        console.error("Failed to fetch drafts:", error);

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

  // DELETE DRAFT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this draft?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/invitations/${id}`);

      setDrafts((previous) =>
        previous.filter((draft) => draft._id !== id)
      );
    } catch (error) {
      console.error("Delete draft error:", error);

      window.alert(
        error.response?.data?.message ||
          "Failed to delete draft."
      );
    }
  };

  // EDIT DRAFT
  const handleEdit = (draft) => {
    const templateId =
      draft.templateId?._id || draft.templateId;

    if (!templateId) {
      window.alert(
        "Template information is missing for this draft."
      );
      return;
    }

    navigate(
      `/invitations/create/${templateId}?draftId=${draft._id}`
    );
  };

  // PUBLISH DRAFT
  const handlePublish = async (id) => {
    const confirmPublish = window.confirm(
      "Are you sure you want to publish this invitation?"
    );

    if (!confirmPublish) return;

    try {
      const response = await api.post(
        `/invitations/${id}/publish`
      );

      const publicUrl = response.data.publicUrl;

      window.alert(
        publicUrl
          ? `Invitation published successfully!\n\nPublic URL: ${publicUrl}`
          : "Invitation published successfully!"
      );

      setDrafts((previous) =>
        previous.filter((draft) => draft._id !== id)
      );
    } catch (error) {
      console.error("Publish invitation error:", error);

      window.alert(
        error.response?.data?.message ||
          "Failed to publish invitation."
      );
    }
  };

  // PAGE
  return (
    <>
      {/* BACK BUTTON CSS - SAME FILE */}
      <style>{`
        .drafts-back-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 8px 0;
          margin-bottom: 14px;
          border: none;
          outline: none;
          background: transparent;
          color: #6554ff;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .drafts-back-button:hover {
          color: #4938df;
        }

        .drafts-back-button:focus-visible {
          outline: 2px solid #6554ff;
          outline-offset: 4px;
          border-radius: 4px;
        }

        .drafts-back-button svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
      `}</style>

      <div className="invitations-page">
        {/* HEADER */}
        <div className="invitations-header">
          <SupportChatButton />

          <div>
            <button
              type="button"
              className="drafts-back-button"
              onClick={() => navigate("/templates")}
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>

            <p className="invitations-eyebrow">
              WORKSPACE
            </p>

            <h1>Drafts</h1>

            <p className="invitations-subtitle">
              Continue working on your unfinished invitations.
            </p>
          </div>

          <button
            className="invitations-create-button"
            type="button"
            onClick={() => navigate("/templates")}
          >
            <Plus size={18} />
            Create Invitation
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="invitations-empty">
            <p>Loading your drafts...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="invitations-empty">
            <h2>Unable to load drafts</h2>
            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && drafts.length === 0 && (
          <div className="invitations-empty">
            <div className="invitations-empty-icon">
              <FileText size={30} />
            </div>

            <h2>No drafts yet</h2>

            <p>
              Your unfinished invitations will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/templates")}
            >
              Create Invitation
            </button>
          </div>
        )}

        {/* DRAFT GRID */}
        {!loading && !error && drafts.length > 0 && (
          <div className="invitations-grid">
            {drafts.map((draft) => (
              <div
                className="invitation-card"
                key={draft._id}
              >
                {/* PREVIEW */}
                <div className="invitation-card-preview">
                  <div className="invitation-card-template">
                    <TemplateRenderer
                      component={draft.templateId?.component}
                      category={draft.category}
                      data={draft.data || {}}
                    />
                  </div>
                </div>

                {/* CONTENT */}
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

                  {/* LAST EDITED */}
                  <div className="invitation-card-date">
                    <CalendarDays size={15} />

                    Last edited{" "}

                    {draft.updatedAt
                      ? new Date(
                          draft.updatedAt
                        ).toLocaleDateString()
                      : "Recently"}
                  </div>

                  {/* ACTIONS */}
                  <div className="invitation-card-actions">
                    <button
                      type="button"
                      title="Continue Editing"
                      onClick={() => handleEdit(draft)}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      title="Publish Invitation"
                      onClick={() =>
                        handlePublish(draft._id)
                      }
                    >
                      <Globe size={17} />
                    </button>

                    <button
                      type="button"
                      title="Delete"
                      onClick={() =>
                        handleDelete(draft._id)
                      }
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Drafts;