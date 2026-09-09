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
  MapPin
} from "lucide-react";

import api from "../api/axios";

import {
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom";

import WeddingClassic from "../templates/WeddingClassic";
import BirthdayModern from "../templates/BirthdayModern";
import EngagementForever from "../templates/EngagementForever";

import RoyalWedding from "../templates/RoyalWedding";
import GardenWedding from "../templates/GardenWedding";
import MinimalWedding from "../templates/MinimalWedding";

import BirthdayPop from "../templates/BirthdayPop";
import BirthdayElegant from "../templates/BirthdayElegant";

import BabyBloom from "../templates/BabyBloom";
import LittleStar from "../templates/LittleStar";

import PartyNight from "../templates/PartyNight";

import EngagementRose from "../templates/EngagementRose";

import CorporateEvent from "../templates/CorporateEvent";


function CreateInvitation() {

  const navigate = useNavigate();

  const { templateId } = useParams();

  const [
    searchParams
  ] = useSearchParams();


  const draftId =
    searchParams.get("draftId");

  const invitationId =
    searchParams.get("invitationId");


  const [template, setTemplate] =
    useState(null);

  const [formData, setFormData] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


 
  const isEditing =
    Boolean(
      draftId ||
      invitationId
    );


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

          data:
            formData,

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


    switch (template.component) {

      case "WeddingClassic":

        return (
          <WeddingClassic
            data={formData}
            onRSVP={() => {}}
          />
        );


      case "BirthdayModern":

        return (
          <BirthdayModern
            data={formData}
            onRSVP={() => {}}
          />
        );


      case "EngagementForever":

        return (
          <EngagementForever
            data={formData}
            onRSVP={() => {}}
          />
        );

      case "RoyalWedding":

        return (
          <RoyalWedding
            data={formData}
            onRSVP={() => {}}
          />
        );


      case "GardenWedding":

        return (
          <GardenWedding
            data={formData}
            onRSVP={() => {}}
          />
        );


      case "MinimalWedding":

        return (
          <MinimalWedding
            data={formData}
            onRSVP={() => {}}
          />
        );

      case "BirthdayPop":

        return (
          <BirthdayPop
            data={formData}
            onRSVP={() => {}}
          />
        );


      case "BirthdayElegant":

        return (
          <BirthdayElegant
            data={formData}
            onRSVP={() => {}}
          />
        );

      case "BabyBloom":

        return (
          <BabyBloom
            data={formData}
            onRSVP={() => {}}
          />
        );


      case "LittleStar":

        return (
          <LittleStar
            data={formData}
            onRSVP={() => {}}
          />
        );

      case "PartyNight":

        return (
          <PartyNight
            data={formData}
            onRSVP={() => {}}
          />
        );

      case "EngagementRose":

        return (
          <EngagementRose
            data={formData}
            onRSVP={() => {}}
          />
        );

      case "CorporateEvent":

        return (
          <CorporateEvent
            data={formData}
            onRSVP={() => {}}
          />
        );

      default:

        return (
          <div className="template-not-available">

            <h3>
              Template design not available
            </h3>

            <p>
              The design for this template
              has not been created yet.
            </p>

          </div>
        );

    }

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

        const initialData = {};


        selectedTemplate.fields.forEach(
          (field) => {

            initialData[field.name] =
              "";

          }
        );

        initialData.venue = "";

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

          setFormData({

            ...initialData,

            ...(savedInvitation.data || {})

          });

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