import { MapPin } from "lucide-react";

function SunsetWedding({ data, onRSVP }) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .sunset-wedding {
          width: 100%;
          min-height: 650px;
          background: linear-gradient(160deg, #ff6b6b 0%, #ee5a24 25%, #f0932b 50%, #e17055 75%, #6c3483 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          position: relative;
          overflow: hidden;
        }

        .sunset-wedding::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 100%, rgba(255, 200, 100, 0.4) 0%, transparent 60%);
          pointer-events: none;
        }

        .sunset-wedding-star {
          position: absolute;
          color: rgba(255, 255, 255, 0.6);
          animation: sunsetWeddingTwinkle 3s ease-in-out infinite;
        }

        .sunset-wedding-star-one {
          top: 12%;
          left: 8%;
          font-size: 18px;
          animation-delay: 0s;
        }

        .sunset-wedding-star-two {
          top: 20%;
          right: 12%;
          font-size: 14px;
          animation-delay: 0.8s;
        }

        .sunset-wedding-star-three {
          bottom: 18%;
          left: 15%;
          font-size: 16px;
          animation-delay: 1.5s;
        }

        .sunset-wedding-star-four {
          bottom: 25%;
          right: 8%;
          font-size: 20px;
          animation-delay: 0.4s;
        }

        .sunset-wedding-star-five {
          top: 45%;
          left: 5%;
          font-size: 12px;
          animation-delay: 2s;
        }

        @keyframes sunsetWeddingTwinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .sunset-wedding-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }

        .sunset-wedding-card::before {
          content: "";
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 4px;
          pointer-events: none;
        }

        .sunset-wedding-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 180, 100, 0.3) 0%, transparent 70%);
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .sunset-wedding-content {
          width: 100%;
          max-width: 460px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .sunset-wedding-small {
          margin: 0 0 16px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 4px;
          color: rgba(255, 255, 255, 0.85);
        }

        .sunset-wedding-icon {
          font-size: 42px;
          margin-bottom: 14px;
          animation: sunsetWeddingFloat 4s ease-in-out infinite;
        }

        @keyframes sunsetWeddingFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .sunset-wedding-title {
          margin: 0;
          font-size: 38px;
          line-height: 1.15;
          font-weight: 400;
          color: #ffffff;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
        }

        .sunset-wedding-subtitle {
          margin: 10px 0 0;
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.75);
        }

        .sunset-wedding-line {
          width: 60px;
          height: 1px;
          background: rgba(255, 255, 255, 0.5);
          margin: 24px auto;
        }

        .sunset-wedding-names {
          margin: 0;
          font-size: 36px;
          font-weight: 400;
          font-style: italic;
          color: #fff8f0;
          line-height: 1.3;
        }

        .sunset-wedding-ampersand {
          display: block;
          font-size: 28px;
          font-style: normal;
          color: rgba(255, 220, 180, 0.95);
          margin: 6px 0;
        }

        .sunset-wedding-invite {
          max-width: 360px;
          margin: 18px auto 24px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.8);
        }

        .sunset-wedding-details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-bottom: 22px;
        }

        .sunset-wedding-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sunset-wedding-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.65);
        }

        .sunset-wedding-detail strong {
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
        }

        .sunset-wedding-divider {
          width: 1px;
          height: 35px;
          background: rgba(255, 255, 255, 0.35);
        }

        .sunset-wedding-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .sunset-wedding-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.95);
        }

        .sunset-wedding-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
        }

        .sunset-wedding-location-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .sunset-wedding-location-link:hover {
          opacity: 0.75;
          transform: translateY(-1px);
        }

        .sunset-wedding-message {
          max-width: 370px;
          margin: 18px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
        }

        .sunset-wedding-rsvp {
          margin-top: 22px;
          padding: 11px 32px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.6);
          color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(4px);
        }

        .sunset-wedding-rsvp:hover {
          background: #ffffff;
          color: #e17055;
          border-color: #ffffff;
        }

        @media (max-width: 600px) {
          .sunset-wedding {
            padding: 18px;
          }

          .sunset-wedding-card {
            padding: 45px 25px;
          }

          .sunset-wedding-title {
            font-size: 30px;
          }

          .sunset-wedding-names {
            font-size: 28px;
          }

          .sunset-wedding-details {
            gap: 17px;
          }

          .sunset-wedding-star-one,
          .sunset-wedding-star-five {
            display: none;
          }
        }
      `}</style>

      <div className="sunset-wedding">
        <span className="sunset-wedding-star sunset-wedding-star-one">✦</span>
        <span className="sunset-wedding-star sunset-wedding-star-two">✧</span>
        <span className="sunset-wedding-star sunset-wedding-star-three">✦</span>
        <span className="sunset-wedding-star sunset-wedding-star-four">✧</span>
        <span className="sunset-wedding-star sunset-wedding-star-five">✦</span>

        <div className="sunset-wedding-card">
          <div className="sunset-wedding-glow" />

          <div className="sunset-wedding-content">
            <p className="sunset-wedding-small">TOGETHER WITH THEIR FAMILIES</p>

            <div className="sunset-wedding-icon">🌅</div>

            <h1 className="sunset-wedding-title">Wedding Celebration</h1>

            <p className="sunset-wedding-subtitle">Under the Golden Sky</p>

            <div className="sunset-wedding-line" />

            <h2 className="sunset-wedding-names">
              {data.brideName || "Bride"}
              <span className="sunset-wedding-ampersand">&</span>
              {data.groomName || "Groom"}
            </h2>

            <p className="sunset-wedding-invite">
              Request the pleasure of your company as we exchange vows
              and begin our forever at sunset.
            </p>

            <div className="sunset-wedding-details">
              <div className="sunset-wedding-detail">
                <small>DATE</small>
                <strong>{data.eventDate || "DATE"}</strong>
              </div>

              <div className="sunset-wedding-divider" />

              <div className="sunset-wedding-detail">
                <small>TIME</small>
                <strong>{data.eventTime || "TIME"}</strong>
              </div>
            </div>

            <div className="sunset-wedding-venue">
              <strong>{data.venue || "VENUE"}</strong>
              <span>{data.address || "ADDRESS"}</span>

              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sunset-wedding-location-link"
                >
                  <MapPin size={14} />
                  <span>View Location</span>
                </a>
              )}
            </div>

            {data.message && (
              <p className="sunset-wedding-message">{data.message}</p>
            )}

            <button
              type="button"
              className="sunset-wedding-rsvp"
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

export default SunsetWedding;
