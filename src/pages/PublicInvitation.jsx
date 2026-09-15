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


import TemplateRenderer from "../components/TemplateRenderer";


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

    return (
      <TemplateRenderer
        component={template?.component}
        category={invitation.category}
        data={templateData}
        onRSVP={() => setShowRSVP(true)}
      />
    );
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