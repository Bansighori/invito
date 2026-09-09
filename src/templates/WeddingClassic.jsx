import { MapPin } from "lucide-react";

function WeddingClassic({ data, onRSVP }) {

  const locationUrl = data.venue
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        data.venue
      )}`
    : null;

  return (
    <>
      <style>
        {`
          .wedding-location-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;

            margin-top: 12px;

            color: #8b6f47;
            text-decoration: none;

            font-size: 13px;
            font-weight: 600;

            transition: 0.2s ease;
          }

          .wedding-location-link:hover {
            color: #5f4930;
            transform: translateY(-1px);
          }

          .wedding-location-link svg {
            flex-shrink: 0;
          }
        `}
      </style>

      <div className="wedding-classic">

        <div className="wedding-classic-content">

          <p className="wedding-small-title">
            TOGETHER WITH THEIR FAMILIES
          </p>

          <h1 className="wedding-names">
            {data.brideName || "Bride"}

            <span>&</span>

            {data.groomName || "Groom"}
          </h1>

          <p className="wedding-invitation-text">
            REQUEST THE PLEASURE OF YOUR COMPANY
            <br />
            AT THEIR WEDDING CELEBRATION
          </p>

          <div className="wedding-date">
            <span>
              {data.eventDate || "DATE"}
            </span>
          </div>

          <div className="wedding-time">
            {data.eventTime || "TIME"}
          </div>

          <div className="wedding-venue">

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
                className="wedding-location-link"
              >
                <MapPin size={17} />
                <span>View Location</span>
              </a>
            )}

          </div>

          {data.message && (
            <p className="wedding-message">
              {data.message}
            </p>
          )}

          <button
            type="button"
            className="wedding-rsvp-button"
            onClick={onRSVP}
          >
            RSVP
          </button>

        </div>

      </div>
    </>
  );
}

export default WeddingClassic;