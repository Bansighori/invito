import { MapPin } from "lucide-react";

function BabySafari({ data, onRSVP }) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .baby-safari {
          width: 100%;
          min-height: 650px;
          background: linear-gradient(180deg, #e8f5e9 0%, #c8e6c9 40%, #a5d6a7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          position: relative;
          overflow: hidden;
        }

        .baby-safari-leaf {
          position: absolute;
          font-size: 28px;
          color: #2e7d32;
          opacity: 0.25;
        }

        .baby-safari-leaf-one { top: 8%; left: 6%; transform: rotate(-30deg); }
        .baby-safari-leaf-two { top: 15%; right: 8%; transform: rotate(25deg); }
        .baby-safari-leaf-three { bottom: 10%; left: 10%; transform: rotate(40deg); }
        .baby-safari-leaf-four { bottom: 18%; right: 6%; transform: rotate(-20deg); }

        .baby-safari-animal {
          position: absolute;
          font-size: 32px;
          animation: babySafariBounce 3s ease-in-out infinite;
        }

        .baby-safari-animal-one {
          top: 35px;
          left: 35px;
          animation-delay: 0s;
        }

        .baby-safari-animal-two {
          top: 55px;
          right: 40px;
          font-size: 28px;
          animation-delay: 0.7s;
        }

        .baby-safari-animal-three {
          bottom: 45px;
          left: 45px;
          font-size: 30px;
          animation-delay: 1.2s;
        }

        .baby-safari-animal-four {
          bottom: 35px;
          right: 38px;
          font-size: 26px;
          animation-delay: 0.4s;
        }

        @keyframes babySafariBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .baby-safari-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #fffef9;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border-radius: 12px;
          border: 3px solid #4caf50;
          box-shadow: 0 15px 40px rgba(46, 125, 50, 0.15);
        }

        .baby-safari-card::before {
          content: "";
          position: absolute;
          inset: 10px;
          border: 2px dashed #a5d6a7;
          border-radius: 8px;
          pointer-events: none;
        }

        .baby-safari-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: repeating-linear-gradient(
            90deg,
            #4caf50,
            #4caf50 12px,
            #ff9800 12px,
            #ff9800 24px,
            #ffeb3b 24px,
            #ffeb3b 36px
          );
        }

        .baby-safari-content {
          width: 100%;
          max-width: 450px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .baby-safari-small {
          margin: 0 0 16px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          color: #558b2f;
        }

        .baby-safari-icon {
          width: 76px;
          height: 76px;
          margin: 0 auto 16px;
          border-radius: 50%;
          background: #e8f5e9;
          border: 2px solid #a5d6a7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 38px;
        }

        .baby-safari-title {
          margin: 0;
          font-size: 40px;
          line-height: 1.1;
          font-weight: 400;
          color: #2e7d32;
        }

        .baby-safari-subtitle {
          margin: 10px 0 0;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #689f38;
        }

        .baby-safari-line {
          width: 55px;
          height: 2px;
          background: linear-gradient(90deg, #4caf50, #ff9800);
          margin: 22px auto;
          border-radius: 2px;
        }

        .baby-safari-name {
          margin: 0;
          font-size: 32px;
          font-weight: 400;
          font-style: italic;
          color: #33691e;
        }

        .baby-safari-invite {
          max-width: 360px;
          margin: 16px auto 24px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 0.5px;
          color: #689f38;
        }

        .baby-safari-details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-bottom: 22px;
        }

        .baby-safari-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .baby-safari-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: #7cb342;
        }

        .baby-safari-detail strong {
          font-size: 13px;
          font-weight: 400;
          color: #33691e;
        }

        .baby-safari-divider {
          width: 1px;
          height: 35px;
          background: #c5e1a5;
        }

        .baby-safari-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .baby-safari-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #2e7d32;
        }

        .baby-safari-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #689f38;
        }

        .baby-safari-location-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 5px;
          color: #4caf50;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .baby-safari-location-link:hover {
          opacity: 0.75;
          transform: translateY(-1px);
        }

        .baby-safari-message {
          max-width: 370px;
          margin: 18px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: #689f38;
        }

        .baby-safari-animals-row {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 16px 0 0;
          font-size: 22px;
        }

        .baby-safari-rsvp {
          margin-top: 20px;
          padding: 11px 30px;
          background: #4caf50;
          border: 2px solid #4caf50;
          border-radius: 25px;
          color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .baby-safari-rsvp:hover {
          background: #ffffff;
          color: #4caf50;
        }

        @media (max-width: 600px) {
          .baby-safari {
            padding: 18px;
          }

          .baby-safari-card {
            padding: 45px 25px;
          }

          .baby-safari-title {
            font-size: 32px;
          }

          .baby-safari-name {
            font-size: 28px;
          }

          .baby-safari-details {
            gap: 17px;
          }

          .baby-safari-animal-one,
          .baby-safari-animal-three {
            display: none;
          }
        }
      `}</style>

      <div className="baby-safari">
        <span className="baby-safari-leaf baby-safari-leaf-one">🌿</span>
        <span className="baby-safari-leaf baby-safari-leaf-two">🌿</span>
        <span className="baby-safari-leaf baby-safari-leaf-three">🌿</span>
        <span className="baby-safari-leaf baby-safari-leaf-four">🌿</span>

        <span className="baby-safari-animal baby-safari-animal-one">🦁</span>
        <span className="baby-safari-animal baby-safari-animal-two">🐘</span>
        <span className="baby-safari-animal baby-safari-animal-three">🦒</span>
        <span className="baby-safari-animal baby-safari-animal-four">🐵</span>

        <div className="baby-safari-card">
          <div className="baby-safari-content">
            <p className="baby-safari-small">WELCOME TO THE JUNGLE</p>

            <div className="baby-safari-icon">🍼</div>

            <h1 className="baby-safari-title">Baby Shower</h1>

            <p className="baby-safari-subtitle">Safari Adventure</p>

            <div className="baby-safari-line" />

            <h2 className="baby-safari-name">
              {data.hostName || "Mom & Dad"}
            </h2>

            <p className="baby-safari-invite">
              Join us on a wild adventure as we celebrate
              the upcoming arrival of our little explorer.
            </p>

            <div className="baby-safari-details">
              <div className="baby-safari-detail">
                <small>DATE</small>
                <strong>{data.eventDate || "DATE"}</strong>
              </div>

              <div className="baby-safari-divider" />

              <div className="baby-safari-detail">
                <small>TIME</small>
                <strong>{data.eventTime || "TIME"}</strong>
              </div>
            </div>

            <div className="baby-safari-venue">
              <strong>{data.venue || "VENUE"}</strong>
              <span>{data.address || "ADDRESS"}</span>

              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="baby-safari-location-link"
                >
                  <MapPin size={14} />
                  <span>View Location</span>
                </a>
              )}
            </div>

            {data.message && (
              <p className="baby-safari-message">{data.message}</p>
            )}

            <div className="baby-safari-animals-row">
              <span>🦓</span>
              <span>🐯</span>
              <span>🦛</span>
              <span>🐊</span>
            </div>

            <button
              type="button"
              className="baby-safari-rsvp"
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

export default BabySafari;
