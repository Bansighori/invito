import {
  useEffect,
  useState
} from "react";

import {
  ArrowLeft,
  Save,
  Eye,
  CalendarDays,
  LoaderCircle,
  Globe,
  MapPin,
  Image,
  X,
  Lock,
  Plus
} from "lucide-react";

import api from "../api/axios";

import {
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";

import TemplateRenderer from "../components/TemplateRenderer";


function CreateInvitation() {

  const navigate = useNavigate();

  const { templateId } = useParams();

  const photoTemplates = [
  "PhotoWeddingFloral",
  "PhotoWeddingRomantic",
  "PhotoWeddingRoyal"
];



  const [
    searchParams
  ] = useSearchParams();
  const [couplePhoto, setCouplePhoto] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);   

  const draftId =
    searchParams.get("draftId");

  const invitationId =
    searchParams.get("invitationId");


  const [template, setTemplate] =
    useState(null);

  const isPhotoTemplate =
  photoTemplates.includes(template?.component);

  const [formData, setFormData] =
    useState({});

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


 
  const isEditing =
    Boolean(
      draftId ||
      invitationId
    );

const handleCouplePhotoUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert("Photo must be less than 5MB.");
    return;
  }

  try {
    setPhotoUploading(true);

    const uploadData = new FormData();

    uploadData.append("photo", file);

    const response = await api.post(
      "/invitations/upload-template-photo",
      uploadData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    const imageUrl =
  response.data.image.url;

setCouplePhoto(imageUrl);

setFormData((previousData) => ({
  ...previousData,
  couplePhoto: imageUrl
}));  

  } catch (error) {
    console.error(
      "Photo upload error:",
      error
    );

    if (
      error.response?.data?.code ===
      "PREMIUM_PLUS_REQUIRED"
    ) {
      navigate("/pricing");
      return;
    }

    alert(
      error.response?.data?.message ||
      "Photo upload failed."
    );

  } finally {
    setPhotoUploading(false);
  }
};

