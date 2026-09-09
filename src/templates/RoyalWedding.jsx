import { MapPin } from "lucide-react";

function RoyalWedding({ data, onRSVP }) {
  return (
    <>
      <style>{`
        .royal-wedding {
          width: 650px;
          min-height: 850px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 15%,
              rgba(255, 255, 255, 0.9),
              transparent 28%
            ),
            linear-gradient(
              145deg,
              #f8f0df 0%,
              #fffaf0 45%,
              #ead9b7 100%
            );

          color: #342516;
          font-family: Georgia, "Times New Roman", serif;

          display: flex;
          justify-content: center;
          align-items: center;

          padding: 55px;
        }

        .royal-wedding::before {
          content: "";
          position: absolute;
          inset: 20px;

          border: 2px solid #b18a45;

          pointer-events: none;
        }

        .royal-wedding::after {
          content: "";
          position: absolute;
          inset: 30px;

          border: 1px solid rgba(177, 138, 69, 0.55);

          pointer-events: none;
        }

        .royal-corner {
          position: absolute;

          width: 95px;
          height: 95px;

          border-color: #b18a45;
          border-style: solid;

          opacity: 0.7;
        }

        .royal-corner-one {
          top: 35px;
          left: 35px;

          border-width: 3px 0 0 3px;
        }

        .royal-corner-two {
          top: 35px;
          right: 35px;

          border-width: 3px 3px 0 0;
        }

        .royal-corner-three {
          bottom: 35px;
          left: 35px;

          border-width: 0 0 3px 3px;
        }

        .royal-corner-four {
          bottom: 35px;
          right: 35px;

          border-width: 0 3px 3px 0;
        }

        .royal-wedding-content {
          width: 100%;
          max-width: 480px;

          text-align: center;

          position: relative;
          z-index: 2;
        }

        .royal-crown {
          font-size: 42px;
          margin-bottom: 15px;

          color: #b18a45;
        }

        .royal-small-title {
          margin: 0 0 25px;

          font-family: Arial, sans-serif;
          font-size: 11px;
          font-weight: 600;

          letter-spacing: 5px;

          color: #8d6b35;
        }

        .royal-wedding-title {
          margin: 0;

          font-size: 23px;
          font-weight: normal;

          letter-spacing: 6px;
          text-transform: uppercase;

          color: #5d4425;
        }

        .royal-divider {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 13px;

          margin: 25px auto;
        }

        .royal-divider span {
          display: block;

          width: 70px;
          height: 1px;

          background: #b18a45;
        }

        .royal-divider b {
          font-size: 18px;
          font-weight: normal;

          color: #b18a45;
        }

        .royal-names {
          margin: 0;

          display: flex;
          flex-direction: column;

          gap: 8px;

          font-size: 53px;
          line-height: 1.05;
          font-weight: normal;

          color: #38281a;
        }

        .royal-names span {
          display: block;
        }

        .royal-names em {
          font-size: 25px;
          font-style: italic;

          color: #b18a45;
        }

        .royal-invitation-text {
          margin: 28px auto 0;

          max-width: 380px;

          font-size: 15px;
          line-height: 1.8;

          color: #725d42;
        }

        .royal-details {
          display: flex;
          justify-content: center;

          gap: 45px;

          margin-top: 35px;
        }

        .royal-detail {
          min-width: 135px;
        }

        .royal-detail small {
          display: block;

          margin-bottom: 8px;

          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;

          letter-spacing: 3px;

          color: #9a7842;
        }

        .royal-detail strong {
          display: block;

          font-size: 17px;
          font-weight: normal;

          color: #3d2b1b;
        }

        .royal-location {
          margin-top: 32px;
        }

        .royal-location strong {
          display: block;

          font-size: 20px;
          font-weight: normal;

          color: #4a341f;
        }

        .royal-location span {
          display: block;

          margin-top: 7px;

          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 1px;

          color: #8b765d;
        }

        .royal-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  margin-top: 12px;

  color: #9a7842;
  text-decoration: none;

  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: 600;

  letter-spacing: 1px;

  transition: all 0.2s ease;
}

.royal-location-link:hover {
  color: #765625;
  transform: translateY(-1px);
}

.royal-location-link svg {
  flex-shrink: 0;
}

        .royal-message {
          max-width: 390px;

          margin: 22px auto 0;

          font-size: 13px;
          line-height: 1.7;

          font-style: italic;

          color: #765f43;
        }

        .royal-footer {
          margin-top: 28px;

          font-family: Arial, sans-serif;
          font-size: 10px;
          font-weight: 600;

          letter-spacing: 4px;

          color: #9a7842;
        }

        .royal-rsvp-button {
          margin-top: 25px;

          padding: 13px 38px;

          border: 1px solid #9b7537;
          border-radius: 0;

          background: #9b7537;
          color: white;

          font-family: Arial, sans-serif;
          font-size: 11px;
          font-weight: 700;

          letter-spacing: 3px;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .royal-rsvp-button:hover {
          background: #765625;
          transform: translateY(-2px);
        }

        @media (max-width: 700px) {
          .royal-wedding {
            width: 100%;
            min-height: 100vh;

            padding: 45px 30px;
          }

          .royal-wedding::before {
            inset: 12px;
          }

          .royal-wedding::after {
            inset: 20px;
          }

          .royal-names {
            font-size: 42px;
          }

          .royal-details {
            gap: 20px;
          }

          .royal-detail strong {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="royal-wedding">

        <div className="royal-corner royal-corner-one" />
        <div className="royal-corner royal-corner-two" />
        <div className="royal-corner royal-corner-three" />
        <div className="royal-corner royal-corner-four" />

        <div className="royal-wedding-content">

          <div className="royal-crown">
            ♕
          </div>

          <p className="royal-small-title">
            TOGETHER WITH THEIR FAMILIES
          </p>

          <h2 className="royal-wedding-title">
            The Wedding Celebration
          </h2>

          <div className="royal-divider">
            <span />
            <b>✦</b>
            <span />
          </div>

          <h1 className="royal-names">
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

          <p className="royal-invitation-text">
            Request the pleasure of your company
            <br />
            as they begin their beautiful journey together.
          </p>

          <div className="royal-details">

            <div className="royal-detail">
              <small>
                DATE
              </small>

              <strong>
                {data.eventDate || "DATE"}
              </strong>
            </div>

            <div className="royal-detail">
              <small>
                TIME
              </small>

              <strong>
                {data.eventTime || "TIME"}
              </strong>
            </div>

          </div>

          <div className="royal-location">

  <strong>
    {data.venue || "VENUE"}
  </strong>

  <span>
    {data.address || "ADDRESS"}
  </span>

  {data.venue && (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${data.venue}, ${data.address || ""}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="royal-location-link"
    >
      <MapPin size={16} />
      <span>View Location</span>
    </a>
  )}

</div>

          {data.message && (
            <p className="royal-message">
              {data.message}
            </p>
          )}

          <p className="royal-footer">
            WITH LOVE • WITH JOY • FOREVER
          </p>

          <button
            type="button"
            className="royal-rsvp-button"
            onClick={onRSVP}
          >
            RSVP
          </button>

        </div>

      </div>
    </>
  );
}

export default RoyalWedding;