
import React from "react";
import "./BirthdayPhotoPremiumPlus.css";

export default function BirthdayPhotoPremiumPlus({
  data = {},
  onRSVP = () => {}
}) {
  return (
    <div className="birthday-photo-premium">
      <div className="birthday-photo-decor">✦ HAPPY BIRTHDAY ✦</div>

      <p className="birthday-photo-subtitle">
        YOU ARE INVITED TO CELEBRATE
      </p>

      <div className="birthday-photo-frame">
        {data.birthdayPhoto || data.photo ? (
          <img
            src={data.birthdayPhoto || data.photo}
            alt="Birthday person"
          />
        ) : (
          <span>📸 Your Photo Here</span>
        )}
      </div>

      <p className="birthday-photo-intro">Celebrating</p>

      <h1>{data.birthdayPerson || data.name || "Your Name"}</h1>

      <div className="birthday-photo-age">
        {data.age ? `Turning ${data.age}` : "A Special Birthday"}
      </div>

      <p className="birthday-photo-message">
        {data.message ||
          "Join us for a beautiful day filled with love, laughter and memories."}
      </p>

      <div className="birthday-photo-details">
        <p>📅 {data.birthdayDate || data.date || "Date"}</p>
        <p>🕒 {data.partyTime || data.time || "Time"}</p>
        <p>📍 {data.venue || "Venue"}</p>
        <p>{data.address || "Address"}</p>
      </div>

      <button
        type="button"
        className="birthday-photo-rsvp"
        onClick={onRSVP}
      >
        RSVP
      </button>

      <div className="birthday-photo-footer">
        MADE WITH LOVE ✨
      </div>
    </div>
  );
}
