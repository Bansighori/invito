import { FileText } from "lucide-react";

import WeddingClassic from "../templates/WeddingClassic";
import BirthdayModern from "../templates/BirthdayModern";
import EngagementForever from "../templates/EngagementForever";
import RoyalWedding from "../templates/RoyalWedding";
import GardenWedding from "../templates/GardenWedding";
import MinimalWedding from "../templates/MinimalWedding";
import BirthdayPop from "../templates/BirthdayPop";
import BirthdayElegant from "../templates/BirthdayElegant";
import BirthdayPhotoPremiumPlus
  from "../templates/BirthdayPhotoPremiumPlus";
import BabyBloom from "../templates/BabyBloom";
import LittleStar from "../templates/LittleStar";
import PartyNight from "../templates/PartyNight";
import EngagementRose from "../templates/EngagementRose";
import CorporateEvent from "../templates/CorporateEvent";
import SunsetWedding from "../templates/SunsetWedding";
import VintageWedding from "../templates/VintageWedding";
import BirthdayKids from "../templates/BirthdayKids";
import EngagementGold from "../templates/EngagementGold";
import BabySafari from "../templates/BabySafari";
import CocktailParty from "../templates/CocktailParty";
import GraduationDay from "../templates/GraduationDay";

import PhotoWeddingFloral from "../templates/PhotoWeddingFloral";
import PhotoWeddingRomantic from "../templates/PhotoWeddingRomantic";
import PhotoWeddingRoyal from "../templates/PhotoWeddingRoyal";

import DynamicTemplate from "../templates/DynamicTemplate";

import InvitationGallery from "./InvitationGallery";

import "./TemplateRenderer.css";


function getDesignStyle(design = {}) {

  const background =
    design.background || {};

  const typography =
    design.typography || {};

  const border =
    design.border || {};

  const layout =
    design.layout || {};

  const button =
    design.button || {};

  const image =
    design.image || {};


  let backgroundValue =
    background.color ||
    "#ffffff";


  // SOLID

  if (
    background.type === "solid"
  ) {

    backgroundValue =
      background.color ||
      "#ffffff";

  }


  // GRADIENT

  if (
    background.type === "gradient"
  ) {

    backgroundValue =
      `linear-gradient(
        ${background.direction || "135deg"},
        ${background.color1 || "#ffffff"},
        ${background.color2 || "#f8e8ef"}
      )`;

  }


  // IMAGE

  if (
    background.type === "image" &&
    background.image
  ) {

    backgroundValue =
      `url("${background.image}") center / cover no-repeat`;

  }


  return {

    "--template-background":
      backgroundValue,

    "--template-title-font":
      typography.titleFont ||
      "Playfair Display",

    "--template-body-font":
      typography.bodyFont ||
      "Poppins",

    "--template-title-size":
      `${typography.titleSize ?? 32}px`,

    "--template-body-size":
      `${typography.bodySize ?? 16}px`,

    "--template-title-color":
      typography.titleColor ||
      "#8b4a62",

    "--template-body-color":
      typography.bodyColor ||
      "#555555",

    "--template-title-align":
      typography.titleAlignment ||
      "center",

    "--template-body-align":
      typography.bodyAlignment ||
      "center",

    "--template-border":
      border.enabled &&
      border.style !== "none"
        ? `${border.width ?? 2}px ${
            border.style || "solid"
          } ${
            border.color || "#c89b3c"
          }`
        : "none",

    "--template-radius":
      `${border.radius ?? 20}px`,

    "--template-padding":
      `${layout.padding ?? 30}px`,

    "--template-width":
      `${layout.width ?? 420}px`,

    "--template-height":
      `${layout.height ?? 650}px`,

    "--template-align":
      layout.alignment ||
      "center",

    "--template-button-bg":
      button.backgroundColor ||
      "#8b4a62",

    "--template-button-color":
      button.textColor ||
      "#ffffff",

    "--template-button-radius":
      `${button.radius ?? 10}px`,

    "--template-image-width":
      `${image.width ?? 180}px`,

    "--template-image-height":
      `${image.height ?? 180}px`,

    "--template-image-radius":
      `${image.radius ?? 50}%`,

    width:
      "100%",

    maxWidth:
      "100%",

    boxSizing:
      "border-box"

  };

}


