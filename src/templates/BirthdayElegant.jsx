import { MapPin } from "lucide-react";

function BirthdayElegant({ data, onRSVP }) {
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
        .birthday-elegant {
          width: 100%;
          min-height: 650px;
          background: #eeeae3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
        }

        .birthday-elegant-card {
          width: 100%;
          max-width: 620px;
          min-height: 570px;
          background: #282725;
          color: #f4efe7;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 45px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .birthday-elegant-card::before {
          content: "";
          position: absolute;
          inset: 14px;
          border: 1px solid #8d806b;
          pointer-events: none;
        }

        .birthday-elegant-card::after {
          content: "";
          position: absolute;
          inset: 22px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          pointer-events: none;
        }

        .birthday-elegant-decoration {
          position: absolute;
          color: #b9a27b;
          font-size: 22px;
        }

        .birthday-elegant-decoration-one {
          top: 35px;
          left: 38px;
        }

        .birthday-elegant-decoration-two {
          top: 35px;
          right: 38px;
        }

        .birthday-elegant-decoration-three {
          bottom: 35px;
          left: 38px;
        }

        .birthday-elegant-decoration-four {
          bottom: 35px;
          right: 38px;
        }

        .birthday-elegant-content {
          width: 100%;
          max-width: 450px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .birthday-elegant-small {
          margin: 0 0 20px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 4px;
          color: #b9a27b;
        }

        .birthday-elegant-number {
          margin: 0;
          font-size: 82px;
          line-height: 0.9;
          font-weight: 400;
          color: #f4efe7;
        }

        .birthday-elegant-title {
          margin: 13px 0 0;
          font-family: Arial, sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 7px;
          text-transform: uppercase;
          color: #b9a27b;
        }

        .birthday-elegant-line {
          width: 60px;
          height: 1px;
          background: #b9a27b;
          margin: 28px auto;
        }

        .birthday-elegant-name {
          margin: 0;
          font-size: 42px;
          font-weight: 400;
          font-style: italic;
          color: #f4efe7;
        }

        .birthday-elegant-invite {
          margin: 15px auto 25px;
          max-width: 350px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 1.5px;
          color: #c3bdb2;
        }

        .birthday-elegant-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          margin-top: 20px;
        }

        .birthday-elegant-detail {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .birthday-elegant-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: #9f927e;
        }

        .birthday-elegant-detail strong {
          font-size: 14px;
          font-weight: 400;
          color: #f0ebe2;
        }

        .birthday-elegant-divider {
          width: 1px;
          height: 38px;
          background: #655e54;
        }

        .birthday-elegant-venue {
          margin-top: 25px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .birthday-elegant-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d1c5b1;
        }

        .birthday-elegant-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #999188;
        }

        .birthday-elegant-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 5px;
  color: #b9a27b;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.birthday-elegant-location-link:hover {
  opacity: 0.75;
  transform: translateY(-1px);
}.birthday-elegant-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 5px;
  color: #b9a27b;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.birthday-elegant-location-link:hover {
  opacity: 0.75;
  transform: translateY(-1px);
}

        .birthday-elegant-message {
          margin: 20px auto 0;
          max-width: 380px;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: #aaa298;
        }

        .birthday-elegant-rsvp {
          margin-top: 25px;
          padding: 11px 30px;
          background: transparent;
          border: 1px solid #b9a27b;
          color: #d7c7ad;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .birthday-elegant-rsvp:hover {
          background: #b9a27b;
          color: #282725;
        }

        @media (max-width: 600px) {
          .birthday-elegant {
            padding: 20px;
          }

          .birthday-elegant-card {
            padding: 50px 25px;
          }

          .birthday-elegant-number {
            font-size: 65px;
          }

          .birthday-elegant-name {
            font-size: 34px;
          }

          .birthday-elegant-title {
            font-size: 12px;
            letter-spacing: 5px;
          }

          .birthday-elegant-details {
            gap: 18px;
          }
        }
      `}</style>

      <div className="birthday-elegant">

        <div className="birthday-elegant-card">

          <div className="birthday-elegant-decoration birthday-elegant-decoration-one">
            ✦
          </div>

          <div className="birthday-elegant-decoration birthday-elegant-decoration-two">
            ✦
          </div>

          <div className="birthday-elegant-decoration birthday-elegant-decoration-three">
            ✦
          </div>

          <div className="birthday-elegant-decoration birthday-elegant-decoration-four">
            ✦
          </div>

          <div className="birthday-elegant-content">

            <p className="birthday-elegant-small">
              YOU ARE CORDIALLY INVITED
            </p>

            <h1 className="birthday-elegant-number">
              50
            </h1>

            <h2 className="birthday-elegant-title">
              Birthday Celebration
            </h2>

            <div className="birthday-elegant-line" />

            <h3 className="birthday-elegant-name">
              {data.hostName || "Birthday Person"}
            </h3>

            <p className="birthday-elegant-invite">
              Join us for an evening of celebration,
              laughter and wonderful memories.
            </p>

            <div className="birthday-elegant-details">

              <div className="birthday-elegant-detail">
                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>
              </div>

              <div className="birthday-elegant-divider" />

              <div className="birthday-elegant-detail">
                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>
              </div>

            </div>

            <div className="birthday-elegant-venue">

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
      className="birthday-elegant-location-link"
    >
      <MapPin size={14} />
      <span>View Location</span>
    </a>
  )}

</div>

            {data.message && (
              <p className="birthday-elegant-message">
                {data.message}
              </p>
            )}

            <button
              type="button"
              className="birthday-elegant-rsvp"
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

export default BirthdayElegant;