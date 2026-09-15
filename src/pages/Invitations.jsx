import {
  useEffect,
  useState
} from "react";

import api from "../api/axios";

import {
  FileText,
  Plus,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
  BarChart3,
  Share2,
  X,
  Copy,
  Check,
  MessageCircle
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import TemplateRenderer from "../components/TemplateRenderer";


function Invitations() {

  const navigate = useNavigate();


  // =========================================
  // STATE
  // =========================================

  const [invitations, setInvitations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [shareInvitation, setShareInvitation] =
    useState(null);

  const [copied, setCopied] =
    useState(false);


  // =========================================
  // TEMPLATE PREVIEW
  // =========================================

  const getTemplatePreview =
    (invitation) => (
      <TemplateRenderer
        component={
          invitation.templateId?.component
        }
        category={invitation.category}
        data={invitation.data || {}}
      />
    );


  // =========================================
  // FETCH INVITATIONS
  // =========================================

  useEffect(() => {

    const fetchInvitations =
      async () => {

        try {

          setLoading(true);

          setError("");


          const response =
            await api.get(
  "/invitations"
);


          setInvitations(
            response.data.invitations.filter(
              (invitation) =>
                invitation.status ===
                "published"
            )
          );


        } catch (error) {

          console.error(
            "Failed to fetch invitations:",
            error
          );


          setError(
            "Unable to load invitations."
          );

        } finally {

          setLoading(false);

        }

      };


    fetchInvitations();

  }, []);


  // =========================================
  // DELETE INVITATION
  // =========================================

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this invitation?"
        );


      if (!confirmDelete) {
        return;
      }


      try {

        await api.delete(
  `/invitations/${id}`
);

        setInvitations(
          (previous) =>
            previous.filter(
              (invitation) =>
                invitation._id !== id
            )
        );


      } catch (error) {

        console.error(
          "Delete invitation error:",
          error
        );


        alert(
          "Failed to delete invitation."
        );

      }

    };


  // =========================================
  // OPEN SHARE POPUP
  // =========================================

  const handleShare =
    (invitation) => {

      setShareInvitation(
        invitation
      );

      setCopied(false);

    };


  // =========================================
  // PUBLIC URL
  // =========================================

  const getPublicUrl =
    () => {

      if (!shareInvitation) {
        return "";
      }


      return (
        `${window.location.origin}/invite/${shareInvitation.slug}`
      );

    };


  // =========================================
  // COPY LINK
  // =========================================

  const handleCopyLink =
    async () => {

      const publicUrl =
        getPublicUrl();


      try {

        await navigator.clipboard.writeText(
          publicUrl
        );


        setCopied(true);


        setTimeout(() => {
          setCopied(false);
        }, 2000);


      } catch (error) {

        console.error(
          "Failed to copy link:",
          error
        );


        alert(
          publicUrl
        );

      }

    };


  // =========================================
  // WHATSAPP SHARE
  // =========================================

  const handleWhatsAppShare =
    () => {

      const publicUrl =
        getPublicUrl();


      const message =
        `You're invited! 🎉\n\n${shareInvitation.title}\n\nView the invitation and RSVP here:\n${publicUrl}`;


      const whatsappUrl =
        `https://wa.me/?text=${encodeURIComponent(
          message
        )}`;


      window.open(
        whatsappUrl,
        "_blank"
      );

    };


  // =========================================
  // NATIVE SHARE
  // =========================================

  const handleNativeShare =
    async () => {

      const publicUrl =
        getPublicUrl();


      if (!navigator.share) {

        await handleCopyLink();

        return;

      }


      try {

        await navigator.share({
          title:
            shareInvitation.title,
          text:
            "You're invited! View the invitation and RSVP here:",
          url:
            publicUrl
        });

      } catch (error) {

        if (
          error.name !==
          "AbortError"
        ) {

          console.error(
            "Share failed:",
            error
          );

        }

      }

    };


  // =========================================
  // LOADING
  // =========================================

  if (loading) {

    return (
      <div className="simple-page">

        <p className="simple-page-label">
          INVITATIONS
        </p>

        <h1>
          My Invitations
        </h1>

        <p>
          Loading your invitations...
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
          INVITATIONS
        </p>

        <h1>
          My Invitations
        </h1>

        <p>
          {error}
        </p>

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
            INVITATIONS
          </p>

          <h1>
            My Invitations
          </h1>

          <p className="invitations-subtitle">
            Manage all your created invitations
            in one place.
          </p>

        </div>


        <button
          className="invitations-create-button"
          onClick={() =>
            navigate(
              "/templates"
            )
          }
        >

          <Plus size={18} />

          Create Invitation

        </button>

      </div>


      {/* =====================================
          EMPTY STATE
      ===================================== */}

      {invitations.length === 0 ? (

        <div className="invitations-empty">

          <div className="invitations-empty-icon">

            <FileText size={30} />

          </div>

          <h2>
            No invitations yet
          </h2>

          <p>
            Create your first invitation
            to see it here.
          </p>

          <button
            onClick={() =>
              navigate(
                "/templates"
              )
            }
          >
            Create Invitation
          </button>

        </div>

      ) : (

        <div className="invitations-grid">

          {invitations.map(
            (invitation) => (

              <div
                className="invitation-card"
                key={invitation._id}
              >

                {/* CARD PREVIEW */}

                <div className="invitation-card-preview">

                  <div className="invitation-card-template">

                    {getTemplatePreview(
                      invitation
                    )}

                  </div>

                </div>


                {/* CARD CONTENT */}

                <div className="invitation-card-content">

                  <div>

                    <p className="invitation-card-category">
                      {invitation.category}
                    </p>

                    <h3>
                      {invitation.title}
                    </h3>

                  </div>


                  <span
                    className="invitation-status published"
                  >
                    {invitation.status}
                  </span>


                  <div className="invitation-card-date">

                    <CalendarDays
                      size={15}
                    />

                    {new Date(
                      invitation.createdAt
                    ).toLocaleDateString()}

                  </div>


                  {/* ACTIONS */}

                  <div className="invitation-card-actions">

                    {/* PREVIEW */}

                    <button
                      type="button"
                      title="Preview"
                      onClick={() =>
                        window.open(
                          `/invite/${invitation.slug}`,
                          "_blank"
                        )
                      }
                    >
                      <Eye size={17} />
                    </button>


                    {/* SHARE */}

                    <button
                      type="button"
                      title="Share"
                      onClick={() =>
                        handleShare(
                          invitation
                        )
                      }
                    >
                      <Share2 size={17} />
                    </button>


                    {/* EDIT */}

                    <button
                      type="button"
                      title="Edit"
                      onClick={() =>
                        navigate(
                          `/invitations/create/${invitation.templateId?._id || invitation.templateId}?invitationId=${invitation._id}`
                        )
                      }
                    >
                      <Pencil size={17} />
                    </button>


                    {/* DETAILS */}

                    


                    {/* DELETE */}

                    <button
                      type="button"
                      title="Delete"
                      onClick={() =>
                        handleDelete(
                          invitation._id
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


      {/* =====================================
          SHARE MODAL
      ===================================== */}

      {shareInvitation && (

        <div
          className="share-modal-overlay"
          onClick={() =>
            setShareInvitation(null)
          }
        >

          <div
            className="share-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="share-modal-header">

              <div>

                <p className="share-modal-eyebrow">
                  SHARE INVITATION
                </p>

                <h2>
                  {shareInvitation.title}
                </h2>

              </div>


              <button
                type="button"
                className="share-modal-close"
                onClick={() =>
                  setShareInvitation(null)
                }
              >
                <X size={20} />
              </button>

            </div>


            {/* DESCRIPTION */}

            <p className="share-modal-description">
              Share your invitation with friends
              and family.
            </p>


            {/* LINK */}

            <div className="share-link-box">

              <div className="share-link-icon">
                <Share2 size={18} />
              </div>

              <input
                type="text"
                value={getPublicUrl()}
                readOnly
              />

              <button
                type="button"
                onClick={
                  handleCopyLink
                }
              >

                {copied ? (
                  <>
                    <Check size={16} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy
                  </>
                )}

              </button>

            </div>


            {/* SHARE OPTIONS */}

            <div className="share-options">

              <button
                type="button"
                className="share-option"
                onClick={
                  handleWhatsAppShare
                }
              >

                <div className="share-option-icon">
                  <MessageCircle
                    size={22}
                  />
                </div>

                <span>
                  WhatsApp
                </span>

              </button>


              <button
                type="button"
                className="share-option"
                onClick={
                  handleNativeShare
                }
              >

                <div className="share-option-icon">
                  <Share2 size={22} />
                </div>

                <span>
                  More Options
                </span>

              </button>

            </div>


            {/* CLOSE */}

            <button
              type="button"
              className="share-modal-done"
              onClick={() =>
                setShareInvitation(null)
              }
            >
              Done
            </button>

          </div>

        </div>

      )}

    </div>
  );
}


export default Invitations;