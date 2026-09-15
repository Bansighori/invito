import { MapPin } from "lucide-react";

function VintageWedding({ data, onRSVP }) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .vintage-wedding {
          width: 100%;
          min-height: 650px;
          background: #e8dcc8;
          background-image:
            radial-gradient(ellipse at 20% 80%, rgba(139, 119, 90, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(139, 119, 90, 0.06) 0%, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          position: relative;
          overflow: hidden;
        }

        .vintage-wedding-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #faf6f0;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border: 3px double #8b7355;
          box-shadow: 0 12px 35px rgba(80, 60, 40, 0.15);
        }

        .vintage-wedding-card::before {
          content: "";
          position: absolute;
          inset: 10px;
          border: 1px solid #c4a882;
          pointer-events: none;
        }

        .vintage-wedding-card::after {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid #d9c9b0;
          pointer-events: none;
        }

        .vintage-wedding-corner {
          position: absolute;
          width: 40px;
          height: 40px;
          border-color: #8b7355;
          border-style: solid;
          opacity: 0.5;
        }

        .vintage-wedding-corner-tl {
          top: 28px;
          left: 28px;
          border-width: 2px 0 0 2px;
        }

        .vintage-wedding-corner-tr {
          top: 28px;
          right: 28px;
          border-width: 2px 2px 0 0;
        }

        .vintage-wedding-corner-bl {
          bottom: 28px;
          left: 28px;
          border-width: 0 0 2px 2px;
        }

        .vintage-wedding-corner-br {
          bottom: 28px;
          right: 28px;
          border-width: 0 2px 2px 0;
        }

        .vintage-wedding-flourish {
          position: absolute;
          font-size: 24px;
          color: #a08060;
          opacity: 0.45;
        }

        .vintage-wedding-flourish-one {
          top: 42px;
          left: 50%;
          transform: translateX(-50%);
        }

        .vintage-wedding-flourish-two {
          bottom: 42px;
          left: 50%;
          transform: translateX(-50%) rotate(180deg);
        }

        .vintage-wedding-content {
          width: 100%;
          max-width: 450px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .vintage-wedding-small {
          margin: 0 0 18px;
          font-family: "Courier New", monospace;
          font-size: 9px;
          letter-spacing: 4px;
          color: #8b7355;
        }

        .vintage-wedding-icon {
          font-size: 36px;
          margin-bottom: 12px;
          filter: sepia(0.4);
        }

        .vintage-wedding-title {
          margin: 0;
          font-size: 14px;
          letter-spacing: 6px;
          text-transform: uppercase;
          font-weight: 400;
          color: #6b5740;
        }

        .vintage-wedding-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 22px 0;
        }

        .vintage-wedding-line span {
          width: 50px;
          height: 1px;
          background: #b8a080;
        }

        .vintage-wedding-line b {
          font-size: 12px;
          color: #8b7355;
          font-weight: 400;
        }

        .vintage-wedding-names {
          margin: 0;
          font-size: 34px;
          font-weight: 400;
          color: #4a3c2e;
          line-height: 1.35;
        }

        .vintage-wedding-ampersand {
          display: block;
          font-size: 26px;
          font-style: italic;
          color: #8b7355;
          margin: 8px 0;
        }

        .vintage-wedding-invite {
          max-width: 360px;
          margin: 18px auto 24px;
          font-size: 12px;
          line-height: 1.8;
          color: #7a6a58;
        }

        .vintage-wedding-details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-bottom: 22px;
        }

        .vintage-wedding-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .vintage-wedding-detail small {
          font-family: "Courier New", monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: #9a8a78;
        }

        .vintage-wedding-detail strong {
          font-size: 13px;
          font-weight: 400;
          color: #5a4a38;
        }

        .vintage-wedding-divider {
          width: 1px;
          height: 35px;
          background: #c4b4a0;
        }

        .vintage-wedding-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .vintage-wedding-venue strong {
          font-family: "Courier New", monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #5a4a38;
        }

        .vintage-wedding-venue span {
          font-size: 11px;
          color: #8a7a68;
        }

        .vintage-wedding-location-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 5px;
          color: #8b7355;
          text-decoration: none;
          font-family: "Courier New", monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .vintage-wedding-location-link:hover {
          opacity: 0.75;
          transform: translateY(-1px);
        }

        .vintage-wedding-message {
          max-width: 370px;
          margin: 18px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: #7a6a58;
        }

        .vintage-wedding-rsvp {
          margin-top: 22px;
          padding: 11px 32px;
          background: transparent;
          border: 2px solid #8b7355;
          color: #6b5740;
          font-family: "Courier New", monospace;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .vintage-wedding-rsvp:hover {
          background: #8b7355;
          color: #faf6f0;
        }

        @media (max-width: 600px) {
          .vintage-wedding {
            padding: 18px;
          }

          .vintage-wedding-card {
            padding: 45px 25px;
          }

          .vintage-wedding-names {
            font-size: 28px;
          }

          .vintage-wedding-details {
            gap: 17px;
          }

          .vintage-wedding-corner {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>

      <div className="vintage-wedding">
        <div className="vintage-wedding-card">
          <div className="vintage-wedding-corner vintage-wedding-corner-tl" />
          <div className="vintage-wedding-corner vintage-wedding-corner-tr" />
          <div className="vintage-wedding-corner vintage-wedding-corner-bl" />
          <div className="vintage-wedding-corner vintage-wedding-corner-br" />

          <div className="vintage-wedding-flourish vintage-wedding-flourish-one">❦</div>
          <div className="vintage-wedding-flourish vintage-wedding-flourish-two">❦</div>

          <div className="vintage-wedding-content">
            <p className="vintage-wedding-small">THE HONOUR OF YOUR PRESENCE</p>

            <div className="vintage-wedding-icon">💐</div>

            <h1 className="vintage-wedding-title">Wedding</h1>

            <div className="vintage-wedding-line">
              <span />
              <b>✿</b>
              <span />
            </div>

            <h2 className="vintage-wedding-names">
              {data.brideName || "Bride"}
              <span className="vintage-wedding-ampersand">&</span>
              {data.groomName || "Groom"}
            </h2>

            <p className="vintage-wedding-invite">
              Cordially invite you to witness their union
              and share in the joy of their wedding day.
            </p>

            <div className="vintage-wedding-details">
              <div className="vintage-wedding-detail">
                <small>DATE</small>
                <strong>{data.eventDate || "DATE"}</strong>
              </div>

              <div className="vintage-wedding-divider" />

              <div className="vintage-wedding-detail">
                <small>TIME</small>
                <strong>{data.eventTime || "TIME"}</strong>
              </div>
            </div>

            <div className="vintage-wedding-venue">
              <strong>{data.venue || "VENUE"}</strong>
              <span>{data.address || "ADDRESS"}</span>

              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vintage-wedding-location-link"
                >
                  <MapPin size={14} />
                  <span>View Location</span>
                </a>
              )}
            </div>

            {data.message && (
              <p className="vintage-wedding-message">{data.message}</p>
            )}

            <button
              type="button"
              className="vintage-wedding-rsvp"
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

export default VintageWedding;
