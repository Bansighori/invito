import {
  useEffect,
  useRef,
  useState
} from "react";

import api from "../api/axios";

import {
  LoaderCircle
} from "lucide-react";

import {
  useParams
} from "react-router-dom";


// ==========================================
// ORIGINAL TEMPLATES
// ==========================================

import WeddingClassic from "../templates/WeddingClassic";
import BirthdayModern from "../templates/BirthdayModern";
import EngagementForever from "../templates/EngagementForever";


// ==========================================
// NEW TEMPLATES
// ==========================================

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


import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import RSVPForm from "../components/RSVPForm";


function PublicInvitation() {

  const { slug } = useParams();

  const invitationRef =
    useRef(null);

  const [invitation, setInvitation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showRSVP, setShowRSVP] =
    useState(false);


  // ==========================================
  // FETCH PUBLIC INVITATION
  // ==========================================

  useEffect(() => {

    const fetchInvitation = async () => {

      try {

        setLoading(true);

        setError("");

        const response =
          await api.get(
            `/invitations/public/${slug}`
          );

        setInvitation(
          response.data.invitation
        );

      } catch (error) {

        console.error(
          "Failed to load public invitation:",
          error
        );

        setError(
          "This invitation could not be found."
        );

      } finally {

        setLoading(false);

      }

    };


    if (slug) {

      fetchInvitation();

    }

  }, [slug]);


  // ==========================================
  // DOWNLOAD PDF
  // ==========================================

  const handleDownloadPDF = async () => {
  if (!invitationRef.current) {
    return;
  }

  try {
   
    invitationRef.current.classList.add("pdf-generating");

    const canvas = await html2canvas(
      invitationRef.current,
      {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      }
    );

    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [
        canvas.width,
        canvas.height
      ]
    });


    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      canvas.width,
      canvas.height
    );


const locationLink =
  invitationRef.current.querySelector(
    'a[href*="google.com/maps"]'
  );

if (locationLink) {

  const invitationRect =
    invitationRef.current.getBoundingClientRect();

  const locationRect =
    locationLink.getBoundingClientRect();

  const canvasScale = 2;

  const relativeX =
    locationRect.left -
    invitationRect.left;

  const relativeY =
    locationRect.top -
    invitationRect.top;

  const pdfX =
    relativeX * canvasScale;

  const pdfY =
    relativeY * canvasScale;

  const pdfWidth =
    locationRect.width * canvasScale;

  const pdfHeight =
    locationRect.height * canvasScale;

  console.log("Google Maps PDF link:", {
    url: locationLink.href,
    x: pdfX,
    y: pdfY,
    width: pdfWidth,
    height: pdfHeight
  });

  pdf.link(
    pdfX,
    pdfY,
    pdfWidth,
    pdfHeight,
    {
      url: locationLink.href
    }
  );
}

    pdf.save(
      `${invitation.title || "invitation"}.pdf`
    );

  } catch (error) {

    console.error(
      "PDF download error:",
      error
    );

    alert(
      "Failed to generate PDF."
    );

  } finally {


    if (invitationRef.current) {

      invitationRef.current.classList.remove(
        "pdf-generating"
      );

    }

  }
};

  const getTemplateComponent = () => {

    if (!invitation) {
      return null;
    }


    const template =
      invitation.templateId;


    const templateData =
      invitation.data || {};


    switch (template?.component) {


      // ======================================
      // ORIGINAL WEDDING
      // ======================================

      case "WeddingClassic":

        return (
          <WeddingClassic
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // ORIGINAL BIRTHDAY
      // ======================================

      case "BirthdayModern":

        return (
          <BirthdayModern
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // ORIGINAL ENGAGEMENT
      // ======================================

      case "EngagementForever":

        return (
          <EngagementForever
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // ROYAL WEDDING
      // ======================================

      case "RoyalWedding":

        return (
          <RoyalWedding
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // GARDEN WEDDING
      // ======================================

      case "GardenWedding":

        return (
          <GardenWedding
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // MINIMAL WEDDING
      // ======================================

      case "MinimalWedding":

        return (
          <MinimalWedding
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // BIRTHDAY POP
      // ======================================

      case "BirthdayPop":

        return (
          <BirthdayPop
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // BIRTHDAY ELEGANT
      // ======================================

      case "BirthdayElegant":

        return (
          <BirthdayElegant
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // BABY BLOOM
      // ======================================

      case "BabyBloom":

        return (
          <BabyBloom
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // LITTLE STAR
      // ======================================

      case "LittleStar":

        return (
          <LittleStar
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // PARTY NIGHT
      // ======================================

      case "PartyNight":

        return (
          <PartyNight
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // ENGAGEMENT ROSE
      // ======================================

      case "EngagementRose":

        return (
          <EngagementRose
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // CORPORATE EVENT
      // ======================================

      case "CorporateEvent":

        return (
          <CorporateEvent
            data={templateData}
            onRSVP={() =>
              setShowRSVP(true)
            }
          />
        );


      // ======================================
      // DEFAULT
      // ======================================

      default:

        return (
          <div
            style={{
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
              padding: "40px",
              textAlign: "center"
            }}
          >

            <h2>
              Template not available
            </h2>

            <p>
              This invitation template
              is not available.
            </p>

            <p
              style={{
                fontSize: "13px",
                opacity: 0.6
              }}
            >
              Template:
              {" "}
              {template?.component || "Unknown"}
            </p>

          </div>
        );

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "12px"
        }}
      >

        <LoaderCircle
          size={32}
          className="editor-spinner"
        />

        <p>
          Loading invitation...
        </p>

      </div>
    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        <h1>
          Invitation Not Found
        </h1>

        <p>
          {error}
        </p>

      </div>
    );

  }


  // ==========================================
  // PUBLIC INVITATION
  // ==========================================

  return (
    <div className="public-invitation-page">


      {/* =====================================
          DOWNLOAD PDF BUTTON
          ===================================== */}

      <button
        type="button"
        className="download-pdf-button"
        onClick={handleDownloadPDF}
      >
        Download PDF
      </button>


      {/* =====================================
          INVITATION AREA
          ===================================== */}

      <div className="public-invitation-canvas">


        {/* ===================================
            ONLY THIS PART GOES INTO PDF
            =================================== */}

        <div
          ref={invitationRef}
          className="invitation-pdf-content"
        >

          {getTemplateComponent()}

        </div>


        {/* ===================================
            RSVP FORM

            OUTSIDE invitationRef

            Therefore it will NOT be included
            in the PDF.
            =================================== */}

        {showRSVP && (

          <div className="public-rsvp-container">

            <RSVPForm
              invitationId={
                invitation._id
              }
            />

          </div>

        )}

      </div>

    </div>
  );

}


export default PublicInvitation;