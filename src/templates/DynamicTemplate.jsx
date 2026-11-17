import React from "react";
import "./DynamicTemplate.css";

function DynamicTemplate({
  data = {},
  design = {},
  fields = [],
  onRSVP
}) {
  const background = design.background || {};
  const typography = design.typography || {};
  const border = design.border || {};
  const layout = design.layout || {};
  const decoration = design.decoration || {};
  const button = design.button || {};
  const image = design.image || {};

  const getBackground = () => {
  // User-uploaded background takes priority
  if (data.backgroundPhoto) {
    return `url("${data.backgroundPhoto}")`;
  }

  if (background.type === "gradient") {
    return `linear-gradient(
      ${background.direction || "135deg"},
      ${background.color1 || "#ffffff"},
      ${background.color2 || "#f8e8ef"}
    )`;
  }

  if (background.type === "image" && background.image) {
    return `url("${background.image}")`;
  }

  return background.color || "#ffffff";
};

  const cardStyle = {
     position: "relative",
    width: `${layout.width || 420}px`,
    minHeight: `${layout.height || 650}px`,
    padding: `${layout.padding || 30}px`,
    background: getBackground(),
backgroundSize:
  data.backgroundPhoto || background.type === "image"
    ? background.size || "cover"
    : undefined,
backgroundPosition: background.position || "center",
backgroundRepeat: "no-repeat",
overflow: "hidden",
    border: border.enabled
      ? `${border.width || 2}px ${
          border.style || "solid"
        } ${border.color || "#c89b3c"}`
      : "none",

    borderRadius: `${border.radius || 20}px`,

    textAlign: layout.alignment || "center",

    fontFamily:
      typography.bodyFont || "Poppins"
  };

  const titleStyle = {
    fontFamily:
      typography.titleFont ||
      "Playfair Display",

    fontSize: `${typography.titleSize || 32}px`,

    color:
      typography.titleColor ||
      "#8b4a62",

    textAlign:
      typography.titleAlignment ||
      "center"
  };

  const bodyStyle = {
    fontSize:
      `${typography.bodySize || 16}px`,

    color:
      typography.bodyColor ||
      "#555555",

    textAlign:
      typography.bodyAlignment ||
      "center"
  };

  /*
   * Fields that already have special
   * layouts inside the invitation.
   */
  const specialFields = [
  "brideName",
  "groomName",
  "personName",
  "parentName",
  "eventDate",
  "eventTime",
  "venue",
  "address",
  "message",
  "title",
  "eventName",
  "subtitle"
];

  /*
   * Get custom fields created by Admin.
   */
  const customFields = fields.filter(
    (field) =>
      field.name &&
      !specialFields.includes(field.name) &&
      data[field.name] !== undefined &&
      data[field.name] !== ""
  );

  return (
    <div className="dynamic-template-wrapper">

      <div
        className="dynamic-template"
        style={cardStyle}
      >
      {/* BACKGROUND OVERLAY */}

{Number(background.overlayOpacity) > 0 && (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor:
        background.overlayColor || "#000000",
      opacity:
        Number(background.overlayOpacity) / 100,
      pointerEvents: "none",
      zIndex: 1
    }}
  />
)}

        {/* DECORATION */}

        {decoration.enabled &&
          decoration.type !== "none" && (
            <div
              className={`dynamic-decoration dynamic-decoration-${decoration.type}`}
            >
              {decoration.type === "hearts" &&
                "♥ ♥ ♥"}

              {decoration.type === "stars" &&
                "✦ ✦ ✦"}

              {decoration.type === "floral" &&
                "❀ ❀ ❀"}

              {decoration.type === "leaves" &&
                "❧ ❧ ❧"}

              {decoration.type === "confetti" &&
                "✦ • ✦ • ✦"}
            </div>
          )}

        {/* IMAGE */}

        {image.enabled && image.url && (
          <div
            className={`dynamic-image-container dynamic-image-${image.position}`}
          >
            <img
              src={image.url}
              alt="Invitation"
              style={{
                width:
                  `${image.width || 180}px`,

                height:
                  `${image.height || 180}px`,

                borderRadius:
                  `${image.radius || 50}%`
              }}
            />
          </div>
        )}

        {/* ADMIN CREATED VISUAL ELEMENTS */}

