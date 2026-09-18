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
  useParams,
  useSearchParams
} from "react-router-dom";


import TemplateRenderer from "../components/TemplateRenderer";


import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import RSVPForm from "../components/RSVPForm";


function PublicInvitation() {

  const { slug } = useParams();
  

  const [searchParams] = useSearchParams();

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
  if (searchParams.get("rsvp") === "true") {
    setShowRSVP(true);
  }
}, [searchParams]);
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

    // Add PDF mode class
    invitationRef.current.classList.add(
      "pdf-generating"
    );


    // ==========================================
    // WAIT FOR ALL IMAGES
    // ==========================================

    const images =
      invitationRef.current.querySelectorAll(
        "img"
      );


    await Promise.all(
      Array.from(images).map(
        (image) => {

          if (image.complete) {
            return Promise.resolve();
          }


          return new Promise(
            (resolve) => {

              image.onload =
                resolve;

              image.onerror =
                resolve;

            }
          );

        }
      )
    );


    // Small delay to make sure
    // Cloudinary images are rendered

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 300)
    );


    // ==========================================
    // CREATE CANVAS
    // ==========================================

    const canvas =
      await html2canvas(
        invitationRef.current,
        {
          scale: 2,

          useCORS: true,

          allowTaint: false,

          backgroundColor:
            "#ffffff",

          imageTimeout: 15000,

          logging: false
        }
      );


    const imageData =
      canvas.toDataURL(
        "image/png"
      );


    // ==========================================
    // CREATE PDF
    // ==========================================

    const pdf =
      new jsPDF({

        orientation:
          "portrait",

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

// ==========================================
// CLICKABLE RSVP LINK
// ==========================================

const invitationElement =
  invitationRef.current;

const rsvpButton =
  invitationElement.querySelector(
    ".invitation-rsvp-button"
  );

if (rsvpButton) {
  const invitationRect =
    invitationElement.getBoundingClientRect();

  const buttonRect =
    rsvpButton.getBoundingClientRect();

  const canvasScale =
    canvas.width /
    invitationRect.width;

  const pdfX =
    (buttonRect.left -
      invitationRect.left) *
    canvasScale;

  const pdfY =
    (buttonRect.top -
      invitationRect.top) *
    canvasScale;

  const pdfButtonWidth =
    buttonRect.width *
    canvasScale;

  const pdfButtonHeight =
    buttonRect.height *
    canvasScale;

  const rsvpUrl =
  `${window.location.origin}/invite/${slug}?rsvp=true#rsvp`;

  pdf.link(
  pdfX,
  pdfY,
  pdfButtonWidth,
  pdfButtonHeight,
  {
    url: rsvpUrl
  }
);
}


    // ==========================================
    // GOOGLE MAPS LINK
    // ==========================================

    const locationLink =
      invitationRef.current.querySelector(
        'a[href*="google.com/maps"]'
      );


    if (locationLink) {

      const invitationRect =
        invitationRef.current
          .getBoundingClientRect();


      const locationRect =
        locationLink
          .getBoundingClientRect();


      const canvasScale =
        canvas.width /
        invitationRect.width;


      const relativeX =
        locationRect.left -
        invitationRect.left;


      const relativeY =
        locationRect.top -
        invitationRect.top;


      const pdfX =
        relativeX *
        canvasScale;


      const pdfY =
        relativeY *
        canvasScale;


      const pdfWidth =
        locationRect.width *
        canvasScale;


      const pdfHeight =
        locationRect.height *
        canvasScale;


      pdf.link(
        pdfX,
        pdfY,
        pdfWidth,
        pdfHeight,
        {
          url:
            locationLink.href
        }
      );

    }


    // ==========================================
    // SAVE PDF
    // ==========================================

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