const handleDeleteCouplePhoto = async () => {
  if (!couplePhoto) return;

  const confirmDelete = window.confirm(
    "Are you sure you want to remove this couple photo?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(
      "/invitations/template-photo",
      {
        data: {
          imageUrl: couplePhoto
        }
      }
    );

    setCouplePhoto("");

  } catch (error) {
    console.error(
      "Photo delete error:",
      error
    );

    alert(
      error.response?.data?.message ||
        "Failed to delete photo."
    );
  }
};

  const saveDraft = async () => {

    try {

      const invitationData = {

        title:
          template?.title ||
          "Untitled Invitation",

        templateId:
          template?._id,

        category:
          template?.category,

        data:
  formData,
couplePhoto: couplePhoto,
status:
  invitationId
    ? "published"
    : "draft"

      };


      let response;


      if (invitationId) {

        response =
          await api.put(
            `/invitations/${invitationId}`,
            invitationData
          );


        console.log(
          "Published invitation updated:",
          response.data
        );


        alert(
          "Invitation updated successfully!"
        );


        navigate(
          "/invitations"
        );


        return;

      }


      if (draftId) {

        response =
          await api.put(
            `/invitations/${draftId}`,
            invitationData
          );


        console.log(
          "Draft updated:",
          response.data
        );


        alert(
          "Draft updated successfully!"
        );


        return;

      }


      response =
        await api.post(
          "/invitations",
          invitationData
        );


      console.log(
        "Draft saved:",
        response.data
      );


      alert(
        "Invitation saved as draft!"
      );


    } catch (error) {

      console.error(
        "Save invitation error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to save invitation."
      );

    }

  };


  const publishInvitation = async () => {

    try {

      let currentInvitationId =
        draftId ||
        invitationId;


      if (!currentInvitationId) {

        const invitationData = {

          title:
            template?.title ||
            "Untitled Invitation",

          templateId:
            template?._id,

          category:
  template?.category,

data: {
  ...formData,
  couplePhoto: couplePhoto
},

status:
  "draft"

        };


        const createResponse =
          await api.post(
            "/invitations",
            invitationData
          );


        currentInvitationId =
          createResponse.data.invitation._id;


        console.log(
          "Invitation created before publishing:",
          createResponse.data
        );

      }


      else {

        await api.put(
          `/invitations/${currentInvitationId}`,
          {

            title:
              template?.title ||
              "Untitled Invitation",

            templateId:
              template?._id,

            category:
              template?.category,

            data:
              formData,

            status:
              invitationId
                ? "published"
                : "draft"

          }
        );

      }

      const publishResponse =
        await api.put(
          `/invitations/${currentInvitationId}/publish`
        );


      console.log(
        "Invitation published:",
        publishResponse.data
      );


      const publicUrl =
        publishResponse.data.publicUrl;


      alert(
        `Invitation published successfully!\n\nPublic URL:\n${publicUrl}`
      );


      navigate(
        "/invitations"
      );


    } catch (error) {

      console.error(
        "Publish invitation error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to publish invitation."
      );

    }

  };


  const getTemplateComponent = () => {
    if (!template) {
      return null;
    }

    return (
      <TemplateRenderer
        component={template.component}
        category={template.category}
        data={formData}
        onRSVP={() => {}}
      />
    );
  };

  useEffect(() => {

    if (!templateId) {

      setLoading(false);

      return;

    }


    const fetchData = async () => {

      try {

        setLoading(true);

        setError("");

        const templateResponse =
          await api.get(
            `/templates/${templateId}`
          );


        const selectedTemplate =
          templateResponse.data.template;


        setTemplate(
          selectedTemplate
        );

        const userResponse =
  await api.get("/auth/me");

setUser(
  userResponse.data.user
);
        const initialData = {};


        selectedTemplate.fields.forEach(
          (field) => {

            initialData[field.name] =
              "";

          }
        );

        initialData.venue = "";

        // PREMIUM PLUS PHOTO GALLERY
        initialData.gallery = [];

        const existingId =
          invitationId ||
          draftId;


        if (existingId) {

          const invitationResponse =
            await api.get(
              `/invitations/${existingId}`
            );


          const savedInvitation =
            invitationResponse.data.invitation;


          const savedTemplateId =
            savedInvitation.templateId?._id ||
            savedInvitation.templateId;


          if (
            savedTemplateId !==
            selectedTemplate._id
          ) {

            console.warn(
              "Invitation template does not match selected template."
            );

          }

          const savedData =
  savedInvitation.data || {};

setFormData({
  ...initialData,
  ...savedData
});

setCouplePhoto(
  savedData.couplePhoto || ""
);

        } else {

          setFormData(
            initialData
          );

        }


      } catch (error) {

        console.error(
          "Failed to load invitation:",
          error
        );


        setError(
          error.response?.data?.message ||
          "Unable to load the selected invitation."
        );


      } finally {

        setLoading(false);

      }

    };


    fetchData();

  }, [
    templateId,
    draftId,
    invitationId
  ]);

  const handleChange =
    (event) => {

      const {
        name,
        value
      } = event.target;


      setFormData(
        (previousData) => ({

          ...previousData,

          [name]:
            value

        })
      );

    };

  /* =========================
     PREMIUM PLUS GALLERY
  ========================= */

  const now = new Date();

  const isPremiumPlus =
    user?.plan === "premium_plus" &&
    user?.planExpiresAt &&
    new Date(user.planExpiresAt) > now;
const [uploadingGallery, setUploadingGallery] =
  useState(false);

const [galleryUploadError, setGalleryUploadError] =
  useState("");



  // ==========================================
// PHOTO GALLERY
// ==========================================

