import { MapPin } from "lucide-react";

function BabyBloom({ data, onRSVP }) {
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
        .baby-bloom {
          width: 100%;
          min-height: 650px;
          background: #f7f3ef;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          position: relative;
          overflow: hidden;
        }

        .baby-bloom-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #fffdfb;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border-radius: 4px;
          box-shadow: 0 15px 40px rgba(100, 80, 70, 0.10);
        }

        .baby-bloom-card::before {
          content: "";
          position: absolute;
          inset: 14px;
          border: 1px solid #ded2ca;
          pointer-events: none;
        }

        .baby-bloom-card::after {
          content: "";
          position: absolute;
          inset: 23px;
          border: 1px solid #eee5df;
          pointer-events: none;
        }

        .baby-bloom-flower {
          position: absolute;
          font-size: 28px;
          color: #c89c9c;
          opacity: 0.8;
        }

        .baby-bloom-flower-one {
          top: 35px;
          left: 35px;
          transform: rotate(-15deg);
        }

        .baby-bloom-flower-two {
          top: 48px;
          right: 38px;
          font-size: 22px;
          transform: rotate(20deg);
        }

        .baby-bloom-flower-three {
          bottom: 38px;
          left: 42px;
          font-size: 23px;
          transform: rotate(15deg);
        }

        .baby-bloom-flower-four {
          bottom: 35px;
          right: 38px;
          font-size: 30px;
          transform: rotate(-20deg);
        }

        .baby-bloom-leaf {
          position: absolute;
          font-size: 30px;
          color: #9fae9c;
          opacity: 0.7;
        }

        .baby-bloom-leaf-one {
          top: 75px;
          left: 75px;
          transform: rotate(-35deg);
        }

        .baby-bloom-leaf-two {
          bottom: 70px;
          right: 70px;
          transform: rotate(145deg);
        }

        .baby-bloom-content {
          width: 100%;
          max-width: 450px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .baby-bloom-small {
          margin: 0 0 18px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          color: #aa8c82;
        }

        .baby-bloom-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 17px;
          border-radius: 50%;
          background: #f4e6e2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
        }

        .baby-bloom-title {
          margin: 0;
          font-size: 42px;
          line-height: 1.1;
          font-weight: 400;
          color: #63544f;
        }

        .baby-bloom-subtitle {
          margin: 10px 0 0;
          font-family: Arial, sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #aa8c82;
        }

        .baby-bloom-line {
          width: 55px;
          height: 1px;
          background: #c6aaa1;
          margin: 25px auto;
        }

        .baby-bloom-name {
          margin: 0;
          font-size: 32px;
          font-weight: 400;
          font-style: italic;
          color: #77645e;
        }

        .baby-bloom-invite {
          max-width: 360px;
          margin: 16px auto 25px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 1px;
          color: #92837d;
        }

        .baby-bloom-details {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 25px;
          margin-bottom: 23px;
        }

        .baby-bloom-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .baby-bloom-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: #aa9a94;
        }

        .baby-bloom-detail strong {
          font-size: 13px;
          font-weight: 400;
          color: #665954;
        }

        .baby-bloom-divider {
          width: 1px;
          height: 35px;
          background: #ddd1cb;
        }

        .baby-bloom-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .baby-bloom-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #6f5e57;
        }

        .baby-bloom-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #9b8d86;
        }

        .baby-bloom-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 5px;
  color: #a9857d;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.baby-bloom-location-link:hover {
  opacity: 0.75;
  transform: translateY(-1px);
}

        .baby-bloom-message {
          max-width: 370px;
          margin: 18px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: #91817b;
        }

        .baby-bloom-rsvp {
          margin-top: 22px;
          padding: 11px 29px;
          background: #a9857d;
          border: 1px solid #a9857d;
          color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .baby-bloom-rsvp:hover {
          background: #ffffff;
          color: #a9857d;
        }

        @media (max-width: 600px) {
          .baby-bloom {
            padding: 18px;
          }

          .baby-bloom-card {
            padding: 45px 25px;
          }

          .baby-bloom-title {
            font-size: 34px;
          }

          .baby-bloom-name {
            font-size: 28px;
          }

          .baby-bloom-details {
            gap: 17px;
          }

          .baby-bloom-leaf-one {
            left: 45px;
          }

          .baby-bloom-leaf-two {
            right: 45px;
          }
        }
      `}</style>

      <div className="baby-bloom">

        <div className="baby-bloom-card">

          <div className="baby-bloom-flower baby-bloom-flower-one">
            ✿
          </div>

          <div className="baby-bloom-flower baby-bloom-flower-two">
            ✾
          </div>

          <div className="baby-bloom-flower baby-bloom-flower-three">
            ❀
          </div>

          <div className="baby-bloom-flower baby-bloom-flower-four">
            ✿
          </div>

          <div className="baby-bloom-leaf baby-bloom-leaf-one">
            ❧
          </div>

          <div className="baby-bloom-leaf baby-bloom-leaf-two">
            ❧
          </div>

          <div className="baby-bloom-content">

            <p className="baby-bloom-small">
              A LITTLE CELEBRATION
            </p>

            <div className="baby-bloom-icon">
              🍼
            </div>

            <h1 className="baby-bloom-title">
              Baby Shower
            </h1>

            <p className="baby-bloom-subtitle">
              A Sweet New Beginning
            </p>

            <div className="baby-bloom-line" />

            <h2 className="baby-bloom-name">
              {data.hostName || "Mom & Dad"}
            </h2>

            <p className="baby-bloom-invite">
              Please join us as we celebrate
              the upcoming arrival of our
              little one.
            </p>

            <div className="baby-bloom-details">

              <div className="baby-bloom-detail">
                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>
              </div>

              <div className="baby-bloom-divider" />

              <div className="baby-bloom-detail">
                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>
              </div>

            </div>

            <div className="baby-bloom-venue">

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
      className="baby-bloom-location-link"
    >
      <MapPin size={14} />
      <span>View Location</span>
    </a>
  )}

</div>

            {data.message && (
              <p className="baby-bloom-message">
                {data.message}
              </p>
            )}

            <button
              type="button"
              className="baby-bloom-rsvp"
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

export default BabyBloom;