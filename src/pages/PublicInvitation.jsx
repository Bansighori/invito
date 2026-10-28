import {
  useEffect,
  useRef,
  useState
} from "react";

import api from "../api/axios";

import {
  LoaderCircle
} from "lucide-react";
import { toCanvas } from "html-to-image";

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

  const [searchParams] =
    useSearchParams();

  const [isDownloadingPDF, setIsDownloadingPDF] =
    useState(false);

  const invitationRef =
    useRef(null);

  const [invitation, setInvitation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showRSVP, setShowRSVP] =
    useState(
      searchParams.get("rsvp") === "true"
    );


  // ==========================================
  // CHECK RSVP URL
  // ==========================================

  useEffect(() => {

    if (
      searchParams.get("rsvp") === "true"
    ) {
      setShowRSVP(true);
    }

  }, [searchParams]);


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
  const element = invitationRef.current;

  if (!element || isDownloadingPDF) return;

  setIsDownloadingPDF(true);
  element.classList.add("pdf-generating");

  try {
    // Wait for React to update the PDF button and styles
    await new Promise((resolve) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(resolve)
      )
    );

    // Wait for fonts
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    // Wait for images
    const images = Array.from(element.querySelectorAll("img"));

    await Promise.all(
      images.map(async (img) => {
        if (!img.complete) {
          await new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
          });
        }

        if (img.naturalWidth > 0 && img.decode) {
          try {
            await img.decode();
          } catch {
            // Continue if image decoding fails
          }
        }
      })
    );

    // Allow styles and layout to settle
    await new Promise((resolve) => setTimeout(resolve, 200));

    const rect = element.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      throw new Error(
        "Invitation has zero width or height. Check its container CSS."
      );
    }

    // Render the invitation

    // Render the invitation
console.log("PDF element:", element);
console.log("PDF dimensions:", {
  width: element.getBoundingClientRect().width,
  height: element.getBoundingClientRect().height,
});



const canvas = await toCanvas(element, {
  pixelRatio: 2,
  cacheBust: true,
  backgroundColor: "#ffffff",
  skipAutoScale: false,
  filter: (node) => {
    return !(
      node instanceof Element &&
      node.classList.contains("engagement-gold-shine")
    );
  },
});

if (!canvas.width || !canvas.height) {
  throw new Error(
    `Invalid canvas dimensions: ${canvas.width} × ${canvas.height}`
  );
}


if (canvas.width === 0 || canvas.height === 0) {
  throw new Error(
    `Invalid generated canvas: ${canvas.width} x ${canvas.height}`
  );
}



    // Create PDF
    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
      compress: true,
    });

    pdf.addImage(
      imageData,
      "PNG",
      0,
      0,
      canvas.width,
      canvas.height
    );

    // Add clickable links using the original element positions
    const originalRect = element.getBoundingClientRect();
    const scaleX = canvas.width / originalRect.width;
    const scaleY = canvas.height / originalRect.height;

    const addPdfLink = (linkElement, url) => {
      if (!linkElement || !url) return;

      const linkRect = linkElement.getBoundingClientRect();

      if (!linkRect.width || !linkRect.height) return;

      const x = (linkRect.left - originalRect.left) * scaleX;
      const y = (linkRect.top - originalRect.top) * scaleY;
      const width = linkRect.width * scaleX;
      const height = linkRect.height * scaleY;

      pdf.link(x, y, width, height, { url });
    };

    // Support different RSVP button class names
    const rsvpButton = element.querySelector(
      [
        ".invitation-rsvp-button",
        ".engagement-gold-rsvp",
        ".dynamic-rsvp-button",
        ".photo-floral-rsvp",
      ].join(", ")
    );

    if (rsvpButton && slug) {
      const rsvpUrl =
        `${window.location.origin}/invite/${slug}?rsvp=true`;

      addPdfLink(rsvpButton, rsvpUrl);
    }

    // Add Google Maps link if present
    const locationLink = element.querySelector(
      'a[href*="google.com/maps"]'
    );

    if (locationLink) {
      addPdfLink(locationLink, locationLink.href);
    }

    // Download PDF
    const filename = (invitation?.title || "invitation")
      .replace(/[<>:"/\\|?*]/g, "-");

    pdf.save(`${filename}.pdf`);

  } catch (error) {
  console.error("PDF error:", error);
  console.error("PDF stack trace:", error.stack);
  console.error("PDF element:", invitationRef.current);

  alert(`PDF failed: ${error.message}`);

  } finally {
    element.classList.remove("pdf-generating");
    setIsDownloadingPDF(false);
  }
};



  // ==========================================
  // TEMPLATE COMPONENT
  // ==========================================

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

        enableOpeningAnimation={
          !isDownloadingPDF
        }
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
    <>
    <style>
      {`
      
      
.public-invitation-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  box-sizing: border-box;
}

.public-invitation-canvas {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
}

.invitation-pdf-content {
  width: 100%;
  max-width: none;
  box-sizing: border-box;
}

/* Allow the template to fill the container */
.invitation-pdf-content > * {
  width: 100% !important;
  max-width: none !important;
  box-sizing: border-box;
}

@media (max-width: 700px) {
  .public-invitation-page {
    padding: 15px 8px;
  }

  .public-invitation-canvas {
    max-width: 100%;
  }
}
`}
    </style>
    <div className="public-invitation-page">


      {/* =====================================
          DOWNLOAD PDF BUTTON
          ===================================== */}

      <button
        type="button"
        className="download-pdf-button"
        onClick={handleDownloadPDF}
        disabled={isDownloadingPDF}
      >

        {isDownloadingPDF
          ? "Generating PDF..."
          : "Download PDF"}

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
            =================================== */}

        {showRSVP && (

          <RSVPForm
            invitationId={
              invitation._id
            }
            onClose={() =>
              setShowRSVP(false)
            }
          />

        )}

      </div>

    </div>
    </>
  );

}

export default PublicInvitation;