const handleGalleryUpload = async (event) => {
  const files = Array.from(
    event.target.files || []
  );

  if (files.length === 0) {
    return;
  }

  if (files.length > 10) {
    setGalleryUploadError(
      "You can upload a maximum of 10 photos."
    );

    event.target.value = "";
    return;
  }

  const invalidFile = files.find(
    (file) => {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
      ];

      return (
        !validTypes.includes(
          file.type
        ) ||
        file.size > 5 * 1024 * 1024
      );
    }
  );

  if (invalidFile) {
    setGalleryUploadError(
      "Only JPG, PNG or WEBP images up to 5MB are allowed."
    );

    event.target.value = "";
    return;
  }

  try {

    setUploadingGallery(true);

    setGalleryUploadError("");


    const uploadData =
      new FormData();

    files.forEach(
      (file) => {
        uploadData.append(
          "gallery",
          file
        );
      }
    );


    const response =
      await api.post(
        "/invitations/upload-gallery",
        uploadData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );


    const uploadedImages =
      response.data.images || [];


    setFormData(
      (previousData) => ({
        ...previousData,

        gallery: [
          ...(Array.isArray(
            previousData.gallery
          )
            ? previousData.gallery
            : []),

          ...uploadedImages
        ]
      })
    );


  } catch (error) {

    console.error(
      "Gallery upload error:",
      error
    );


    setGalleryUploadError(
      error.response?.data?.message ||
      "Failed to upload photos."
    );


  } finally {

    setUploadingGallery(false);

    event.target.value = "";

  }
};


// ==========================================
// REMOVE GALLERY IMAGE
// ==========================================

