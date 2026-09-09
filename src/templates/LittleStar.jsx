import { MapPin } from "lucide-react";

function LittleStar({ data, onRSVP }) {
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
        .little-star {
          width: 100%;
          min-height: 650px;
          background: #e9edf7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          overflow: hidden;
        }

        .little-star-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #26334f;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border-radius: 20px;
          box-shadow: 0 18px 45px rgba(35, 48, 75, 0.22);
        }

        .little-star-card::before {
          content: "";
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 13px;
          pointer-events: none;
        }

        .little-star-moon {
          position: absolute;
          width: 105px;
          height: 105px;
          border-radius: 50%;
          background: #f5e8b8;
          top: -30px;
          right: -18px;
          box-shadow: 0 0 35px rgba(245, 232, 184, 0.2);
        }

        .little-star-moon::after {
          content: "";
          position: absolute;
          width: 105px;
          height: 105px;
          border-radius: 50%;
          background: #26334f;
          top: -15px;
          left: -20px;
        }

        .little-star-star {
          position: absolute;
          color: #f5e8b8;
          font-size: 18px;
          opacity: 0.85;
        }

        .little-star-one {
          top: 80px;
          left: 55px;
          font-size: 24px;
        }

        .little-star-two {
          top: 145px;
          left: 110px;
          font-size: 12px;
        }

        .little-star-three {
          top: 65px;
          right: 145px;
          font-size: 13px;
        }

        .little-star-four {
          top: 210px;
          right: 50px;
          font-size: 24px;
        }

        .little-star-five {
          bottom: 100px;
          left: 50px;
          font-size: 13px;
        }

        .little-star-six {
          bottom: 65px;
          left: 115px;
          font-size: 22px;
        }

        .little-star-seven {
          bottom: 85px;
          right: 55px;
          font-size: 14px;
        }

        .little-star-eight {
          bottom: 145px;
          right: 105px;
          font-size: 10px;
        }

        .little-star-content {
          width: 100%;
          max-width: 450px;
          text-align: center;
          position: relative;
          z-index: 3;
        }

        .little-star-small {
          margin: 0 0 18px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 4px;
          color: #d8c990;
        }

        .little-star-icon {
          font-size: 45px;
          margin-bottom: 10px;
        }

        .little-star-title {
          margin: 0;
          font-size: 45px;
          line-height: 1.1;
          font-weight: 400;
          color: #f8f2dc;
        }

        .little-star-subtitle {
          margin: 12px 0 0;
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #bfc7d8;
        }

        .little-star-line {
          width: 60px;
          height: 1px;
          background: #d8c990;
          margin: 25px auto;
        }

        .little-star-name {
          margin: 0;
          font-size: 32px;
          font-weight: 400;
          font-style: italic;
          color: #f5e8b8;
        }

        .little-star-text {
          max-width: 370px;
          margin: 16px auto 25px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 0.8px;
          color: #c4cada;
        }

        .little-star-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          margin-bottom: 23px;
        }

        .little-star-detail {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .little-star-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: #aeb8cb;
        }

        .little-star-detail strong {
          font-size: 13px;
          font-weight: 400;
          color: #f2eee2;
        }

        .little-star-divider {
          width: 1px;
          height: 35px;
          background: rgba(255, 255, 255, 0.2);
        }

        .little-star-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .little-star-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #e0d7b8;
        }

        .little-star-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #aeb8cb;
        }

        .little-star-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 5px;
  color: #d8c990;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.little-star-location-link:hover {
  opacity: 0.75;
  transform: translateY(-1px);
}

        .little-star-message {
          max-width: 380px;
          margin: 18px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: #b9c1d1;
        }

        .little-star-rsvp {
          margin-top: 22px;
          padding: 11px 30px;
          border: 1px solid #d8c990;
          background: transparent;
          color: #f1e7bd;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .little-star-rsvp:hover {
          background: #d8c990;
          color: #26334f;
        }

        @media (max-width: 600px) {
          .little-star {
            padding: 18px;
          }

          .little-star-card {
            padding: 45px 25px;
          }

          .little-star-title {
            font-size: 36px;
          }

          .little-star-name {
            font-size: 27px;
          }

          .little-star-details {
            gap: 17px;
          }

          .little-star-moon {
            width: 85px;
            height: 85px;
          }

          .little-star-moon::after {
            width: 85px;
            height: 85px;
          }
        }
      `}</style>

      <div className="little-star">

        <div className="little-star-card">

          <div className="little-star-moon" />

          <span className="little-star-star little-star-one">
            ★
          </span>

          <span className="little-star-star little-star-two">
            ✦
          </span>

          <span className="little-star-star little-star-three">
            ✧
          </span>

          <span className="little-star-star little-star-four">
            ★
          </span>

          <span className="little-star-star little-star-five">
            ✦
          </span>

          <span className="little-star-star little-star-six">
            ★
          </span>

          <span className="little-star-star little-star-seven">
            ✧
          </span>

          <span className="little-star-star little-star-eight">
            ✦
          </span>

          <div className="little-star-content">

            <p className="little-star-small">
              A LITTLE STAR IS ON THE WAY
            </p>

            <div className="little-star-icon">
              ⭐
            </div>

            <h1 className="little-star-title">
              Baby Shower
            </h1>

            <p className="little-star-subtitle">
              Twinkle Twinkle Little Star
            </p>

            <div className="little-star-line" />

            <h2 className="little-star-name">
              {data.hostName || "Mom & Dad"}
            </h2>

            <p className="little-star-text">
              Come celebrate with us as we
              prepare to welcome our little
              bundle of joy.
            </p>

            <div className="little-star-details">

              <div className="little-star-detail">
                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>
              </div>

              <div className="little-star-divider" />

              <div className="little-star-detail">
                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>
              </div>

            </div>

            <div className="little-star-venue">

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
      className="little-star-location-link"
    >
      <MapPin size={14} />
      <span>View Location</span>
    </a>
  )}

</div>

            {data.message && (
              <p className="little-star-message">
                {data.message}
              </p>
            )}

            <button
              type="button"
              className="little-star-rsvp"
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

export default LittleStar;