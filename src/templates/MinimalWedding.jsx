import { MapPin } from "lucide-react";

function MinimalWedding({ data, onRSVP }) {
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
      <style>{`
        .minimal-wedding {
          width: 100%;
          min-height: 650px;
          background: #f8f7f3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 45px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          color: #292929;
        }

        .minimal-wedding-card {
          width: 100%;
          max-width: 620px;
          min-height: 560px;
          background: #ffffff;
          border: 1px solid #dedbd3;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-sizing: border-box;
          padding: 55px 45px;
        }

        .minimal-wedding-card::before {
          content: "";
          position: absolute;
          inset: 12px;
          border: 1px solid #e9e6df;
          pointer-events: none;
        }

        .minimal-wedding-content {
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .minimal-wedding-small {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 4px;
          color: #88847c;
          margin: 0 0 25px;
        }

        .minimal-wedding-title {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: 5px;
          text-transform: uppercase;
          margin: 0 0 35px;
        }

        .minimal-wedding-names {
          font-size: 48px;
          line-height: 1.15;
          font-weight: 400;
          margin: 0;
          color: #222;
        }

        .minimal-wedding-names span {
          display: block;
        }

        .minimal-wedding-and {
          display: block;
          font-size: 20px;
          font-style: italic;
          margin: 10px 0;
          color: #9b968c;
        }

        .minimal-wedding-line {
          width: 55px;
          height: 1px;
          background: #b7b1a6;
          margin: 30px auto;
        }

        .minimal-wedding-text {
          font-family: Arial, sans-serif;
          font-size: 11px;
          line-height: 1.8;
          letter-spacing: 2px;
          color: #77736d;
          margin: 0 auto 28px;
          max-width: 380px;
        }

        .minimal-wedding-details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          margin: 0 auto 25px;
        }

        .minimal-wedding-detail {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .minimal-wedding-detail small {
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
          color: #99948a;
        }

        .minimal-wedding-detail strong {
          font-size: 15px;
          font-weight: 400;
          color: #333;
        }

        .minimal-wedding-detail-divider {
          width: 1px;
          height: 35px;
          background: #ddd9d1;
        }

        .minimal-wedding-venue {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 22px;
        }

        .minimal-wedding-venue strong {
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #44413c;
        }

        .minimal-wedding-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #88847c;
        }

        .minimal-wedding-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  margin-top: 12px;

  color: #77736d;
  text-decoration: none;

  font-family: Arial, sans-serif;
  font-size: 10px;
  font-weight: 600;

  letter-spacing: 1.5px;

  transition: all 0.2s ease;
}

.minimal-wedding-location-link:hover {
  color: #33312e;
  transform: translateY(-1px);
}

.minimal-wedding-location-link svg {
  flex-shrink: 0;
}

        .minimal-wedding-message {
          font-family: Arial, sans-serif;
          font-size: 11px;
          line-height: 1.7;
          color: #77736d;
          max-width: 400px;
          margin: 22px auto 0;
        }

        .minimal-wedding-rsvp {
          margin-top: 28px;
          padding: 11px 28px;
          border: 1px solid #393733;
          background: transparent;
          color: #393733;
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .minimal-wedding-rsvp:hover {
          background: #393733;
          color: #ffffff;
        }

        @media (max-width: 600px) {
          .minimal-wedding {
            padding: 20px;
          }

          .minimal-wedding-card {
            padding: 45px 25px;
          }

          .minimal-wedding-names {
            font-size: 36px;
          }

          .minimal-wedding-title {
            font-size: 19px;
            letter-spacing: 3px;
          }

          .minimal-wedding-details {
            gap: 18px;
          }
        }
      `}</style>

      <div className="minimal-wedding">
        <div className="minimal-wedding-card">

          <div className="minimal-wedding-content">

            <p className="minimal-wedding-small">
              TOGETHER WITH THEIR FAMILIES
            </p>

            <h2 className="minimal-wedding-title">
              Wedding Invitation
            </h2>

            <h1 className="minimal-wedding-names">
              <span>
                {data.brideName || "Bride"}
              </span>

              <span className="minimal-wedding-and">
                &
              </span>

              <span>
                {data.groomName || "Groom"}
              </span>
            </h1>

            <div className="minimal-wedding-line" />

            <p className="minimal-wedding-text">
              REQUEST THE PLEASURE OF YOUR COMPANY
              <br />
              AS WE CELEBRATE OUR SPECIAL DAY
            </p>

            <div className="minimal-wedding-details">

              <div className="minimal-wedding-detail">
                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>
              </div>

              <div className="minimal-wedding-detail-divider" />

              <div className="minimal-wedding-detail">
                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>
              </div>

            </div>

            <div className="minimal-wedding-venue">

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
      className="minimal-wedding-location-link"
    >
      <MapPin size={15} />
      <span>
        View Location
      </span>
    </a>
  )}

</div>

            {data.message && (
              <p className="minimal-wedding-message">
                {data.message}
              </p>
            )}

            <button
              type="button"
              className="minimal-wedding-rsvp"
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

export default MinimalWedding;