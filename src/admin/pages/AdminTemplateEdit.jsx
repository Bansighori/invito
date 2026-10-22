import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";

import api from "../../api/axios";
import TemplateRenderer from "../../components/TemplateRenderer";

import "./AdminTemplateEdit.css";


function AdminTemplateEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [template, setTemplate] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({});

  const [openSections, setOpenSections] = useState({
    basic: true,
    fields: true,
    background: true,
    typography: true,
    border: false,
    layout: false,
    decoration: false,
    button: false,
    image: false,
    publishing: true
  });


  // ==========================================
  // LOAD TEMPLATE
  // ==========================================

  useEffect(() => {
    loadTemplate();
  }, [id]);


  const loadTemplate = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await api.get(`/admin/templates/${id}`);

      const data =
        response.data.template;

      if (!data) {
        setError("Template not found.");
        return;
      }

      setTemplate(normalizeTemplate(data));

      const initialData = {};

      (data.fields || []).forEach((field) => {

        if (field?.name) {

          initialData[field.name] =
            getPreviewValue(field);

        }

      });

      setFormData(initialData);

    } catch (error) {

      console.error(
        "Load template error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load template"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // NORMALIZE TEMPLATE
  // ==========================================

  const normalizeTemplate = (data) => {

    const design = data.design || {};

    return {

      ...data,

      design: {

        background: {
          type:
            design.background?.type ||
            "solid",

          color:
            design.background?.color ||
            "#ffffff",

          color1:
            design.background?.color1 ||
            "#ffffff",

          color2:
            design.background?.color2 ||
            "#f8e8ef",

          direction:
            design.background?.direction ||
            "135deg",

          image:
            design.background?.image ||
            ""
        },


        typography: {

          titleFont:
            design.typography?.titleFont ||
            "Playfair Display",

          bodyFont:
            design.typography?.bodyFont ||
            "Poppins",

          titleSize:
            design.typography?.titleSize ??
            32,

          bodySize:
            design.typography?.bodySize ??
            16,

          titleColor:
            design.typography?.titleColor ||
            "#8b4a62",

          bodyColor:
            design.typography?.bodyColor ||
            "#555555",

          titleAlignment:
            design.typography?.titleAlignment ||
            "center",

          bodyAlignment:
            design.typography?.bodyAlignment ||
            "center"
        },


        border: {

          enabled:
            Boolean(
              design.border?.enabled
            ),

          style:
            design.border?.style ||
            "solid",

          color:
            design.border?.color ||
            "#c89b3c",

          width:
            design.border?.width ??
            2,

          radius:
            design.border?.radius ??
            20
        },


        layout: {

          width:
            design.layout?.width ??
            420,

          height:
            design.layout?.height ??
            650,

          padding:
            design.layout?.padding ??
            30,

          alignment:
            design.layout?.alignment ||
            "center"
        },


        decoration: {

          enabled:
            Boolean(
              design.decoration?.enabled
            ),

          type:
            design.decoration?.type ||
            "none"
        },


        button: {

          enabled:
            design.button?.enabled !== false,

          text:
            design.button?.text ||
            "RSVP",

          backgroundColor:
            design.button?.backgroundColor ||
            "#8b4a62",

          textColor:
            design.button?.textColor ||
            "#ffffff",

          radius:
            design.button?.radius ??
            10
        },


        image: {

          enabled:
            Boolean(
              design.image?.enabled
            ),

          url:
            design.image?.url ||
            "",

          width:
            design.image?.width ??
            180,

          height:
            design.image?.height ??
            180,

          radius:
            design.image?.radius ??
            50,

          position:
            design.image?.position ||
            "top"
        }

      }

    };

  };


  // ==========================================
  // SECTION TOGGLE
  // ==========================================

  const toggleSection = (section) => {

    setOpenSections((prev) => ({

      ...prev,

      [section]:
        !prev[section]

    }));

  };


  // ==========================================
  // UPDATE ROOT
  // ==========================================

  const updateRoot = (
    field,
    value
  ) => {

    setTemplate((prev) => ({

      ...prev,

      [field]: value

    }));

  };


  // ==========================================
  // UPDATE DESIGN
  // ==========================================

  const updateDesign = (
    section,
    field,
    value
  ) => {

    setTemplate((prev) => ({

      ...prev,

      design: {

        ...(prev.design || {}),

        [section]: {

          ...(prev.design?.[section] || {}),

          [field]: value

        }

      }

    }));

  };


  // ==========================================
  // ADD FIELD
  // ==========================================

  const addField = () => {

    const newField = {

      name:
        `field_${Date.now()}`,

      label:
        "New Field",

      type:
        "text",

      required:
        false

    };


    setTemplate((prev) => ({

      ...prev,

      fields: [

        ...(prev.fields || []),

        newField

      ]

    }));


    setFormData((prev) => ({

      ...prev,

      [newField.name]:
        "Sample Value"

    }));

  };


  // ==========================================
  // UPDATE FIELD
  // ==========================================

  const updateField = (
    index,
    key,
    value
  ) => {

    setTemplate((prev) => {

      const fields =
        [...(prev.fields || [])];

      const oldName =
        fields[index]?.name;

      fields[index] = {

        ...fields[index],

        [key]: value

      };


      return {

        ...prev,

        fields

      };

    });


    if (key === "name") {

      setFormData((prev) => {

        const updated = {
          ...prev
        };

        const oldValue =
          updated[
            template.fields[index]?.name
          ] || "";

        delete updated[
          template.fields[index]?.name
        ];

        updated[value] =
          oldValue;

        return updated;

      });

    }

  };


  // ==========================================
  // DELETE FIELD
  // ==========================================

  const deleteField = (index) => {

    setTemplate((prev) => {

      const removed =
        prev.fields?.[index];

      const fields =
        (prev.fields || [])
          .filter(
            (_, i) => i !== index
          );


      setFormData((prevData) => {

        const updated = {
          ...prevData
        };

        if (removed?.name) {

          delete updated[
            removed.name
          ];

        }

        return updated;

      });


      return {

        ...prev,

        fields

      };

    });

  };


  // ==========================================
  // SAVE
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);
      setError("");
      setSuccess("");


      const plan =
        template.isPremiumPlus
          ? "premium_plus"
          : template.isPremium
          ? "premium"
          : "free";


      const payload = {

        name:
          template.title,

        description:
          template.description || "",

        category:
          template.category,

        type:
          template.type || "Modern",

        component:
          template.component,

        fields:
          template.fields || [],

        design:
          template.design || {},

        plan,

        status:
          template.status ||
          "published",

        featured:
          Boolean(
            template.featured
          ),

        displayOrder:
          Number(
            template.displayOrder || 1
          ),

        isActive:
          template.isActive !== false

      };


      const response =
        await api.put(
          `/admin/templates/${id}`,
          payload
        );


      setTemplate(
        normalizeTemplate(
          response.data.template
        )
      );


      setSuccess(
        "Template updated successfully."
      );


      setTimeout(() => {

        navigate(
          "/admin/templates"
        );

      }, 1000);


    } catch (error) {

      console.error(
        "Update template error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to update template"
      );

    } finally {

      setSaving(false);

    }

  };


  // ==========================================
  // PREVIEW DATA
  // ==========================================

  const createUniversalPreviewData = (
    template,
    formData = {}
  ) => {

    const fields =
      template.fields || [];

    const data = {};


    fields.forEach((field) => {

      if (!field?.name) {
        return;
      }

      const name =
        field.name;

      if (
        formData[name] !==
          undefined &&
        formData[name] !== ""
      ) {

        data[name] =
          formData[name];

        return;

      }


      data[name] =
        getPreviewValue(field);

    });


    const category =
      (
        template.category ||
        ""
      ).toLowerCase();


    const isBirthday =
      category.includes(
        "birthday"
      );


    const isWedding =
      category.includes(
        "wedding"
      );


    const isEngagement =
      category.includes(
        "engagement"
      );


    return {

      ...data,

      title:
        template.title ||
        "Invitation",


      name:
        data.name ||
        (
          isBirthday
            ? "Birthday Person"
            : isWedding ||
              isEngagement
            ? "William & Sophia"
            : "Event Guest"
        ),


      personName:
        data.personName ||
        (
          isBirthday
            ? "Birthday Person"
            : "William & Sophia"
        ),


      birthdayPerson:
        data.birthdayPerson ||
        "Birthday Person",


      hostName:
        data.hostName ||
        "William",


      guestName:
        data.guestName ||
        "Sophia",


      brideName:
        data.brideName ||
        "William",


      groomName:
        data.groomName ||
        "Sophia",


      date:
        data.date ||
        "20 December 2026",


      birthdayDate:
        data.birthdayDate ||
        "20 December 2026",


      time:
        data.time ||
        "6:00 PM",


      partyTime:
        data.partyTime ||
        "6:00 PM",


      venue:
        data.venue ||
        "Beautiful Celebration Venue",


      address:
        data.address ||
        "Surat, Gujarat",


      location:
        data.location ||
        "Surat, Gujarat",


      message:
        data.message ||
        "Join us for a beautiful celebration...",


      couplePhoto:
        data.couplePhoto ||
        "",


      photo:
        data.photo ||
        "",


      image:
        data.image ||
        "",


      rsvp:
        true,


      rsvpText:
        template.design?.button?.text ||
        "RSVP",


      gallery:
        data.gallery ||
        []

    };

  };


  // ==========================================
  // PREVIEW VALUE
  // ==========================================

  function getPreviewValue(field) {

    const name =
      (
        field.name ||
        ""
      ).toLowerCase();


    if (
      name.includes("birthday") &&
      name.includes("person")
    ) {

      return "Birthday Person";

    }


    if (
      name.includes("bride")
    ) {

      return "William";

    }


    if (
      name.includes("groom")
    ) {

      return "Sophia";

    }


    if (
      name.includes("person") ||
      name.includes("name") ||
      name.includes("host") ||
      name.includes("guest")
    ) {

      return "William & Sophia";

    }


    if (
      name.includes("date")
    ) {

      return "20 December 2026";

    }


    if (
      name.includes("time")
    ) {

      return "6:00 PM";

    }


    if (
      name.includes("venue") ||
      name.includes("location")
    ) {

      return "Beautiful Celebration Venue";

    }


    if (
      name.includes("address")
    ) {

      return "Surat, Gujarat";

    }


    if (
      name.includes("message") ||
      name.includes("description")
    ) {

      return "Join us for a beautiful celebration...";

    }


    if (
      name.includes("photo") ||
      name.includes("image")
    ) {

      return "";

    }


    if (
      field.type === "number"
    ) {

      return "10";

    }


    return (
      field.label ||
      "Sample Value"
    );

  }


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="admin-template-edit-loading">

        Loading template...

      </div>

    );

  }


  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!template) {

    return (

      <div className="admin-template-edit-error">

        <h2>
          Template not found
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/admin/templates"
            )
          }
        >
          Back to Templates
        </button>

      </div>

    );

  }


  const design =
    template.design || {};

  const background =
    design.background || {};

  const typography =
    design.typography || {};

  const border =
    design.border || {};

  const layout =
    design.layout || {};

  const decoration =
    design.decoration || {};

  const button =
    design.button || {};

  const image =
    design.image || {};


  const previewData =
    createUniversalPreviewData(
      template,
      formData
    );


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="admin-template-editor">

      {/* HEADER */}

      <div className="admin-editor-header">

        <button
          type="button"
          className="admin-editor-back"
          onClick={() =>
            navigate(
              "/admin/templates"
            )
          }
        >

          <ArrowLeft size={17} />

          Back to Templates

        </button>


        <div className="admin-editor-title">

          <p>
            TEMPLATE MANAGEMENT
          </p>

          <h1>
            Edit Template
          </h1>

          <span>
            Customize the real invitation
            template and see changes live.
          </span>

        </div>

      </div>


      {/* MESSAGES */}

      {error && (

        <div className="admin-editor-error">
          {error}
        </div>

      )}


      {success && (

        <div className="admin-editor-success">
          {success}
        </div>

      )}


      <form
        className="admin-editor-layout"
        onSubmit={handleSubmit}
      >

        {/* ====================================
            LEFT
        ==================================== */}

        <div className="admin-editor-panel">


          {/* BASIC */}

          <EditorSection
            title="Basic Information"
            icon="📋"
            open={openSections.basic}
            onClick={() =>
              toggleSection("basic")
            }
          >

            <Field label="Template Name">

              <input
                value={
                  template.title || ""
                }
                onChange={(e) =>
                  updateRoot(
                    "title",
                    e.target.value
                  )
                }
                required
              />

            </Field>


            <Field label="Description">

              <textarea
                rows="4"
                value={
                  template.description ||
                  ""
                }
                onChange={(e) =>
                  updateRoot(
                    "description",
                    e.target.value
                  )
                }
              />

            </Field>


            <Field label="Category">

              <select
                value={
                  template.category || ""
                }
                onChange={(e) =>
                  updateRoot(
                    "category",
                    e.target.value
                  )
                }
              >

                <option value="Wedding">
                  Wedding
                </option>

                <option value="Birthday">
                  Birthday
                </option>

                <option value="Engagement">
                  Engagement
                </option>

                <option value="Baby Shower">
                  Baby Shower
                </option>

                <option value="Party">
                  Party
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </Field>


            <Field label="Template Type">

              <input
                value={
                  template.type || ""
                }
                onChange={(e) =>
                  updateRoot(
                    "type",
                    e.target.value
                  )
                }
              />

            </Field>


            <Field label="React Component">

              <input
                value={
                  template.component || ""
                }
                onChange={(e) =>
                  updateRoot(
                    "component",
                    e.target.value
                  )
                }
              />

            </Field>

          </EditorSection>


          {/* FIELDS */}

          <EditorSection
            title="Template Fields"
            icon="🧩"
            open={openSections.fields}
            onClick={() =>
              toggleSection("fields")
            }
          >

            <div className="field-section-top">

              <p>
                Fields available to users
                while customizing this
                template.
              </p>

              <button
                type="button"
                className="add-field-btn"
                onClick={addField}
              >

                <Plus size={15} />

                Add Field

              </button>

            </div>


            {(template.fields || []).map(
              (field, index) => (

                <div
                  className="template-field-card"
                  key={
                    field.name ||
                    index
                  }
                >

                  <div className="field-card-header">

                    <strong>
                      {field.label}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        deleteField(index)
                      }
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>


                  <Field label="Field Name">

                    <input
                      value={
                        field.name || ""
                      }
                      onChange={(e) =>
                        updateField(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                    />

                  </Field>


                  <Field label="Label">

                    <input
                      value={
                        field.label || ""
                      }
                      onChange={(e) =>
                        updateField(
                          index,
                          "label",
                          e.target.value
                        )
                      }
                    />

                  </Field>


                  <Field label="Type">

                    <select
                      value={
                        field.type ||
                        "text"
                      }
                      onChange={(e) =>
                        updateField(
                          index,
                          "type",
                          e.target.value
                        )
                      }
                    >

                      <option value="text">
                        Text
                      </option>

                      <option value="date">
                        Date
                      </option>

                      <option value="time">
                        Time
                      </option>

                      <option value="number">
                        Number
                      </option>

                      <option value="image">
                        Image
                      </option>

                    </select>

                  </Field>


                  <Field label="Preview Value">

                    <input
                      type={
                        field.type === "date"
                          ? "date"
                          : field.type ===
                            "number"
                          ? "number"
                          : "text"
                      }
                      value={
                        formData[
                          field.name
                        ] || ""
                      }
                      onChange={(e) =>
                        setFormData(
                          (prev) => ({

                            ...prev,

                            [field.name]:
                              e.target.value

                          })
                        )
                      }
                    />

                  </Field>


                  <Checkbox
                    label="Required field"
                    checked={
                      Boolean(
                        field.required
                      )
                    }
                    onChange={(value) =>
                      updateField(
                        index,
                        "required",
                        value
                      )
                    }
                  />

                </div>

              )
            )}


            {(
              !template.fields ||
              template.fields.length === 0
            ) && (

              <div className="empty-fields">
                No fields added.
              </div>

            )}

          </EditorSection>


          {/* BACKGROUND */}

          <EditorSection
            title="Background"
            icon="🎨"
            open={
              openSections.background
            }
            onClick={() =>
              toggleSection(
                "background"
              )
            }
          >

            <Field label="Background Type">

              <select
                value={
                  background.type ||
                  "solid"
                }
                onChange={(e) =>
                  updateDesign(
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
                  Background Image
                </option>

              </select>

            </Field>


            {background.type ===
              "solid" && (

              <Field label="Background Color">

                <div className="color-input-row">

                  <input
                    type="color"
                    value={
                      background.color ||
                      "#ffffff"
                    }
                    onChange={(e) =>
                      updateDesign(
                        "background",
                        "color",
                        e.target.value
                      )
                    }
                  />

                  <span>
                    {
                      background.color ||
                      "#ffffff"
                    }
                  </span>

                </div>

              </Field>

            )}


            {background.type ===
              "gradient" && (

              <>

                <Field label="Gradient Color 1">

                  <div className="color-input-row">

                    <input
                      type="color"
                      value={
                        background.color1 ||
                        "#ffffff"
                      }
                      onChange={(e) =>
                        updateDesign(
                          "background",
                          "color1",
                          e.target.value
                        )
                      }
                    />

                    <span>
                      {
                        background.color1 ||
                        "#ffffff"
                      }
                    </span>

                  </div>

                </Field>


                <Field label="Gradient Color 2">

                  <div className="color-input-row">

                    <input
                      type="color"
                      value={
                        background.color2 ||
                        "#f8e8ef"
                      }
                      onChange={(e) =>
                        updateDesign(
                          "background",
                          "color2",
                          e.target.value
                        )
                      }
                    />

                    <span>
                      {
                        background.color2 ||
                        "#f8e8ef"
                      }
                    </span>

                  </div>

                </Field>


                <Field label="Gradient Direction">

                  <select
                    value={
                      background.direction ||
                      "135deg"
                    }
                    onChange={(e) =>
                      updateDesign(
                        "background",
                        "direction",
                        e.target.value
                      )
                    }
                  >

                    <option value="0deg">
                      Top → Bottom
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

                    <option value="270deg">
                      Right → Left
                    </option>

                  </select>

                </Field>

              </>

            )}


            {background.type ===
              "image" && (

              <Field label="Background Image URL">

                <input
                  value={
                    background.image ||
                    ""
                  }
                  onChange={(e) =>
                    updateDesign(
                      "background",
                      "image",
                      e.target.value
                    )
                  }
                  placeholder="https://..."
                />

              </Field>

            )}

          </EditorSection>


          {/* TYPOGRAPHY */}

          <EditorSection
            title="Typography"
            icon="🔤"
            open={
              openSections.typography
            }
            onClick={() =>
              toggleSection(
                "typography"
              )
            }
          >

            <Field label="Title Font">

              <select
                value={
                  typography.titleFont ||
                  "Playfair Display"
                }
                onChange={(e) =>
                  updateDesign(
                    "typography",
                    "titleFont",
                    e.target.value
                  )
                }
              >

                <FontOptions />

              </select>

            </Field>


            <Field label="Body Font">

              <select
                value={
                  typography.bodyFont ||
                  "Poppins"
                }
                onChange={(e) =>
                  updateDesign(
                    "typography",
                    "bodyFont",
                    e.target.value
                  )
                }
              >

                <FontOptions />

              </select>

            </Field>


            <div className="editor-two-columns">

              <Field label="Title Size">

                <input
                  type="number"
                  min="10"
                  max="100"
                  value={
                    typography.titleSize ??
                    32
                  }
                  onChange={(e) =>
                    updateDesign(
                      "typography",
                      "titleSize",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </Field>


              <Field label="Body Size">

                <input
                  type="number"
                  min="8"
                  max="50"
                  value={
                    typography.bodySize ??
                    16
                  }
                  onChange={(e) =>
                    updateDesign(
                      "typography",
                      "bodySize",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </Field>

            </div>


            <div className="editor-two-columns">

              <Field label="Title Color">

                <input
                  type="color"
                  value={
                    typography.titleColor ||
                    "#8b4a62"
                  }
                  onChange={(e) =>
                    updateDesign(
                      "typography",
                      "titleColor",
                      e.target.value
                    )
                  }
                />

              </Field>


              <Field label="Body Color">

                <input
                  type="color"
                  value={
                    typography.bodyColor ||
                    "#555555"
                  }
                  onChange={(e) =>
                    updateDesign(
                      "typography",
                      "bodyColor",
                      e.target.value
                    )
                  }
                />

              </Field>

            </div>


            <div className="editor-two-columns">

              <Field label="Title Alignment">

                <select
                  value={
                    typography.titleAlignment ||
                    "center"
                  }
                  onChange={(e) =>
                    updateDesign(
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

              </Field>


              <Field label="Body Alignment">

                <select
                  value={
                    typography.bodyAlignment ||
                    "center"
                  }
                  onChange={(e) =>
                    updateDesign(
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

              </Field>

            </div>

          </EditorSection>


          {/* BORDER */}

          <EditorSection
            title="Border"
            icon="▣"
            open={
              openSections.border
            }
            onClick={() =>
              toggleSection("border")
            }
          >

            <Checkbox
              label="Enable Border"
              checked={
                Boolean(
                  border.enabled
                )
              }
              onChange={(value) =>
                updateDesign(
                  "border",
                  "enabled",
                  value
                )
              }
            />


            <Field label="Border Style">

              <select
                value={
                  border.style ||
                  "solid"
                }
                onChange={(e) =>
                  updateDesign(
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

                <option value="none">
                  None
                </option>

              </select>

            </Field>


            <Field label="Border Color">

              <input
                type="color"
                value={
                  border.color ||
                  "#c89b3c"
                }
                onChange={(e) =>
                  updateDesign(
                    "border",
                    "color",
                    e.target.value
                  )
                }
              />

            </Field>


            <div className="editor-two-columns">

              <Field label="Border Width">

                <input
                  type="number"
                  min="0"
                  max="30"
                  value={
                    border.width ??
                    2
                  }
                  onChange={(e) =>
                    updateDesign(
                      "border",
                      "width",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </Field>


              <Field label="Border Radius">

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={
                    border.radius ??
                    20
                  }
                  onChange={(e) =>
                    updateDesign(
                      "border",
                      "radius",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </Field>

            </div>

          </EditorSection>


          {/* LAYOUT */}

          <EditorSection
            title="Layout"
            icon="▤"
            open={
              openSections.layout
            }
            onClick={() =>
              toggleSection("layout")
            }
          >

            <div className="editor-two-columns">

              <Field label="Width">

                <input
                  type="number"
                  min="280"
                  max="900"
                  value={
                    layout.width ??
                    420
                  }
                  onChange={(e) =>
                    updateDesign(
                      "layout",
                      "width",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </Field>


              <Field label="Height">

                <input
                  type="number"
                  min="400"
                  max="1400"
                  value={
                    layout.height ??
                    650
                  }
                  onChange={(e) =>
                    updateDesign(
                      "layout",
                      "height",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </Field>

            </div>


            <Field label="Padding">

              <input
                type="number"
                min="0"
                max="100"
                value={
                  layout.padding ??
                  30
                }
                onChange={(e) =>
                  updateDesign(
                    "layout",
                    "padding",
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            </Field>


            <Field label="Alignment">

              <select
                value={
                  layout.alignment ||
                  "center"
                }
                onChange={(e) =>
                  updateDesign(
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

            </Field>

          </EditorSection>


          {/* DECORATION */}

          <EditorSection
            title="Decoration"
            icon="✨"
            open={
              openSections.decoration
            }
            onClick={() =>
              toggleSection(
                "decoration"
              )
            }
          >

            <Checkbox
              label="Enable Decoration"
              checked={
                Boolean(
                  decoration.enabled
                )
              }
              onChange={(value) =>
                updateDesign(
                  "decoration",
                  "enabled",
                  value
                )
              }
            />


            <Field label="Decoration Type">

              <select
                value={
                  decoration.type ||
                  "none"
                }
                onChange={(e) =>
                  updateDesign(
                    "decoration",
                    "type",
                    e.target.value
                  )
                }
              >

                <option value="none">
                  None
                </option>

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

              </select>

            </Field>

          </EditorSection>


          {/* RSVP */}

          <EditorSection
            title="RSVP Button"
            icon="🔘"
            open={
              openSections.button
            }
            onClick={() =>
              toggleSection("button")
            }
          >

            <Checkbox
              label="Enable RSVP Button"
              checked={
                button.enabled !== false
              }
              onChange={(value) =>
                updateDesign(
                  "button",
                  "enabled",
                  value
                )
              }
            />


            <Field label="Button Text">

              <input
                value={
                  button.text ||
                  "RSVP"
                }
                onChange={(e) =>
                  updateDesign(
                    "button",
                    "text",
                    e.target.value
                  )
                }
              />

            </Field>


            <Field label="Button Background">

              <input
                type="color"
                value={
                  button.backgroundColor ||
                  "#8b4a62"
                }
                onChange={(e) =>
                  updateDesign(
                    "button",
                    "backgroundColor",
                    e.target.value
                  )
                }
              />

            </Field>


            <Field label="Button Text Color">

              <input
                type="color"
                value={
                  button.textColor ||
                  "#ffffff"
                }
                onChange={(e) =>
                  updateDesign(
                    "button",
                    "textColor",
                    e.target.value
                  )
                }
              />

            </Field>


            <Field label="Button Radius">

              <input
                type="number"
                min="0"
                max="100"
                value={
                  button.radius ??
                  10
                }
                onChange={(e) =>
                  updateDesign(
                    "button",
                    "radius",
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            </Field>

          </EditorSection>


          {/* IMAGE */}

          <EditorSection
            title="Template Image"
            icon="🖼️"
            open={
              openSections.image
            }
            onClick={() =>
              toggleSection("image")
            }
          >

            <Checkbox
              label="Enable Image"
              checked={
                Boolean(
                  image.enabled
                )
              }
              onChange={(value) =>
                updateDesign(
                  "image",
                  "enabled",
                  value
                )
              }
            />


            <Field label="Image URL">

              <input
                value={
                  image.url || ""
                }
                onChange={(e) =>
                  updateDesign(
                    "image",
                    "url",
                    e.target.value
                  )
                }
                placeholder="https://..."
              />

            </Field>


            <div className="editor-two-columns">

              <Field label="Width">

                <input
                  type="number"
                  value={
                    image.width ??
                    180
                  }
                  onChange={(e) =>
                    updateDesign(
                      "image",
                      "width",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </Field>


              <Field label="Height">

                <input
                  type="number"
                  value={
                    image.height ??
                    180
                  }
                  onChange={(e) =>
                    updateDesign(
                      "image",
                      "height",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </Field>

            </div>


            <Field label="Radius">

              <input
                type="number"
                min="0"
                max="100"
                value={
                  image.radius ??
                  50
                }
                onChange={(e) =>
                  updateDesign(
                    "image",
                    "radius",
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            </Field>


            <Field label="Position">

              <select
                value={
                  image.position ||
                  "top"
                }
                onChange={(e) =>
                  updateDesign(
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

            </Field>

          </EditorSection>


          {/* PUBLISHING */}

          <EditorSection
            title="Publishing & Access"
            icon="⚙️"
            open={
              openSections.publishing
            }
            onClick={() =>
              toggleSection(
                "publishing"
              )
            }
          >

            <Field label="Plan">

              <select
                value={
                  template.isPremiumPlus
                    ? "premium_plus"
                    : template.isPremium
                    ? "premium"
                    : "free"
                }
                onChange={(e) => {

                  const value =
                    e.target.value;

                  setTemplate(
                    (prev) => ({

                      ...prev,

                      isPremium:
                        value !==
                        "free",

                      isPremiumPlus:
                        value ===
                        "premium_plus"

                    })
                  );

                }}
              >

                <option value="free">
                  Free
                </option>

                <option value="premium">
                  Premium
                </option>

                <option value="premium_plus">
                  Premium Plus
                </option>

              </select>

            </Field>


            <Field label="Status">

              <select
                value={
                  template.status ||
                  "published"
                }
                onChange={(e) =>
                  updateRoot(
                    "status",
                    e.target.value
                  )
                }
              >

                <option value="published">
                  Published
                </option>

                <option value="draft">
                  Draft
                </option>

              </select>

            </Field>


            <Field label="Display Order">

              <input
                type="number"
                min="1"
                value={
                  template.displayOrder ??
                  1
                }
                onChange={(e) =>
                  updateRoot(
                    "displayOrder",
                    Number(
                      e.target.value
                    )
                  )
                }
              />

            </Field>


            <Checkbox
              label="Featured Template"
              checked={
                Boolean(
                  template.featured
                )
              }
              onChange={(value) =>
                updateRoot(
                  "featured",
                  value
                )
              }
            />


            <Checkbox
              label="Active Template"
              checked={
                template.isActive !==
                false
              }
              onChange={(value) =>
                updateRoot(
                  "isActive",
                  value
                )
              }
            />

          </EditorSection>


          {/* SAVE */}

          <button
            type="submit"
            className="admin-editor-save"
            disabled={saving}
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Complete Template"}

          </button>

        </div>


        {/* ====================================
            RIGHT PREVIEW
        ==================================== */}

        <div className="admin-editor-preview-panel">

          <div className="admin-editor-preview-header">

            <div>

              <span>
                LIVE PREVIEW
              </span>

              <h2>
                {template.title}
              </h2>

            </div>

            <Eye size={19} />

          </div>


          <div className="admin-editor-preview">

            <div className="admin-real-template-preview">

              <TemplateRenderer
  key={JSON.stringify(template.design?.button || {})}
  component={template.component}
  category={template.category}
  data={previewData}
  design={template.design || {}}
  fields={template.fields || []}
  onRSVP={() => {
    alert("RSVP preview button is working!");
  }}
  enableOpeningAnimation={false}
/>

            </div>

          </div>

        </div>

      </form>

    </div>

  );

}


// ==========================================
// FONT OPTIONS
// ==========================================

function FontOptions() {

  const fonts = [

    "Poppins",
    "Montserrat",
    "Roboto",
    "Open Sans",
    "Lato",
    "Nunito",
    "Playfair Display",
    "Merriweather",
    "Lora",
    "Dancing Script",
    "Great Vibes",
    "Cinzel",
    "Cormorant Garamond",
    "Arial",
    "Georgia"

  ];


  return (

    <>

      {fonts.map((font) => (

        <option
          key={font}
          value={font}
        >
          {font}
        </option>

      ))}

    </>

  );

}


// ==========================================
// SECTION
// ==========================================

function EditorSection({
  title,
  icon,
  open,
  onClick,
  children
}) {

  return (

    <div className="admin-editor-section">

      <button
        type="button"
        className="admin-editor-section-header"
        onClick={onClick}
      >

        <div>

          <span>
            {icon}
          </span>

          <strong>
            {title}
          </strong>

        </div>

        {open
          ? <ChevronUp size={18} />
          : <ChevronDown size={18} />
        }

      </button>


      {open && (

        <div className="admin-editor-section-body">

          {children}

        </div>

      )}

    </div>

  );

}


// ==========================================
// FIELD
// ==========================================

function Field({
  label,
  children
}) {

  return (

    <div className="admin-editor-field">

      <label>
        {label}
      </label>

      {children}

    </div>

  );

}


// ==========================================
// CHECKBOX
// ==========================================

function Checkbox({
  label,
  checked,
  onChange
}) {

  return (

    <label className="admin-editor-checkbox">

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(
            e.target.checked
          )
        }
      />

      <span>
        {label}
      </span>

    </label>

  );

}


export default AdminTemplateEdit;