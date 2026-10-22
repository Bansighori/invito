import React from "react";
import { MapPin, CalendarDays, Clock } from "lucide-react";
import "./BirthdayPhotoPremiumPlus.css";

export default function BirthdayPhotoPremiumPlus({
  data = {},
  design = {},
  onRSVP = () => {},
}) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        locationText
      )}`
    : null;

  return (
    <div className="birthday-photo-premium">
      <div className="birthday-photo-decoration decoration-top">✦ ❀ ✦</div>

      <p className="birthday-photo-subtitle">
        YOU ARE INVITED TO CELEBRATE
      </p>

      <div className="birthday-photo-heading">
        <span>HAPPY</span>
        <h1>BIRTHDAY</h1>
        <span className="birthday-photo-stars">✦ ✧ ✦</span>
      </div>

      <div className="birthday-photo-frame">
        {data.birthdayPhoto || data.photo ? (
          <img
            src={data.birthdayPhoto || data.photo}
            alt="Birthday person"
          />
        ) : (
          <div className="birthday-photo-placeholder">
            <span>📸</span>
            <p>Your Photo Here</p>
          </div>
        )}
      </div>

      <p className="birthday-photo-intro">A special celebration for</p>

      <h2 className="birthday-photo-name">
        {data.birthdayPerson || data.name || "Your Name"}
      </h2>

      <div className="birthday-photo-age">
        {data.age ? `Turning ${data.age}` : "A Special Birthday"}
      </div>

      <p className="birthday-photo-message">
        {data.message ||
          "Join us for a beautiful day filled with love, laughter and wonderful memories."}
      </p>

      <div className="birthday-photo-details">
        <div className="birthday-photo-detail">
          <CalendarDays size={20} />
          <span>DATE</span>
          <strong>{data.birthdayDate || data.eventDate || data.date || "Date"}</strong>
        </div>

        <div className="birthday-photo-detail-divider" />

        <div className="birthday-photo-detail">
          <Clock size={20} />
          <span>TIME</span>
          <strong>{data.partyTime || data.eventTime || data.time || "Time"}</strong>
        </div>
      </div>

      <div className="birthday-photo-location">
        <MapPin size={21} />

        <div className="birthday-photo-location-info">
          <strong>{data.venue || "Celebration Venue"}</strong>
          <span>{data.address || "Venue address"}</span>

          {locationUrl && (
            <a
              href={locationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="birthday-photo-location-link"
            >
              <MapPin size={15} />
              View Location
            </a>
          )}
        </div>
      </div>

      <button
        type="button"
        className="birthday-photo-rsvp invitation-rsvp-button"
        onClick={onRSVP}
        style={{
          display: design.button?.enabled === false ? "none" : undefined,
          backgroundColor: design.button?.backgroundColor || undefined,
          color: design.button?.textColor || undefined,
          borderRadius:
            design.button?.radius != null
              ? `${design.button.radius}px`
              : undefined,
        }}
      >
        {design.button?.text || "RSVP"}
      </button>

      <div className="birthday-photo-footer">
        <span>✦</span> MADE WITH LOVE <span>✦</span>
      </div>

      <div className="birthday-photo-decoration decoration-bottom">❀ ✦ ❀</div>
    </div>
  );
}