import { MapPin } from "lucide-react";

function GraduationDay({ data, onRSVP }) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .graduation-day {
          width: 100%;
          min-height: 650px;
          background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          position: relative;
          overflow: hidden;
        }

        .graduation-day-star {
          position: absolute;
          font-size: 20px;
          color: #1565c0;
          opacity: 0.2;
          animation: graduationDaySparkle 3s ease-in-out infinite;
        }

        .graduation-day-star-one { top: 10%; left: 12%; animation-delay: 0s; }
        .graduation-day-star-two { top: 18%; right: 15%; animation-delay: 0.8s; }
        .graduation-day-star-three { bottom: 15%; left: 10%; animation-delay: 1.5s; }
        .graduation-day-star-four { bottom: 22%; right: 12%; animation-delay: 0.4s; }

        @keyframes graduationDaySparkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(1.15); }
        }

        .graduation-day-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border-radius: 6px;
          border-top: 6px solid #1565c0;
          box-shadow: 0 15px 40px rgba(21, 101, 192, 0.15);
        }

        .graduation-day-card::before {
          content: "";
          position: absolute;
          inset: 12px;
          border: 1px solid #bbdefb;
          border-radius: 2px;
          pointer-events: none;
        }

        .graduation-day-card::after {
          content: "";
          position: absolute;
          inset: 20px;
          border: 1px solid #e3f2fd;
          pointer-events: none;
        }

        .graduation-day-tassel {
          position: absolute;
          top: 0;
          right: 40px;
          font-size: 48px;
          animation: graduationDaySwing 4s ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes graduationDaySwing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }

        .graduation-day-content {
          width: 100%;
          max-width: 460px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .graduation-day-small {
          margin: 0 0 16px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 4px;
          color: #1565c0;
        }

        .graduation-day-icon {
          font-size: 56px;
          margin-bottom: 12px;
          animation: graduationDayBounce 2.5s ease-in-out infinite;
        }

        @keyframes graduationDayBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .graduation-day-title {
          margin: 0;
          font-size: 38px;
          line-height: 1.15;
          font-weight: 400;
          color: #0d47a1;
        }

        .graduation-day-subtitle {
          margin: 10px 0 0;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #1976d2;
        }

        .graduation-day-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 22px 0;
        }

        .graduation-day-line span {
          width: 50px;
          height: 1px;
          background: #90caf9;
        }

        .graduation-day-line b {
          font-size: 14px;
          color: #1565c0;
          font-weight: 400;
        }

        .graduation-day-name {
          margin: 0;
          font-size: 34px;
          font-weight: 400;
          font-style: italic;
          color: #1565c0;
        }

        .graduation-day-invite {
          max-width: 360px;
          margin: 18px auto 24px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 0.5px;
          color: #5c8bc0;
        }

        .graduation-day-details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-bottom: 22px;
        }

        .graduation-day-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 14px 22px;
          background: #e3f2fd;
          border-radius: 8px;
        }

        .graduation-day-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: #64b5f6;
        }

        .graduation-day-detail strong {
          font-size: 13px;
          font-weight: 400;
          color: #0d47a1;
        }

        .graduation-day-divider {
          width: 1px;
          height: 35px;
          background: #90caf9;
        }

        .graduation-day-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .graduation-day-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #1565c0;
        }

        .graduation-day-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #5c8bc0;
        }

        .graduation-day-location-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 5px;
          color: #1565c0;
          text-decoration: none;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .graduation-day-location-link:hover {
          opacity: 0.75;
          transform: translateY(-1px);
        }

        .graduation-day-message {
          max-width: 370px;
          margin: 18px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: #5c8bc0;
        }

        .graduation-day-footer {
          margin: 18px 0 0;
          font-family: Arial, sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #1976d2;
        }

        .graduation-day-rsvp {
          margin-top: 20px;
          padding: 11px 32px;
          background: #1565c0;
          border: 2px solid #1565c0;
          border-radius: 4px;
          color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .graduation-day-rsvp:hover {
          background: #ffffff;
          color: #1565c0;
          box-shadow: 0 6px 18px rgba(21, 101, 192, 0.2);
        }

        @media (max-width: 600px) {
          .graduation-day {
            padding: 18px;
          }

          .graduation-day-card {
            padding: 45px 25px;
          }

          .graduation-day-title {
            font-size: 30px;
          }

          .graduation-day-name {
            font-size: 28px;
          }

          .graduation-day-details {
            gap: 12px;
            flex-wrap: wrap;
          }

          .graduation-day-divider {
            display: none;
          }

          .graduation-day-tassel {
            right: 20px;
            font-size: 36px;
          }
        }
      `}</style>

      <div className="graduation-day">
        <span className="graduation-day-star graduation-day-star-one">★</span>
        <span className="graduation-day-star graduation-day-star-two">★</span>
        <span className="graduation-day-star graduation-day-star-three">★</span>
        <span className="graduation-day-star graduation-day-star-four">★</span>

        <div className="graduation-day-card">
          <div className="graduation-day-tassel">🎓</div>

          <div className="graduation-day-content">
            <p className="graduation-day-small">YOU ARE CORDIALLY INVITED</p>

            <div className="graduation-day-icon">🎓</div>

            <h1 className="graduation-day-title">
              {data.title || "Graduation Ceremony"}
            </h1>

            <p className="graduation-day-subtitle">A Milestone Achievement</p>

            <div className="graduation-day-line">
              <span />
              <b>✦</b>
              <span />
            </div>

            <p className="graduation-day-invite">
              Join us in celebrating this remarkable achievement
              and the beginning of a bright new chapter.
            </p>

            <div className="graduation-day-details">
              <div className="graduation-day-detail">
                <small>DATE</small>
                <strong>{data.eventDate || "DATE"}</strong>
              </div>

              <div className="graduation-day-divider" />

              <div className="graduation-day-detail">
                <small>TIME</small>
                <strong>{data.eventTime || "TIME"}</strong>
              </div>
            </div>

            <div className="graduation-day-venue">
              <strong>{data.venue || "VENUE"}</strong>
              <span>{data.address || "ADDRESS"}</span>

              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="graduation-day-location-link"
                >
                  <MapPin size={14} />
                  <span>View Location</span>
                </a>
              )}
            </div>

            {data.message && (
              <p className="graduation-day-message">{data.message}</p>
            )}

            <p className="graduation-day-footer">
              CONGRATULATIONS • CELEBRATE • INSPIRE
            </p>

            <button
              type="button"
              className="graduation-day-rsvp"
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

export default GraduationDay;
