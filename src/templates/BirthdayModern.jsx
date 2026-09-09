import { MapPin } from "lucide-react";

function BirthdayModern({ data, onRSVP }) {

  const locationText = [
    data.venue,
    data.address
  ]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        locationText
      )}`
    : null;

  return (
    <>
      <style>
        {`
          .birthday-location-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;

            margin-top: 12px;

            color: #6b7280;
            text-decoration: none;

            font-size: 13px;
            font-weight: 600;

            transition: all 0.2s ease;
          }

          .birthday-location-link:hover {
            color: #374151;
            transform: translateY(-1px);
          }

          .birthday-location-link svg {
            flex-shrink: 0;
          }
        `}
      </style>

      <div className="birthday-modern">

        <div className="birthday-decoration birthday-circle-one">
          ✦
        </div>

        <div className="birthday-decoration birthday-circle-two">
          ★
        </div>

        <div className="birthday-decoration birthday-circle-three">
          •
        </div>

        <div className="birthday-modern-content">

          <p className="birthday-top-text">
            YOU'RE INVITED TO
          </p>

          <div className="birthday-cake">
            🎂
          </div>

          <h1 className="birthday-title">
            BIRTHDAY
          </h1>

          <p className="birthday-person">
            {data.hostName || "Birthday Person"}
          </p>

          <div className="birthday-divider">
            <span />
            <span>✦</span>
            <span />
          </div>

          <div className="birthday-event-details">

            <div className="birthday-detail">
              <small>
                DATE
              </small>

              <strong>
                {data.eventDate || "DATE"}
              </strong>
            </div>

            <div className="birthday-detail">
              <small>
                TIME
              </small>

              <strong>
                {data.eventTime || "TIME"}
              </strong>
            </div>

          </div>

          {/* VENUE */}

          <div className="birthday-venue">

            <strong>
              {data.venue || "VENUE"}
            </strong>

            <span>
              {data.address || "ADDRESS"}
            </span>

            {locationUrl && (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="birthday-location-link"
              >
                <MapPin size={17} />
                <span>
                  View Location
                </span>
              </a>
            )}

          </div>

          {data.message && (
            <p className="birthday-message">
              {data.message}
            </p>
          )}

          <p className="birthday-bottom-text">
            COME CELEBRATE WITH US!
          </p>

          {/* RSVP BUTTON */}

          <button
            type="button"
            className="birthday-rsvp-button"
            onClick={onRSVP}
          >
            RSVP
          </button>

        </div>

      </div>
    </>
  );
}

export default BirthdayModern;