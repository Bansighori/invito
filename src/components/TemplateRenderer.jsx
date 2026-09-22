import { FileText } from "lucide-react";

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
import SunsetWedding from "../templates/SunsetWedding";
import VintageWedding from "../templates/VintageWedding";
import BirthdayKids from "../templates/BirthdayKids";
import EngagementGold from "../templates/EngagementGold";
import BabySafari from "../templates/BabySafari";
import CocktailParty from "../templates/CocktailParty";
import GraduationDay from "../templates/GraduationDay";
import PhotoWeddingFloral
  from "../templates/PhotoWeddingFloral";

import PhotoWeddingRomantic
  from "../templates/PhotoWeddingRomantic";

import PhotoWeddingRoyal
  from "../templates/PhotoWeddingRoyal"; 

import InvitationGallery from "./InvitationGallery";


function TemplateRenderer({
  component,
  category,
  data = {},
  onRSVP = () => {},
  enableOpeningAnimation = false
}) {

  const resolvedComponent =
    component ||
    (category === "Wedding"
      ? "WeddingClassic"
      : category === "Birthday"
        ? "BirthdayModern"
        : category === "Engagement"
          ? "EngagementForever"
          : null);


  let invitationComponent;


  switch (resolvedComponent) {

    case "WeddingClassic":
      invitationComponent = (
        <WeddingClassic
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "BirthdayModern":
      invitationComponent = (
        <BirthdayModern
          data={data}
          onRSVP={onRSVP}
          
        />
      );
      break;


    case "EngagementForever":
      invitationComponent = (
        <EngagementForever
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "RoyalWedding":
      invitationComponent = (
        <RoyalWedding
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "GardenWedding":
      invitationComponent = (
        <GardenWedding
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "MinimalWedding":
      invitationComponent = (
        <MinimalWedding
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "BirthdayPop":
      invitationComponent = (
        <BirthdayPop
          data={data}
          onRSVP={onRSVP}
          enableOpeningAnimation={enableOpeningAnimation}
        />
      );
      break;


    case "BirthdayElegant":
      invitationComponent = (
        <BirthdayElegant
          data={data}
          onRSVP={onRSVP}
          enableOpeningAnimation={enableOpeningAnimation}
        />
      );
      break;


    case "BabyBloom":
      invitationComponent = (
        <BabyBloom
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "LittleStar":
      invitationComponent = (
        <LittleStar
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "PartyNight":
      invitationComponent = (
        <PartyNight
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "EngagementRose":
      invitationComponent = (
        <EngagementRose
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "CorporateEvent":
      invitationComponent = (
        <CorporateEvent
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "SunsetWedding":
      invitationComponent = (
        <SunsetWedding
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "VintageWedding":
      invitationComponent = (
        <VintageWedding
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "BirthdayKids":
      invitationComponent = (
        <BirthdayKids
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "EngagementGold":
      invitationComponent = (
        <EngagementGold
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "BabySafari":
      invitationComponent = (
        <BabySafari
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "CocktailParty":
      invitationComponent = (
        <CocktailParty
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;


    case "GraduationDay":
      invitationComponent = (
        <GraduationDay
          data={data}
          onRSVP={onRSVP}
        />
      );
      break;

      case "PhotoWeddingFloral":
  invitationComponent = (
    <PhotoWeddingFloral
      data={data}
      onRSVP={onRSVP}
    />
  );
  break;

case "PhotoWeddingRomantic":
  invitationComponent = (
    <PhotoWeddingRomantic
      data={data}
      onRSVP={onRSVP}
    />
  );
  break;

case "PhotoWeddingRoyal":
  invitationComponent = (
    <PhotoWeddingRoyal
      data={data}
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

        </div>
      );

  }


  return (
    <div className="invitation-renderer">

      {invitationComponent}

      <InvitationGallery
        gallery={data.gallery}
      />

    </div>
  );
}


export default TemplateRenderer;