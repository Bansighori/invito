import { MapPin } from "lucide-react";

function EngagementRose({ data, onRSVP }) {
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
        .engagement-rose {
          width: 100%;
          min-height: 650px;
          background: #f5ecec;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Georgia, "Times New Roman", serif;
          overflow: hidden;
        }

        .engagement-rose-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #fffaf9;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 40px;
          box-sizing: border-box;
          border-radius: 50% 50% 4px 4px;
          box-shadow: 0 18px 45px rgba(100, 60, 60, 0.12);
        }

        .engagement-rose-border {
          position: absolute;
          inset: 18px;
          border: 1px solid #dfc4c4;
          pointer-events: none;
        }

        .engagement-rose-flower {
          position: absolute;
          font-size: 42px;
          color: #b87878;
          opacity: 0.7;
          z-index: 1;
        }

        .engagement-rose-flower-one {
          top: 25px;
          left: 28px;
          transform: rotate(-20deg);
        }

        .engagement-rose-flower-two {
          top: 30px;
          right: 28px;
          transform: rotate(20deg);
        }

        .engagement-rose-flower-three {
          bottom: 25px;
          left: 30px;
          transform: rotate(15deg);
        }

        .engagement-rose-flower-four {
          bottom: 25px;
          right: 30px;
          transform: rotate(-15deg);
        }

        .engagement-rose-leaf {
          position: absolute;
          font-size: 38px;
          color: #8c9c87;
          opacity: 0.55;
        }

        .engagement-rose-leaf-one {
          top: 70px;
          left: 78px;
          transform: rotate(-35deg);
        }

        .engagement-rose-leaf-two {
          top: 72px;
          right: 78px;
          transform: rotate(145deg);
        }

        .engagement-rose-leaf-three {
          bottom: 68px;
          left: 80px;
          transform: rotate(-70deg);
        }

        .engagement-rose-leaf-four {
          bottom: 68px;
          right: 80px;
          transform: rotate(70deg);
        }

        .engagement-rose-content {
          width: 100%;
          max-width: 450px;
          text-align: center;
          position: relative;
          z-index: 3;
        }

        .engagement-rose-small {
          margin: 0 0 18px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 4px;
          color: #a87979;
        }

        .engagement-rose-icon {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .engagement-rose-title {
          margin: 0;
          font-size: 36px;
          font-weight: 400;
          color: #654e4e;
        }

        .engagement-rose-subtitle {
          margin: 10px 0 0;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #a89595;
        }

        .engagement-rose-line {
          width: 55px;
          height: 1px;
          background: #c89898;
          margin: 25px auto;
        }

        .engagement-rose-names {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .engagement-rose-names span {
          font-size: 39px;
          line-height: 1.1;
          font-weight: 400;
          color: #614c4c;
        }

        .engagement-rose-names em {
          font-size: 18px;
          font-weight: 400;
          font-style: italic;
          color: #b07878;
          margin: 2px 0;
        }

        .engagement-rose-text {
          max-width: 370px;
          margin: 17px auto 24px;
          font-family: Arial, sans-serif;
          font-size: 10px;
          line-height: 1.8;
          color: #918181;
        }

        .engagement-rose-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          margin-bottom: 22px;
        }

        .engagement-rose-detail {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .engagement-rose-detail small {
          font-family: Arial, sans-serif;
          font-size: 8px;
          letter-spacing: 2px;
          color: #aa9898;
        }

        .engagement-rose-detail strong {
          font-size: 13px;
          font-weight: 400;
          color: #665454;
        }

        .engagement-rose-divider {
          width: 1px;
          height: 35px;
          background: #ded0d0;
        }

        .engagement-rose-venue {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .engagement-rose-venue strong {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #765c5c;
        }

        .engagement-rose-venue span {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #a18f8f;
        }

        .engagement-rose-location {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 8px;
  color: #946767;
  font-family: Arial, sans-serif;
  font-size: 9px;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.engagement-rose-location:hover {
  color: #654e4e;
  text-decoration: underline;
}

        .engagement-rose-message {
          max-width: 380px;
          margin: 17px auto 0;
          font-size: 12px;
          line-height: 1.7;
          font-style: italic;
          color: #978383;
        }

        .engagement-rose-rsvp {
          margin-top: 22px;
          padding: 11px 30px;
          border: 1px solid #a87878;
          background: transparent;
          color: #946767;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .engagement-rose-rsvp:hover {
          background: #a87878;
          color: #ffffff;
        }

        @media (max-width: 600px) {
          .engagement-rose {
            padding: 18px;
          }

          .engagement-rose-card {
            padding: 45px 25px;
            border-radius: 45% 45% 4px 4px;
          }

          .engagement-rose-title {
            font-size: 31px;
          }

          .engagement-rose-names span {
            font-size: 32px;
          }

          .engagement-rose-details {
            gap: 17px;
          }

          .engagement-rose-leaf-one {
            left: 48px;
          }

          .engagement-rose-leaf-two {
            right: 48px;
          }

          .engagement-rose-flower {
            font-size: 32px;
          }
        }
      `}</style>

      <div className="engagement-rose">

        <div className="engagement-rose-card">

          <div className="engagement-rose-border" />

          <div className="engagement-rose-flower engagement-rose-flower-one">
            ❀
          </div>

          <div className="engagement-rose-flower engagement-rose-flower-two">
            ❀
          </div>

          <div className="engagement-rose-flower engagement-rose-flower-three">
            ❀
          </div>

          <div className="engagement-rose-flower engagement-rose-flower-four">
            ❀
          </div>

          <div className="engagement-rose-leaf engagement-rose-leaf-one">
            ❧
          </div>

          <div className="engagement-rose-leaf engagement-rose-leaf-two">
            ❧
          </div>

          <div className="engagement-rose-leaf engagement-rose-leaf-three">
            ❧
          </div>

          <div className="engagement-rose-leaf engagement-rose-leaf-four">
            ❧
          </div>

          <div className="engagement-rose-content">

            <p className="engagement-rose-small">
              YOU ARE CORDIALLY INVITED
            </p>

            <div className="engagement-rose-icon">
              💍
            </div>

            <h1 className="engagement-rose-title">
              Engagement
            </h1>

            <p className="engagement-rose-subtitle">
              A Celebration of Love
            </p>

            <div className="engagement-rose-line" />

            <h2 className="engagement-rose-names">

              <span>
                {data.brideName || "Bride"}
              </span>

              <em>
                &
              </em>

              <span>
                {data.groomName || "Groom"}
              </span>

            </h2>

            <p className="engagement-rose-text">
              Please join us as we celebrate
              the beginning of our forever
              together.
            </p>

            <div className="engagement-rose-details">

              <div className="engagement-rose-detail">
                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>
              </div>

              <div className="engagement-rose-divider" />

              <div className="engagement-rose-detail">
                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>
              </div>

            </div>

            <div className="engagement-rose-venue">

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
      className="engagement-rose-location"
    >
      <MapPin size={13} />
      <span>View Location</span>
    </a>
  )}

</div>

            {data.message && (
              <p className="engagement-rose-message">
                {data.message}
              </p>
            )}

            <button
              type="button"
              className="engagement-rose-rsvp"
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

export default EngagementRose;