{(design.elements || []).map((element) => {
  const framePhoto = data.framePhotos?.[element.id];

  const elementStyle = {
    position: "absolute",
    left: `${element.x || 0}px`,
    top: `${element.y || 0}px`,
    width: `${element.width || 100}px`,
    height: `${element.height || 100}px`,
    zIndex: 5,
    boxSizing: "border-box"
  };

  if (element.type === "text") {
    return (
      <div
        key={element.id}
        style={{
          ...elementStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: `${element.fontSize || 24}px`,
          color: element.color || "#8b4a62",
          fontFamily: element.fontFamily || "Poppins",
          textAlign: "center"
        }}
      >
        {element.content}
      </div>
    );
  }

  if (element.type === "shape") {
    return (
      <div
        key={element.id}
        style={{
          ...elementStyle,
          background: element.backgroundColor || "#f4dce5",
          borderRadius:
            element.shape === "circle"
              ? "50%"
              : `${element.borderRadius || 0}px`
        }}
      />
    );
  }

  if (element.type === "photo") {
    return (
      <div
        key={element.id}
        style={{
          ...elementStyle,
          overflow: "hidden",
          borderRadius:
  Number(element.borderRadius) >= 100
    ? "50%"
    : `${element.borderRadius || 12}px`,
          border: "2px dashed #c9b5df",
          background: "#f8f4fc"
        }}
      >
        {framePhoto ? (
          <img
            src={framePhoto}
            alt="Uploaded invitation"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#8064ad",
              fontSize: "12px"
            }}
          >
            Photo Frame
          </div>
        )}
      </div>
    );
  }

  return null;
})}

        {/* CONTENT */}

        <div
  className="dynamic-content"
  style={{
    position: "relative",
    zIndex: 2
  }}
>

          {/* TITLE */}

          <h1 style={titleStyle}>
  {data.title ||
    data.eventName ||
    data.brideName ||
    data.personName ||
    "Your Event"}
</h1>

          {/* SUBTITLE */}

          {data.subtitle && (
            <p
              className="dynamic-subtitle"
              style={bodyStyle}
            >
              {data.subtitle}
            </p>
          )}

          {/* WEDDING COUPLE */}

          {data.brideName &&
            data.groomName && (
              <div className="dynamic-couple">

                <span>
                  {data.brideName}
                </span>

                <span className="dynamic-and">
                  &
                </span>

                <span>
                  {data.groomName}
                </span>

              </div>
            )}

          {/* PERSON */}

          {data.personName && (
            <h2
              className="dynamic-person"
              style={titleStyle}
            >
              {data.personName}
            </h2>
          )}
          {data.parentName && (
  <h2
    className="dynamic-person"
    style={titleStyle}
  >
    {data.parentName}
  </h2>
)}

          {/* STANDARD DETAILS */}

          <div
            className="dynamic-details"
            style={bodyStyle}
          >

            {data.eventDate && (
              <div>
                <strong>Date</strong>

                <span>
                  {data.eventDate}
                </span>
              </div>
            )}

            {data.eventTime && (
              <div>
                <strong>Time</strong>

                <span>
                  {data.eventTime}
                </span>
              </div>
            )}

            {data.venue && (
              <div>
                <strong>Venue</strong>

                <span>
                  {data.venue}
                </span>
              </div>
            )}

            {data.address && (
              <div>
                <strong>Address</strong>

                <span>
                  {data.address}
                </span>
              </div>
            )}

          </div>

          {/* CUSTOM ADMIN FIELDS */}

          {customFields.length > 0 && (
            <div
              className="dynamic-custom-fields"
              style={bodyStyle}
            >

              {customFields.map((field) => (
                <div
                  className="dynamic-custom-field"
                  key={field.name}
                >

                  <strong>
                    {field.label ||
                      field.name}
                  </strong>

                  <span>
                    {data[field.name]}
                  </span>

                </div>
              ))}

            </div>
          )}

          {/* MESSAGE */}

          {data.message && (
            <p
              className="dynamic-message"
              style={bodyStyle}
            >
              {data.message}
            </p>
          )}

          {/* RSVP */}

          
{design.button?.enabled !== false && (
  <button
    type="button"
    className="dynamic-rsvp-button"
    style={{
      backgroundColor: design.button?.backgroundColor || "#8b4a62",
      color: design.button?.textColor || "#ffffff",
      borderRadius: `${design.button?.radius ?? 10}px`
    }}
    onClick={onRSVP}
  >
    {design.button?.text || "RSVP"}
  </button>
)}


        </div>

      </div>

    </div>
  );
}

export default DynamicTemplate;