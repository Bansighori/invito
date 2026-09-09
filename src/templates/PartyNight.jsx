import { MapPin } from "lucide-react";

function PartyNight({ data, onRSVP }) {
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
        .party-night {
          width: 100%;
          min-height: 650px;
          background: #101014;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          overflow: hidden;
        }

        .party-night-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #17171d;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border: 1px solid #34343d;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
        }

        .party-night-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          opacity: 0.7;
        }

        .party-night-glow-one {
          width: 220px;
          height: 220px;
          background: #632c7e;
          top: -130px;
          left: -100px;
          box-shadow: 0 0 100px #632c7e;
        }

        .party-night-glow-two {
          width: 180px;
          height: 180px;
          background: #1c7080;
          bottom: -100px;
          right: -80px;
          box-shadow: 0 0 90px #1c7080;
        }

        .party-night-circle {
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .party-night-circle-two {
          width: 420px;
          height: 420px;
        }

        .party-night-star {
          position: absolute;
          color: #f4d87a;
          font-size: 16px;
          opacity: 0.9;
        }

        .party-night-star-one {
          top: 65px;
          left: 70px;
        }

        .party-night-star-two {
          top: 120px;
          right: 75px;
          font-size: 10px;
        }

        .party-night-star-three {
          bottom: 105px;
          left: 65px;
          font-size: 11px;
        }

        .party-night-star-four {
          bottom: 65px;
          right: 70px;
          font-size: 19px;
        }

        .party-night-content {
          width: 100%;
          max-width: 460px;
          text-align: center;
          position: relative;
          z-index: 3;
        }

        .party-night-top {
          margin: 0 0 18px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 5px;
          color: #aaaab7;
        }

        .party-night-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .party-night-title {
          margin: 0;
          font-size: 56px;
          line-height: 0.95;
          font-weight: 900;
          letter-spacing: -3px;
          text-transform: uppercase;
          color: #ffffff;
        }

        .party-night-title span {
          color: #f4d87a;
        }

        .party-night-subtitle {
          margin: 14px 0 0;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #a8a8b5;
        }

        .party-night-line {
          width: 70px;
          height: 2px;
          background: #f4d87a;
          margin: 28px auto;
        }

        .party-night-name {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 38px;
          font-weight: 400;
          font-style: italic;
          color: #ffffff;
        }

        .party-night-text {
          max-width: 380px;
          margin: 15px auto 25px;
          font-size: 10px;
          line-height: 1.8;
          letter-spacing: 1px;
          color: #aaaab7;
        }

        .party-night-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          margin-bottom: 22px;
        }

        .party-night-detail {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .party-night-detail small {
          font-size: 8px;
          letter-spacing: 2px;
          color: #747480;
        }

        .party-night-detail strong {
          font-size: 13px;
          font-weight: 600;
          color: #f2f2f4;
        }

        .party-night-divider {
          width: 1px;
          height: 35px;
          background: #41414b;
        }

        .party-night-venue {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .party-night-venue strong {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #f4d87a;
        }

        .party-night-venue span {
          font-size: 10px;
          color: #888894;
        }

        .party-night-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 5px;
  color: #f4d87a;
  text-decoration: none;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.party-night-location-link:hover {
  opacity: 0.75;
  transform: translateY(-1px);
}

        .party-night-message {
          max-width: 380px;
          margin: 18px auto 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: #9f9fa9;
        }

        .party-night-rsvp {
          margin-top: 24px;
          padding: 12px 32px;
          background: #f4d87a;
          border: 1px solid #f4d87a;
          color: #17171d;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .party-night-rsvp:hover {
          background: transparent;
          color: #f4d87a;
        }

        @media (max-width: 600px) {
          .party-night {
            padding: 18px;
          }

          .party-night-card {
            padding: 45px 25px;
          }

          .party-night-title {
            font-size: 43px;
          }

          .party-night-name {
            font-size: 31px;
          }

          .party-night-details {
            gap: 17px;
          }

          .party-night-circle {
            width: 230px;
            height: 230px;
          }

          .party-night-circle-two {
            width: 330px;
            height: 330px;
          }
        }
      `}</style>

      <div className="party-night">

        <div className="party-night-card">

          <div className="party-night-glow party-night-glow-one" />
          <div className="party-night-glow party-night-glow-two" />

          <div className="party-night-circle" />
          <div className="party-night-circle party-night-circle-two" />

          <span className="party-night-star party-night-star-one">
            ✦
          </span>

          <span className="party-night-star party-night-star-two">
            ✦
          </span>

          <span className="party-night-star party-night-star-three">
            ✦
          </span>

          <span className="party-night-star party-night-star-four">
            ★
          </span>

          <div className="party-night-content">

            <p className="party-night-top">
              SAVE THE NIGHT
            </p>

            <div className="party-night-icon">
              🎉
            </div>

            <h1 className="party-night-title">
              PARTY <span>NIGHT</span>
            </h1>

            <p className="party-night-subtitle">
              Music • Friends • Celebration
            </p>

            <div className="party-night-line" />

            <h2 className="party-night-name">
              {data.hostName || "Your Name"}
            </h2>

            <p className="party-night-text">
              Get ready for an unforgettable
              night filled with music, laughter
              and good vibes.
            </p>

            <div className="party-night-details">

              <div className="party-night-detail">
                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>
              </div>

              <div className="party-night-divider" />

              <div className="party-night-detail">
                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>
              </div>

            </div>

            <div className="party-night-venue">

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
      className="party-night-location-link"
    >
      <MapPin size={14} />
      <span>View Location</span>
    </a>
  )}

</div>

            {data.message && (
              <p className="party-night-message">
                {data.message}
              </p>
            )}

            <button
              type="button"
              className="party-night-rsvp"
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

export default PartyNight;