const removeGalleryImage = async (
  index
) => {

  const gallery =
    Array.isArray(formData.gallery)
      ? formData.gallery
      : [];


  const image =
    gallery[index];


  if (!image) {
    return;
  }


  const publicId =
    typeof image === "string"
      ? null
      : image?.publicId;


  console.log(
    "REMOVING IMAGE:",
    image
  );


  try {

    if (publicId) {

      await api.delete(
        "/invitations/gallery-image",
        {
          data: {
            publicId
          }
        }
      );

    }


    setFormData(
      (previousData) => ({

        ...previousData,

        gallery:
          previousData.gallery.filter(
            (_, imageIndex) =>
              imageIndex !== index
          )

      })
    );


  } catch (error) {

    console.error(
      "Remove gallery image error:",
      error
    );


    setGalleryUploadError(
      error.response?.data?.message ||
      "Failed to delete gallery image."
    );

  }

};

  if (loading) {

    return (
      <div className="editor-loading">

        <LoaderCircle
          size={30}
          className="editor-spinner"
        />

        <p>
          Loading invitation editor...
        </p>

      </div>
    );

  }


  if (error) {

    return (
      <div className="editor-error">

        <h2>
          Invitation not found
        </h2>

        <p>
          {error}
        </p>


        <button
          onClick={() =>
            navigate("/templates")
          }
        >
          Back to Templates
        </button>

      </div>
    );

  }


  if (!templateId) {

    return (
      <div className="create-empty-page">

        <p className="simple-page-label">
          CREATE INVITATION
        </p>

        <h1>
          Create your invitation
        </h1>

        <p>
          Choose a ready-made template
          to start designing.
        </p>


        <button
          onClick={() =>
            navigate("/templates")
          }
        >
          Browse Templates
        </button>

      </div>
    );

  }

  return (

    <div className="invitation-editor">

      <div className="editor-header">

        <div className="editor-header-left">

          <button
            className="editor-back-button"
            onClick={() =>
              navigate(
                invitationId
                  ? "/invitations"
                  : draftId
                    ? "/drafts"
                    : "/templates"
              )
            }
          >

            <ArrowLeft
              size={18}
            />

          </button>


          <div>

            <p className="editor-eyebrow">

              {invitationId
                ? "EDIT INVITATION"
                : draftId
                  ? "EDIT DRAFT"
                  : "INVITATION EDITOR"}

            </p>


            <h1>
              {template.title}
            </h1>

          </div>

        </div>


        <div className="editor-header-actions">


          <button
            className="editor-preview-button"
            type="button"
          >

            <Eye
              size={17}
            />

            Preview

          </button>

          <button
            className="editor-save-button"
            type="button"
            onClick={saveDraft}
          >

            <Save
              size={17}
            />

            {invitationId
              ? "Save Changes"
              : "Save Draft"}

          </button>

          <button
            className="editor-publish-button"
            type="button"
            onClick={publishInvitation}
          >

            <Globe
              size={17}
            />

            Publish

          </button>

        </div>

      </div>


      <div className="editor-content">

        <div className="editor-form-panel">

          <div className="editor-section-heading">

            <div>

              <p>
                EVENT DETAILS
              </p>

              <h2>
                Personalize your invitation
              </h2>

            </div>

          </div>

          <div className="editor-template-info">

            <div className="editor-template-mini">

              <div className="template-mini-placeholder">

                {template.category
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

            </div>


            <div>

              <span>
                Selected template
              </span>

              <strong>
                {template.title}
              </strong>

              <small>
                {template.category}
              </small>

            </div>

          </div>
          <div className="dynamic-form">

            {template.fields.map(
              (field) => (

                <div
                  className="form-field"
                  key={field.name}
                >

                  <label
                    htmlFor={field.name}
                  >

                    {field.label}

                    {field.required && (
                      <span>
                        *
                      </span>
                    )}

                  </label>


                  {field.type === "date" ? (

                    <div className="input-with-icon">

                      <CalendarDays
                        size={18}
                      />


                      <input
                        id={field.name}
                        name={field.name}
                        type="date"
                        value={
                          formData[
                            field.name
                          ] || ""
                        }
                        onChange={
                          handleChange
                        }
                        required={
                          field.required
                        }
                      />

                    </div>

                  ) : (

                    <input
                      id={field.name}
                      name={field.name}
                      type={
                        field.type || "text"
                      }
                      placeholder={
                        `Enter ${field.label.toLowerCase()}`
                      }
                      value={
                        formData[
                          field.name
                        ] || ""
                      }
                      onChange={
                        handleChange
                      }
                      required={
                        field.required
                      }
                    />

                  )}

                </div>

              )
            )}

          </div>


          <div className="form-field">

            <label htmlFor="venue">

              <MapPin
                size={16}
              />

              Venue / Location

            </label>


            <div className="input-with-icon">

              <MapPin
                size={18}
              />


              <input
                id="venue"
                name="venue"
                type="text"
                placeholder="Enter your venue or location"
                value={
                  formData.venue || ""
                }
                onChange={
                  handleChange
                }
              />

            </div>


            <small>
              Enter any venue name, address, or location you want.
            </small>

          </div>


          <div className="form-field">

            <label htmlFor="message">
              Invitation Message
            </label>

            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write a special message for your guests..."
              value={
                formData.message || ""
              }
              onChange={
                handleChange
              }
            />

          </div>
          {isPhotoTemplate && (
  <div className="couple-photo-section">

    <h3>Couple Photo</h3>

    <p>
      Upload your main couple photo.
      <br />
      Premium Plus only • JPG, PNG, WEBP • Max 5MB
    </p>

    <input
      type="file"
      accept="image/jpeg,image/png,image/webp"
      onChange={handleCouplePhotoUpload}
      disabled={photoUploading}
    />

    {photoUploading && (
      <p className="uploading-text">
        Uploading photo...
      </p>
    )}

    {couplePhoto && (
  <div
    style={{
      marginTop: "15px",
      width: "230px"
    }}
  >
    <img
      src={couplePhoto}
      alt="Couple"
      style={{
        width: "230px",
        height: "180px",
        objectFit: "cover",
        display: "block",
        borderRadius: "10px",
        border: "1px solid #ddd"
      }}
    />

    <div
      style={{
        display: "flex",
        gap: "8px",
        marginTop: "12px"
      }}
    >
      <label
        style={{
          display: "inline-block",
          padding: "8px 12px",
          background: "#111",
          color: "#fff",
          borderRadius: "7px",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Replace Photo

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleCouplePhotoUpload}
          disabled={photoUploading}
          style={{ display: "none" }}
        />
      </label>

      <button
        type="button"
        onClick={handleDeleteCouplePhoto}
        style={{
          padding: "8px 12px",
          background: "#fff",
          color: "#c0392b",
          border: "1px solid #c0392b",
          borderRadius: "7px",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer"
        }}
      >
        Delete Photo
      </button>
    </div>
  </div>
)}

  </div>
)}


{/* =========================================
    PREMIUM PLUS PHOTO GALLERY
========================================= */}

<div className="premium-gallery-section">

  <div className="premium-gallery-header">

    <div>

      <p className="premium-gallery-eyebrow">
        PREMIUM PLUS
      </p>

      <h3>
        Photo Gallery
      </h3>

      <span>
        Add beautiful photos to your invitation.
      </span>

    </div>

  </div>


  {isPremiumPlus ? (

    <>

      {/* =================================
          UPLOADED IMAGE PREVIEW
      ================================= */}

      <div className="premium-gallery-preview">

        {(formData.gallery || []).length > 0 ? (

          <div className="premium-gallery-grid">

            {formData.gallery.map(
              (image, index) => {

                const imageUrl =
                  typeof image === "string"
                    ? image
                    : image?.url;


                if (!imageUrl) {
                  return null;
                }


                return (

                  <div
                    className="premium-gallery-preview-item"
                    key={
                      image?.publicId ||
                      `${imageUrl}-${index}`
                    }
                  >

                    <img
                      src={imageUrl}
                      alt={`Gallery ${index + 1}`}
                    />


                    {/* IMAGE NUMBER */}

                    <div className="premium-gallery-image-number">
                      {index + 1}
                    </div>


                    {/* REMOVE IMAGE */}

                    <button
                      type="button"
                      className="premium-gallery-remove"
                      onClick={() =>
                        removeGalleryImage(index)
                      }
                      title="Remove photo"
                    >
                      <X size={15} />
                    </button>

                  </div>

                );

              }
            )}

          </div>

        ) : (

          <div className="premium-gallery-empty">

            <Image size={24} />

            <span>
              Your uploaded photos will appear here.
            </span>

          </div>

        )}

      </div>


      {/* =================================
          FILE INPUT
      ================================= */}

      <input
        type="file"
        id="gallery-upload"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        multiple
        onChange={handleGalleryUpload}
        disabled={uploadingGallery}
        style={{
          display: "none"
        }}
      />


      {/* =================================
          UPLOAD BUTTON
      ================================= */}

      <label
        htmlFor="gallery-upload"
        className="premium-gallery-add"
      >

        <Plus size={17} />

        {uploadingGallery
          ? "Uploading..."
          : "Upload Photos"}

      </label>


      {/* =================================
          ERROR
      ================================= */}

      {galleryUploadError && (

        <p
          className="premium-gallery-error"
          style={{
            marginTop: "10px",
            color: "#dc2626",
            fontSize: "13px"
          }}
        >
          {galleryUploadError}
        </p>

      )}


      {/* =================================
          NOTE
      ================================= */}

      <small className="premium-gallery-note">
        JPG, PNG or WEBP · Maximum 10 photos · Maximum 5MB each
      </small>

    </>

  ) : (

    <div className="premium-gallery-locked">

      <div className="premium-gallery-lock">
        <Lock size={18} />
      </div>

      <div>

        <strong>
          Premium Plus feature
        </strong>

        <p>
          Upgrade to Premium Plus to add a
          photo gallery to your invitation.
        </p>
        <button
  type="button"
  className="gallery-upgrade-btn"
  onClick={() =>
    navigate("/pricing")
  }
>
  ✨ Upgrade to Premium Plus
</button>

      </div>

    </div>

  )}

</div>


          <div className="editor-form-note">

            <strong>
              Your invitation
            </strong>

            <p>
              Changes are shown in the
              preview automatically.
            </p>

          </div>

        </div>


        <div className="editor-preview-panel">

          <div className="preview-panel-header">

            <div>

              <p>
                LIVE PREVIEW
              </p>

              <h2>
                Your invitation
              </h2>

            </div>

            <span>
              {template.category}
            </span>

          </div>


          <div className="invitation-preview-wrapper">

            <div className="invitation-preview">

              {getTemplateComponent()}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}


export default CreateInvitation;