function TemplateRenderer({
  component,
  category,
  data = {},
  design = {},
  fields = [],
  onRSVP = () => {},
  enableOpeningAnimation = false
}) {


  const resolvedComponent =
    component ||
    (
      category === "Wedding"
        ? "WeddingClassic"
        : category === "Birthday"
        ? "BirthdayModern"
        : category === "Engagement"
        ? "EngagementForever"
        : null
    );


  let invitationComponent;


  switch (resolvedComponent) {


    case "WeddingClassic":

      invitationComponent = (
        <WeddingClassic
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "BirthdayModern":

      invitationComponent = (
        <BirthdayModern
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "EngagementForever":

      invitationComponent = (
        <EngagementForever
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "RoyalWedding":

      invitationComponent = (
        <RoyalWedding
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "GardenWedding":

      invitationComponent = (
        <GardenWedding
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "MinimalWedding":

      invitationComponent = (
        <MinimalWedding
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "BirthdayPop":

      invitationComponent = (
        <BirthdayPop
          data={data}
          design={design}
          onRSVP={onRSVP}
          enableOpeningAnimation={
            enableOpeningAnimation
          }
        />
      );

      break;


    case "BirthdayElegant":

      invitationComponent = (
        <BirthdayElegant
          data={data}
          design={design}
          onRSVP={onRSVP}
          enableOpeningAnimation={
            enableOpeningAnimation
          }
        />
      );

      break;

    case "BirthdayPhotoPremiumPlus":
  invitationComponent = (
    <BirthdayPhotoPremiumPlus
      data={data}
      design={design}
      onRSVP={onRSVP}
    />
  );
  break;


    case "BabyBloom":

      invitationComponent = (
        <BabyBloom
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "LittleStar":

      invitationComponent = (
        <LittleStar
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "PartyNight":

      invitationComponent = (
        <PartyNight
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "EngagementRose":

      invitationComponent = (
        <EngagementRose
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "CorporateEvent":

      invitationComponent = (
        <CorporateEvent
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "SunsetWedding":

      invitationComponent = (
        <SunsetWedding
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "VintageWedding":

      invitationComponent = (
        <VintageWedding
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "BirthdayKids":

      invitationComponent = (
        <BirthdayKids
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "EngagementGold":

      invitationComponent = (
        <EngagementGold
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "BabySafari":

      invitationComponent = (
        <BabySafari
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "CocktailParty":

      invitationComponent = (
        <CocktailParty
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "GraduationDay":

      invitationComponent = (
        <GraduationDay
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "PhotoWeddingFloral":

      invitationComponent = (
        <PhotoWeddingFloral
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "PhotoWeddingRomantic":

      invitationComponent = (
        <PhotoWeddingRomantic
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "PhotoWeddingRoyal":

      invitationComponent = (
        <PhotoWeddingRoyal
          data={data}
          design={design}
          onRSVP={onRSVP}
        />
      );

      break;


    case "DynamicTemplate":

      invitationComponent = (
        <DynamicTemplate
          data={data}
          design={design}
          fields={fields}
          onRSVP={onRSVP}
        />
      );

      break;


    default:

      return (

        <div className="invitation-preview-fallback">

          <FileText size={38} />

          <span>
            Invitation Preview
          </span>

          <small>
            Template component "
            {resolvedComponent}"
            was not found.
          </small>

        </div>

      );

  }


  return (

    <div
      className="template-design-wrapper"
      style={getDesignStyle(design)}
    >

      <div className="template-design-surface">

        {invitationComponent}

      </div>


      <InvitationGallery
        gallery={
          data.gallery || []
        }
      />

    </div>

  );

}


export default TemplateRenderer;