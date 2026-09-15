import { MapPin } from "lucide-react";

function CocktailParty({ data, onRSVP }) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .cocktail-party {
          width: 100%;
          min-height: 650px;
          background: #0a0a0f;
          background-image:
            radial-gradient(ellipse at 20% 50%, rgba(0, 255, 200, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(255, 0, 128, 0.06) 0%, transparent 50%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          position: relative;
          overflow: hidden;
        }

        .cocktail-party-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: cocktailPartyPulse 4s ease-in-out infinite;
        }

        .cocktail-party-glow-one {
          width: 200px;
          height: 200px;
          background: #00ffc8;
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .cocktail-party-glow-two {
          width: 180px;
          height: 180px;
          background: #ff0080;
          bottom: 10%;
          right: 5%;
          animation-delay: 2s;
        }

        @keyframes cocktailPartyPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        .cocktail-party-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: rgba(15, 15, 25, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border: 1px solid rgba(0, 255, 200, 0.2);
          border-radius: 4px;
          box-shadow:
            0 0 30px rgba(0, 255, 200, 0.08),
            0 0 60px rgba(255, 0, 128, 0.05);
        }

        .cocktail-party-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          border-image: linear-gradient(135deg, rgba(0, 255, 200, 0.3), rgba(255, 0, 128, 0.3)) 1;
          pointer-events: none;
        }

        .cocktail-party-neon-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffc8, #ff0080, transparent);
          left: 10%;
          right: 10%;
        }

        .cocktail-party-neon-line-top { top: 20px; }
        .cocktail-party-neon-line-bottom { bottom: 20px; }

        .cocktail-party-content {
          width: 100%;
          max-width: 460px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .cocktail-party-small {
          margin: 0 0 16px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 5px;
          color: #00ffc8;
          text-shadow: 0 0 10px rgba(0, 255, 200, 0.5);
        }

        .cocktail-party-icon {
          font-size: 50px;
          margin-bottom: 14px;
          animation: cocktailPartySway 3s ease-in-out infinite;
        }

        @keyframes cocktailPartySway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .cocktail-party-title {
          margin: 0;
          font-size: 42px;
          line-height: 1.1;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .cocktail-party-subtitle {
          margin: 12px 0 0;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          color: #ff0080;
          text-shadow: 0 0 8px rgba(255, 0, 128, 0.4);
        }

        .cocktail-party-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #00ffc8, #ff0080);
          margin: 24px auto;
          box-shadow: 0 0 10px rgba(0, 255, 200, 0.4);
        }

        .cocktail-party-name {
          margin: 0;
          font-size: 34px;
          font-weight: 400;
          font-style: italic;
          color: #e0e0e8;
        }

        .cocktail-party-invite {
          max-width: 360px;
          margin: 18px auto 24px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 1px;
          color: rgba(200, 200, 210, 0.65);
        }

        .cocktail-party-details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-bottom: 22px;
        }

        .cocktail-party-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 12px 20px;
          border: 1px solid rgba(0, 255, 200, 0.15);
          border-radius: 4px;
          background: rgba(0, 255, 200, 0.03);
        }

        .cocktail-party-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(0, 255, 200, 0.6);
        }

        .cocktail-party-detail strong {
          font-size: 13px;
          font-weight: 400;
          color: #ffffff;
        }

        .cocktail-party-divider {
          width: 1px;
          height: 35px;
          background: rgba(255, 0, 128, 0.3);
        }

        .cocktail-party-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .cocktail-party-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #00ffc8;
        }

        .cocktail-party-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: rgba(200, 200, 210, 0.55);
        }

        .cocktail-party-location-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 5px;
          color: #ff0080;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .cocktail-party-location-link:hover {
          opacity: 0.75;
          transform: translateY(-1px);
        }

        .cocktail-party-message {
          max-width: 370px;
          margin: 18px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: rgba(200, 200, 210, 0.55);
        }

        .cocktail-party-footer {
          margin: 18px 0 0;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          color: rgba(0, 255, 200, 0.5);
        }

        .cocktail-party-rsvp {
          margin-top: 22px;
          padding: 11px 32px;
          background: transparent;
          border: 1px solid #00ffc8;
          color: #00ffc8;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 0 15px rgba(0, 255, 200, 0.15);
        }

        .cocktail-party-rsvp:hover {
          background: #00ffc8;
          color: #0a0a0f;
          box-shadow: 0 0 25px rgba(0, 255, 200, 0.4);
        }

        @media (max-width: 600px) {
          .cocktail-party {
            padding: 18px;
          }

          .cocktail-party-card {
            padding: 45px 25px;
          }

          .cocktail-party-title {
            font-size: 32px;
            letter-spacing: 2px;
          }

          .cocktail-party-name {
            font-size: 28px;
          }

          .cocktail-party-details {
            gap: 12px;
            flex-wrap: wrap;
          }

          .cocktail-party-divider {
            display: none;
          }

          .cocktail-party-glow-one,
          .cocktail-party-glow-two {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>

      <div className="cocktail-party">
        <div className="cocktail-party-glow cocktail-party-glow-one" />
        <div className="cocktail-party-glow cocktail-party-glow-two" />

        <div className="cocktail-party-card">
          <div className="cocktail-party-neon-line cocktail-party-neon-line-top" />
          <div className="cocktail-party-neon-line cocktail-party-neon-line-bottom" />

          <div className="cocktail-party-content">
            <p className="cocktail-party-small">AN EVENING OF ELEGANCE</p>

            <div className="cocktail-party-icon">🍸</div>

            <h1 className="cocktail-party-title">Cocktail Party</h1>

            <p className="cocktail-party-subtitle">Sip • Socialize • Celebrate</p>

            <div className="cocktail-party-line" />

            <h2 className="cocktail-party-name">
              {data.hostName || "Your Host"}
            </h2>

            <p className="cocktail-party-invite">
              You are cordially invited to an evening of fine cocktails,
              great company, and unforgettable moments.
            </p>

            <div className="cocktail-party-details">
              <div className="cocktail-party-detail">
                <small>DATE</small>
                <strong>{data.eventDate || "DATE"}</strong>
              </div>

              <div className="cocktail-party-divider" />

              <div className="cocktail-party-detail">
                <small>TIME</small>
                <strong>{data.eventTime || "TIME"}</strong>
              </div>
            </div>

            <div className="cocktail-party-venue">
              <strong>{data.venue || "VENUE"}</strong>
              <span>{data.address || "ADDRESS"}</span>

              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cocktail-party-location-link"
                >
                  <MapPin size={14} />
                  <span>View Location</span>
                </a>
              )}
            </div>

            {data.message && (
              <p className="cocktail-party-message">{data.message}</p>
            )}

            <p className="cocktail-party-footer">
              DRESS CODE: COCKTAIL ATTIRE
            </p>

            <button
              type="button"
              className="cocktail-party-rsvp"
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

export default CocktailParty;
