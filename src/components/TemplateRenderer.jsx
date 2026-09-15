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

function TemplateRenderer({
  component,
  category,
  data = {},
  onRSVP = () => {}
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

  switch (resolvedComponent) {
    case "WeddingClassic":
      return (
        <WeddingClassic
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "BirthdayModern":
      return (
        <BirthdayModern
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "EngagementForever":
      return (
        <EngagementForever
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "RoyalWedding":
      return (
        <RoyalWedding
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "GardenWedding":
      return (
        <GardenWedding
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "MinimalWedding":
      return (
        <MinimalWedding
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "BirthdayPop":
      return (
        <BirthdayPop
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "BirthdayElegant":
      return (
        <BirthdayElegant
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "BabyBloom":
      return (
        <BabyBloom
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "LittleStar":
      return (
        <LittleStar
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "PartyNight":
      return (
        <PartyNight
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "EngagementRose":
      return (
        <EngagementRose
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "CorporateEvent":
      return (
        <CorporateEvent
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "SunsetWedding":
      return (
        <SunsetWedding
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "VintageWedding":
      return (
        <VintageWedding
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "BirthdayKids":
      return (
        <BirthdayKids
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "EngagementGold":
      return (
        <EngagementGold
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "BabySafari":
      return (
        <BabySafari
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "CocktailParty":
      return (
        <CocktailParty
          data={data}
          onRSVP={onRSVP}
        />
      );

    case "GraduationDay":
      return (
        <GraduationDay
          data={data}
          onRSVP={onRSVP}
        />
      );

    default:
      return (
        <div className="invitation-preview-fallback">
          <FileText size={38} />
          <span>Invitation Preview</span>
        </div>
      );
  }
}

export default TemplateRenderer;
