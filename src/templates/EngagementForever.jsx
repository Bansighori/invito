import { MapPin } from "lucide-react";

function EngagementForever({ data, onRSVP }) {

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
          .engagement-location-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;

            margin-top: 12px;

            color: #9a6b6b;
            text-decoration: none;

            font-size: 13px;
            font-weight: 600;

            transition: all 0.2s ease;
          }

          .engagement-location-link:hover {
            color: #704747;
            transform: translateY(-1px);
          }

          .engagement-location-link svg {
            flex-shrink: 0;
          }
        `}
      </style>

      <div className="engagement-forever">

        <div className="engagement-glow engagement-glow-one" />

        <div className="engagement-glow engagement-glow-two" />

        <div className="engagement-border">

          <div className="engagement-content">

            <p className="engagement-label">
              AN ENGAGEMENT CELEBRATION
            </p>

            <div className="engagement-ring">
              ♡
            </div>

            <p className="engagement-intro">
              We are delighted to announce
            </p>

            <h1 className="engagement-names">

              <span>
                {data.brideName || "Bride"}
              </span>

              <em>
                &
              </em>

              <span>
                {data.groomName || "Groom"}
              </span>

            </h1>

            <div className="engagement-divider">
              <span />
              <b>✦</b>
              <span />
            </div>

            <p className="engagement-text">
              Please join us as we celebrate
              this beautiful beginning together.
            </p>

            <div className="engagement-details">

              <div>

                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>

              </div>

              <div>

                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>

              </div>

            </div>

            {/* LOCATION */}

            <div className="engagement-location">

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
                  className="engagement-location-link"
                >
                  <MapPin size={17} />
                  <span>
                    View Location
                  </span>
                </a>
              )}

            </div>

            {data.message && (
              <p className="engagement-message">
                {data.message}
              </p>
            )}

            <p className="engagement-footer">
              WITH LOVE • WITH JOY • FOREVER
            </p>

            {/* RSVP BUTTON */}

            <button
              type="button"
              className="engagement-rsvp-button"
              onClick={onRSVP}
            >
              RSVP
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default EngagementForever;