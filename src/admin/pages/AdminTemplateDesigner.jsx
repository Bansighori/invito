import React, { useEffect, useState } from "react";
import {
  Palette,
  Type,
  Square,
  Layout,
  Sparkles,
  Image,
  MousePointer2,
  FileText
} from "lucide-react";

import DynamicTemplate from "../../templates/DynamicTemplate";

import "./AdminTemplateDesigner.css";

function AdminTemplateDesigner({
  design,
  setDesign,
  fields = []
}) {
  const [previewData, setPreviewData] = useState({
  title: "You're Invited"
});
useEffect(() => {
  setPreviewData((previous) => {
    const next = {
      title: previous.title || "You're Invited"
    };

    fields.forEach((field) => {
      const name = field.name;

      next[name] =
        previous[name] !== undefined
          ? previous[name]
          : getDefaultPreviewValue(
              name,
              field.label,
              field.type
            );
    });

    return next;
  });
}, [fields]);

  const getDefaultPreviewValue = (
    name,
    label,
    type
  ) => {
    const key = (
      name ||
      label ||
      ""
    ).toLowerCase();

    if (
      key.includes("bride")
    ) {
      return "William";
    }

    if (
      key.includes("groom")
    ) {
      return "Sophia";
    }

    if (
      key.includes("person")
    ) {
      return "Sophia";
    }

    if (
      key.includes("baby")
    ) {
      return "Baby";
    }

    if (
      key.includes("parent")
    ) {
      return "William & Sophia";
    }

    if (
      key.includes("age")
    ) {
      return "25";
    }

    if (
      key.includes("date")
    ) {
      return "20 December 2026";
    }

    if (
      key.includes("time")
    ) {
      return "7:00 PM";
    }

    if (
      key.includes("venue")
    ) {
      return "Beautiful Celebration Venue";
    }

    if (
      key.includes("address")
    ) {
      return "Surat, Gujarat";
    }

    if (
      key.includes("message")
    ) {
      return "Together with their families, they request the pleasure of your company.";
    }

    if (
      key.includes("eventname") ||
      key.includes("event name")
    ) {
      return "Beautiful Celebration";
    }

    if (type === "number") {
      return "25";
    }

    if (type === "date") {
      return "20 December 2026";
    }

    if (type === "time") {
      return "7:00 PM";
    }

    return `Sample ${label || "Value"}`;
  };

  const updateSection = (
    section,
    property,
    value
  ) => {
    setDesign((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        [property]: value
      }
    }));
  };

  const updatePreviewValue = (name, value) => {
  setPreviewData((prev) => ({
    ...prev,
    [name]: value
  }));
};

  return (
    <section className="template-designer">

      {/* HEADER */}

      <div className="designer-header">

        <div>
          <div className="designer-title">
            <Sparkles size={21} />

            <h2>
              Template Designer
            </h2>
          </div>

          <p>
            Customize your template and
            preview the invitation instantly.
          </p>
        </div>

        <div className="live-badge">
          <span />
          Live Preview
        </div>

      </div>

      <div className="designer-layout">

        {/* LEFT SIDE */}

        <div className="designer-controls">

          {/* PREVIEW CONTENT */}

          {/* PREVIEW CONTENT */}

<div className="designer-section">

  <div className="designer-section-title">
    <FileText size={18} />

    <div>
      <h3>Preview Content</h3>

      <span>
        Enter sample values to see them in the live preview.
      </span>
    </div>
  </div>

  <div className="designer-form-grid">

    <div className="designer-field full">
      <label>Invitation Title</label>

      <input
        type="text"
        value={previewData.title || ""}
        onChange={(e) =>
          updatePreviewValue(
            "title",
            e.target.value
          )
        }
        placeholder="You're Invited"
      />
    </div>

    {fields.map((field, index) => (
      <div
        className="designer-field"
        key={field.name || index}
      >
        <label>
          {field.label || field.name}
        </label>

        {field.type === "textarea" ? (
          <textarea
            rows="3"
            value={
              previewData[field.name] || ""
            }
            onChange={(e) =>
              updatePreviewValue(
                field.name,
                e.target.value
              )
            }
            placeholder={
              field.label || field.name
            }
          />
        ) : (
          <input
            type={
              field.type === "number"
                ? "number"
                : "text"
            }
            value={
              previewData[field.name] || ""
            }
            onChange={(e) =>
              updatePreviewValue(
                field.name,
                e.target.value
              )
            }
            placeholder={
              field.label || field.name
            }
          />
        )}
      </div>
    ))}

  </div>

</div>

          {/* BACKGROUND */}

          <div className="designer-section">

            <div className="designer-section-title">
              <Palette size={18} />

              <div>
                <h3>
                  Background
                </h3>

                <span>
                  Choose the invitation
                  background.
                </span>
              </div>
            </div>

            <div className="designer-form-grid">

              <div className="designer-field">

                <label>
                  Background Type
                </label>

                <select
                  value={
                    design.background?.type ||
                    "solid"
                  }
                  onChange={(e) =>
                    updateSection(
                      "background",
                      "type",
                      e.target.value
                    )
                  }
                >
                  <option value="solid">
                    Solid Color
                  </option>

                  <option value="gradient">
                    Gradient
                  </option>

                  <option value="image">
                    Image
                  </option>
                </select>

              </div>

              {design.background?.type ===
                "solid" && (
                <div className="designer-field">

                  <label>
                    Background Color
                  </label>

                  <div className="color-input">

                    <input
                      type="color"
                      value={
                        design.background
                          ?.color ||
                        "#ffffff"
                      }
                      onChange={(e) =>
                        updateSection(
                          "background",
                          "color",
                          e.target.value
                        )
                      }
                    />

                    <span>
                      {design.background
                        ?.color ||
                        "#ffffff"}
                    </span>

                  </div>

                </div>
              )}

              {design.background?.type ===
                "gradient" && (
                <>
                  <div className="designer-field">

                    <label>
                      Gradient Color 1
                    </label>

                    <div className="color-input">

                      <input
                        type="color"
                        value={
                          design.background
                            ?.color1 ||
                          "#ffffff"
                        }
                        onChange={(e) =>
                          updateSection(
                            "background",
                            "color1",
                            e.target.value
                          )
                        }
                      />

                      <span>
                        {design.background
                          ?.color1 ||
                          "#ffffff"}
                      </span>

                    </div>

                  </div>

                  <div className="designer-field">

                    <label>
                      Gradient Color 2
                    </label>

                    <div className="color-input">

                      <input
                        type="color"
                        value={
                          design.background
                            ?.color2 ||
                          "#f8e8ef"
                        }
                        onChange={(e) =>
                          updateSection(
                            "background",
                            "color2",
                            e.target.value
                          )
                        }
                      />

                      <span>
                        {design.background
                          ?.color2 ||
                          "#f8e8ef"}
                      </span>

                    </div>

                  </div>

                  <div className="designer-field">

                    <label>
                      Gradient Direction
                    </label>

                    <select
                      value={
                        design.background
                          ?.direction ||
                        "135deg"
                      }
                      onChange={(e) =>
                        updateSection(
                          "background",
                          "direction",
                          e.target.value
                        )
                      }
                    >
                      <option value="0deg">
                        Top → Bottom
                      </option>

                      <option value="45deg">
                        Diagonal
                      </option>

                      <option value="90deg">
                        Left → Right
                      </option>

                      <option value="135deg">
                        Diagonal
                      </option>

                      <option value="180deg">
                        Bottom → Top
                      </option>
                    </select>

                  </div>
                </>
              )}

              {design.background?.type ===
                "image" && (
                <div className="designer-field full">

                  <label>
                    Background Image URL
                  </label>

                  <input
                    value={
                      design.background
                        ?.image || ""
                    }
                    onChange={(e) =>
                      updateSection(
                        "background",
                        "image",
                        e.target.value
                      )
                    }
                    placeholder="https://..."
                  />

                </div>
              )}

            </div>

          </div>

          {/* TYPOGRAPHY */}

          <div className="designer-section">

            <div className="designer-section-title">
              <Type size={18} />

              <div>
                <h3>
                  Typography
                </h3>

                <span>
                  Customize invitation text.
                </span>
              </div>
            </div>

            <div className="designer-form-grid">

              <div className="designer-field">

                <label>
                  Title Font
                </label>

                <select
                  value={
                    design.typography
                      ?.titleFont ||
                    "Playfair Display"
                  }
                  onChange={(e) =>
                    updateSection(
                      "typography",
                      "titleFont",
                      e.target.value
                    )
                  }
                >
                  <option>
                    Playfair Display
                  </option>

                  <option>
                    Poppins
                  </option>

                  <option>
                    Georgia
                  </option>

                  <option>
                    Times New Roman
                  </option>

                  <option>
                    Arial
                  </option>

                  <option>
                    Montserrat
                  </option>

                  <option>
                    Cormorant Garamond
                  </option>

                  <option>
                    Great Vibes
                  </option>
                </select>

              </div>

              <div className="designer-field">

                <label>
                  Body Font
                </label>

                <select
                  value={
                    design.typography
                      ?.bodyFont ||
                    "Poppins"
                  }
                  onChange={(e) =>
                    updateSection(
                      "typography",
                      "bodyFont",
                      e.target.value
                    )
                  }
                >
                  <option>
                    Poppins
                  </option>

                  <option>
                    Playfair Display
                  </option>

                  <option>
                    Georgia
                  </option>

                  <option>
                    Arial
                  </option>

                  <option>
                    Montserrat
                  </option>
                </select>

              </div>

              <div className="designer-field">

                <label>
                  Title Size
                </label>

                <input
                  type="number"
                  min="16"
                  max="70"
                  value={
                    design.typography
                      ?.titleSize || 32
                  }
                  onChange={(e) =>
                    updateSection(
                      "typography",
                      "titleSize",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="designer-field">

                <label>
                  Body Size
                </label>

                <input
                  type="number"
                  min="10"
                  max="30"
                  value={
                    design.typography
                      ?.bodySize || 16
                  }
                  onChange={(e) =>
                    updateSection(
                      "typography",
                      "bodySize",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="designer-field">

                <label>
                  Title Color
                </label>

                <div className="color-input">

                  <input
                    type="color"
                    value={
                      design.typography
                        ?.titleColor ||
                      "#8b4a62"
                    }
                    onChange={(e) =>
                      updateSection(
                        "typography",
                        "titleColor",
                        e.target.value
                      )
                    }
                  />

                  <span>
                    {design.typography
                      ?.titleColor ||
                      "#8b4a62"}
                  </span>

                </div>

              </div>

              <div className="designer-field">

                <label>
                  Body Color
                </label>

                <div className="color-input">

                  <input
                    type="color"
                    value={
                      design.typography
                        ?.bodyColor ||
                      "#555555"
                    }
                    onChange={(e) =>
                      updateSection(
                        "typography",
                        "bodyColor",
                        e.target.value
                      )
                    }
                  />

                  <span>
                    {design.typography
                      ?.bodyColor ||
                      "#555555"}
                  </span>

                </div>

              </div>

              <div className="designer-field">

                <label>
                  Title Alignment
                </label>

                <select
                  value={
                    design.typography
                      ?.titleAlignment ||
                    "center"
                  }
                  onChange={(e) =>
                    updateSection(
                      "typography",
                      "titleAlignment",
                      e.target.value
                    )
                  }
                >
                  <option value="left">
                    Left
                  </option>

                  <option value="center">
                    Center
                  </option>

                  <option value="right">
                    Right
                  </option>
                </select>

              </div>

              <div className="designer-field">

                <label>
                  Body Alignment
                </label>

                <select
                  value={
                    design.typography
                      ?.bodyAlignment ||
                    "center"
                  }
                  onChange={(e) =>
                    updateSection(
                      "typography",
                      "bodyAlignment",
                      e.target.value
                    )
                  }
                >
                  <option value="left">
                    Left
                  </option>

                  <option value="center">
                    Center
                  </option>

                  <option value="right">
                    Right
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* BORDER */}

          <div className="designer-section">

            <div className="designer-section-title">
              <Square size={18} />

              <div>
                <h3>Border</h3>

                <span>
                  Customize the invitation
                  border.
                </span>
              </div>
            </div>

            <label className="designer-switch">

              <input
                type="checkbox"
                checked={
                  design.border
                    ?.enabled !== false
                }
                onChange={(e) =>
                  updateSection(
                    "border",
                    "enabled",
                    e.target.checked
                  )
                }
              />

              <span>
                Enable Border
              </span>

            </label>

            {design.border?.enabled !==
              false && (
              <div className="designer-form-grid">

                <div className="designer-field">

                  <label>
                    Border Style
                  </label>

                  <select
                    value={
                      design.border
                        ?.style ||
                      "solid"
                    }
                    onChange={(e) =>
                      updateSection(
                        "border",
                        "style",
                        e.target.value
                      )
                    }
                  >
                    <option value="solid">
                      Solid
                    </option>

                    <option value="double">
                      Double
                    </option>

                    <option value="dashed">
                      Dashed
                    </option>

                    <option value="dotted">
                      Dotted
                    </option>
                  </select>

                </div>

                <div className="designer-field">

                  <label>
                    Border Color
                  </label>

                  <div className="color-input">

                    <input
                      type="color"
                      value={
                        design.border
                          ?.color ||
                        "#c89b3c"
                      }
                      onChange={(e) =>
                        updateSection(
                          "border",
                          "color",
                          e.target.value
                        )
                      }
                    />

                    <span>
                      {design.border
                        ?.color ||
                        "#c89b3c"}
                    </span>

                  </div>

                </div>

                <div className="designer-field">

                  <label>
                    Border Width
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={
                      design.border
                        ?.width || 2
                    }
                    onChange={(e) =>
                      updateSection(
                        "border",
                        "width",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="designer-field">

                  <label>
                    Border Radius
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={
                      design.border
                        ?.radius || 20
                    }
                    onChange={(e) =>
                      updateSection(
                        "border",
                        "radius",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

              </div>
            )}

          </div>

          {/* LAYOUT */}

          <div className="designer-section">

            <div className="designer-section-title">
              <Layout size={18} />

              <div>
                <h3>Layout</h3>

                <span>
                  Control invitation size.
                </span>
              </div>
            </div>

            <div className="designer-form-grid">

              <div className="designer-field">

                <label>
                  Width
                </label>

                <input
                  type="number"
                  min="300"
                  max="600"
                  value={
                    design.layout
                      ?.width || 420
                  }
                  onChange={(e) =>
                    updateSection(
                      "layout",
                      "width",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="designer-field">

                <label>
                  Height
                </label>

                <input
                  type="number"
                  min="400"
                  max="900"
                  value={
                    design.layout
                      ?.height || 650
                  }
                  onChange={(e) =>
                    updateSection(
                      "layout",
                      "height",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="designer-field">

                <label>
                  Padding
                </label>

                <input
                  type="number"
                  min="10"
                  max="80"
                  value={
                    design.layout
                      ?.padding || 30
                  }
                  onChange={(e) =>
                    updateSection(
                      "layout",
                      "padding",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="designer-field">

                <label>
                  Content Alignment
                </label>

                <select
                  value={
                    design.layout
                      ?.alignment ||
                    "center"
                  }
                  onChange={(e) =>
                    updateSection(
                      "layout",
                      "alignment",
                      e.target.value
                    )
                  }
                >
                  <option value="left">
                    Left
                  </option>

                  <option value="center">
                    Center
                  </option>

                  <option value="right">
                    Right
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* DECORATION */}

          <div className="designer-section">

            <div className="designer-section-title">
              <Sparkles size={18} />

              <div>
                <h3>
                  Decoration
                </h3>

                <span>
                  Add decorative elements.
                </span>
              </div>
            </div>

            <label className="designer-switch">

              <input
                type="checkbox"
                checked={
                  design.decoration
                    ?.enabled || false
                }
                onChange={(e) =>
                  updateSection(
                    "decoration",
                    "enabled",
                    e.target.checked
                  )
                }
              />

              <span>
                Enable Decoration
              </span>

            </label>

            {design.decoration
              ?.enabled && (
              <div className="designer-field">

                <label>
                  Decoration Type
                </label>

                <select
                  value={
                    design.decoration
                      ?.type ||
                    "floral"
                  }
                  onChange={(e) =>
                    updateSection(
                      "decoration",
                      "type",
                      e.target.value
                    )
                  }
                >
                  <option value="floral">
                    Floral
                  </option>

                  <option value="hearts">
                    Hearts
                  </option>

                  <option value="leaves">
                    Leaves
                  </option>

                  <option value="stars">
                    Stars
                  </option>

                  <option value="confetti">
                    Confetti
                  </option>

                  <option value="none">
                    None
                  </option>
                </select>

              </div>
            )}

          </div>

          {/* RSVP */}

          <div className="designer-section">

            <div className="designer-section-title">
              <MousePointer2 size={18} />

              <div>
                <h3>
                  RSVP Button
                </h3>

                <span>
                  Customize the RSVP button.
                </span>
              </div>
            </div>

            <label className="designer-switch">

              <input
                type="checkbox"
                checked={
                  design.button
                    ?.enabled !== false
                }
                onChange={(e) =>
                  updateSection(
                    "button",
                    "enabled",
                    e.target.checked
                  )
                }
              />

              <span>
                Show RSVP Button
              </span>

            </label>

            {design.button?.enabled !==
              false && (
              <div className="designer-form-grid">

                <div className="designer-field">

                  <label>
                    Button Text
                  </label>

                  <input
                    value={
                      design.button
                        ?.text ||
                      "RSVP"
                    }
                    onChange={(e) =>
                      updateSection(
                        "button",
                        "text",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="designer-field">

                  <label>
                    Button Color
                  </label>

                  <div className="color-input">

                    <input
                      type="color"
                      value={
                        design.button
                          ?.backgroundColor ||
                        "#8b4a62"
                      }
                      onChange={(e) =>
                        updateSection(
                          "button",
                          "backgroundColor",
                          e.target.value
                        )
                      }
                    />

                    <span>
                      {design.button
                        ?.backgroundColor ||
                        "#8b4a62"}
                    </span>

                  </div>

                </div>

                <div className="designer-field">

                  <label>
                    Text Color
                  </label>

                  <div className="color-input">

                    <input
                      type="color"
                      value={
                        design.button
                          ?.textColor ||
                        "#ffffff"
                      }
                      onChange={(e) =>
                        updateSection(
                          "button",
                          "textColor",
                          e.target.value
                        )
                      }
                    />

                    <span>
                      {design.button
                        ?.textColor ||
                        "#ffffff"}
                    </span>

                  </div>

                </div>

                <div className="designer-field">

                  <label>
                    Button Radius
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={
                      design.button
                        ?.radius || 10
                    }
                    onChange={(e) =>
                      updateSection(
                        "button",
                        "radius",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

              </div>
            )}

          </div>

          {/* IMAGE */}

          <div className="designer-section">

            <div className="designer-section-title">
              <Image size={18} />

              <div>
                <h3>Image</h3>

                <span>
                  Add an invitation image.
                </span>
              </div>
            </div>

            <label className="designer-switch">

              <input
                type="checkbox"
                checked={
                  design.image
                    ?.enabled || false
                }
                onChange={(e) =>
                  updateSection(
                    "image",
                    "enabled",
                    e.target.checked
                  )
                }
              />

              <span>
                Show Image
              </span>

            </label>

            {design.image?.enabled && (
              <div className="designer-form-grid">

                <div className="designer-field full">

                  <label>
                    Image URL
                  </label>

                  <input
                    value={
                      design.image
                        ?.url || ""
                    }
                    onChange={(e) =>
                      updateSection(
                        "image",
                        "url",
                        e.target.value
                      )
                    }
                    placeholder="https://..."
                  />

                </div>

                <div className="designer-field">

                  <label>
                    Width
                  </label>

                  <input
                    type="number"
                    min="50"
                    max="400"
                    value={
                      design.image
                        ?.width || 180
                    }
                    onChange={(e) =>
                      updateSection(
                        "image",
                        "width",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="designer-field">

                  <label>
                    Height
                  </label>

                  <input
                    type="number"
                    min="50"
                    max="400"
                    value={
                      design.image
                        ?.height || 180
                    }
                    onChange={(e) =>
                      updateSection(
                        "image",
                        "height",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="designer-field">

                  <label>
                    Radius
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={
                      design.image
                        ?.radius || 50
                    }
                    onChange={(e) =>
                      updateSection(
                        "image",
                        "radius",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="designer-field">

                  <label>
                    Position
                  </label>

                  <select
                    value={
                      design.image
                        ?.position ||
                      "top"
                    }
                    onChange={(e) =>
                      updateSection(
                        "image",
                        "position",
                        e.target.value
                      )
                    }
                  >
                    <option value="top">
                      Top
                    </option>

                    <option value="center">
                      Center
                    </option>

                    <option value="bottom">
                      Bottom
                    </option>
                  </select>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* RIGHT PREVIEW */}

        <div className="designer-preview">

          <div className="preview-sticky">

            <div className="preview-header">

              <div>
                <h3>
                  Live Preview
                </h3>

                <span>
                  Changes appear instantly
                </span>
              </div>

            </div>

            <div className="preview-canvas">

              <DynamicTemplate
  data={previewData}
  design={design}
  fields={fields}
  onRSVP={() => {}}
/>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AdminTemplateDesigner;