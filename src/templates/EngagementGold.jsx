import { MapPin } from "lucide-react";

function EngagementGold({ data, onRSVP }) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .engagement-gold {
          width: 100%;
          min-height: 650px;
          background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          position: relative;
          overflow: hidden;
        }

        .engagement-gold::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212, 175, 55, 0.12) 0%, transparent 55%);
          pointer-events: none;
        }

        .engagement-gold-ornament {
          position: absolute;
          color: rgba(212, 175, 55, 0.35);
          font-size: 20px;
        }

        .engagement-gold-ornament-one { top: 10%; left: 10%; }
        .engagement-gold-ornament-two { top: 12%; right: 12%; transform: scaleX(-1); }
        .engagement-gold-ornament-three { bottom: 12%; left: 10%; transform: rotate(180deg); }
        .engagement-gold-ornament-four { bottom: 10%; right: 10%; transform: rotate(180deg) scaleX(-1); }

        .engagement-gold-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: linear-gradient(145deg, #1e1e30 0%, #252540 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border: 2px solid #d4af37;
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.15), inset 0 1px 0 rgba(212, 175, 55, 0.1);
        }

        .engagement-gold-card::before {
          content: "";
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(212, 175, 55, 0.4);
          pointer-events: none;
        }

        .engagement-gold-card::after {
          content: "";
          position: absolute;
          inset: 16px;
          border: 1px solid rgba(212, 175, 55, 0.15);
          pointer-events: none;
        }

        .engagement-gold-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 40%,
            rgba(212, 175, 55, 0.03) 50%,
            transparent 60%
          );
          animation: engagementGoldShine 6s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes engagementGoldShine {
          0%, 100% { transform: translateX(-20%) translateY(-20%); }
          50% { transform: translateX(20%) translateY(20%); }
        }

        .engagement-gold-content {
          width: 100%;
          max-width: 460px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .engagement-gold-small {
          margin: 0 0 16px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 5px;
          color: #d4af37;
        }

        .engagement-gold-icon {
          font-size: 44px;
          margin-bottom: 14px;
          filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.4));
        }

        .engagement-gold-title {
          margin: 0;
          font-size: 36px;
          line-height: 1.15;
          font-weight: 400;
          color: #f5e6c8;
          letter-spacing: 2px;
        }

        .engagement-gold-subtitle {
          margin: 10px 0 0;
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(212, 175, 55, 0.7);
        }

        .engagement-gold-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 24px 0;
        }

        .engagement-gold-line span {
          width: 55px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }

        .engagement-gold-line b {
          font-size: 14px;
          color: #d4af37;
          font-weight: 400;
        }

        .engagement-gold-names {
          margin: 0;
          font-size: 34px;
          font-weight: 400;
          font-style: italic;
          color: #f5e6c8;
          line-height: 1.35;
        }

        .engagement-gold-ampersand {
          display: block;
          font-size: 24px;
          font-style: normal;
          color: #d4af37;
          margin: 8px 0;
        }

        .engagement-gold-invite {
          max-width: 360px;
          margin: 18px auto 24px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 1px;
          color: rgba(245, 230, 200, 0.65);
        }

        .engagement-gold-details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-bottom: 22px;
        }

        .engagement-gold-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .engagement-gold-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(212, 175, 55, 0.6);
        }

        .engagement-gold-detail strong {
          font-size: 14px;
          font-weight: 400;
          color: #f5e6c8;
        }

        .engagement-gold-divider {
          width: 1px;
          height: 35px;
          background: rgba(212, 175, 55, 0.3);
        }

        .engagement-gold-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .engagement-gold-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #d4af37;
        }

        .engagement-gold-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: rgba(245, 230, 200, 0.55);
        }

        .engagement-gold-location-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 5px;
          color: #d4af37;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .engagement-gold-location-link:hover {
          opacity: 0.75;
          transform: translateY(-1px);
        }

        .engagement-gold-message {
          max-width: 370px;
          margin: 18px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: rgba(245, 230, 200, 0.6);
        }

        .engagement-gold-rsvp {
          margin-top: 22px;
          padding: 11px 32px;
          background: linear-gradient(135deg, #d4af37, #b8962e);
          border: 1px solid #d4af37;
          color: #1a1a2e;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .engagement-gold-rsvp:hover {
          background: transparent;
          color: #d4af37;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }

        @media (max-width: 600px) {
          .engagement-gold {
            padding: 18px;
          }

          .engagement-gold-card {
            padding: 45px 25px;
          }

          .engagement-gold-title {
            font-size: 28px;
          }

          .engagement-gold-names {
            font-size: 28px;
          }

          .engagement-gold-details {
            gap: 17px;
          }
        }
      `}</style>

      <div className="engagement-gold">
        <span className="engagement-gold-ornament engagement-gold-ornament-one">❧</span>
        <span className="engagement-gold-ornament engagement-gold-ornament-two">❧</span>
        <span className="engagement-gold-ornament engagement-gold-ornament-three">❧</span>
        <span className="engagement-gold-ornament engagement-gold-ornament-four">❧</span>

        <div className="engagement-gold-card">
          <div className="engagement-gold-shine" />

          <div className="engagement-gold-content">
            <p className="engagement-gold-small">SAVE THE DATE</p>

            <div className="engagement-gold-icon">💍</div>

            <h1 className="engagement-gold-title">Engagement</h1>

            <p className="engagement-gold-subtitle">A Celebration of Love</p>

            <div className="engagement-gold-line">
              <span />
              <b>✦</b>
              <span />
            </div>

            <h2 className="engagement-gold-names">
              {data.brideName || "Her"}
              <span className="engagement-gold-ampersand">&</span>
              {data.groomName || "Him"}
            </h2>

            <p className="engagement-gold-invite">
              Joyfully announce their engagement and invite you
              to celebrate this golden moment with them.
            </p>

            <div className="engagement-gold-details">
              <div className="engagement-gold-detail">
                <small>DATE</small>
                <strong>{data.eventDate || "DATE"}</strong>
              </div>

              <div className="engagement-gold-divider" />

              <div className="engagement-gold-detail">
                <small>TIME</small>
                <strong>{data.eventTime || "TIME"}</strong>
              </div>
            </div>

            <div className="engagement-gold-venue">
              <strong>{data.venue || "VENUE"}</strong>
              <span>{data.address || "ADDRESS"}</span>

              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="engagement-gold-location-link"
                >
                  <MapPin size={14} />
                  <span>View Location</span>
                </a>
              )}
            </div>

            {data.message && (
              <p className="engagement-gold-message">{data.message}</p>
            )}

            <button
              type="button"
              className="engagement-gold-rsvp"
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

export default EngagementGold;
