import { MapPin } from "lucide-react";

function CorporateEvent({ data, onRSVP }) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .corporate-event {
          width: 100%;
          min-height: 650px;
          background: #eef1f5;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Arial, Helvetica, sans-serif;
          overflow: hidden;
        }

        .corporate-event-card {
          width: 100%;
          max-width: 650px;
          min-height: 580px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          box-shadow: 0 20px 45px rgba(25, 35, 50, 0.12);
        }

        .corporate-event-top {
          height: 10px;
          width: 100%;
          background: #26364a;
        }

        .corporate-event-content {
          padding: 55px 60px 45px;
          position: relative;
          z-index: 2;
        }

        .corporate-event-label {
          display: inline-block;
          margin-bottom: 20px;
          padding: 7px 14px;
          border: 1px solid #d4a84f;
          color: #a57c2f;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
        }

        .corporate-event-title {
          margin: 0;
          max-width: 450px;
          font-size: 43px;
          line-height: 1.08;
          font-weight: 700;
          color: #26364a;
        }

        .corporate-event-subtitle {
          margin: 18px 0 0;
          max-width: 430px;
          color: #718096;
          font-size: 13px;
          line-height: 1.7;
        }

        .corporate-event-line {
          width: 55px;
          height: 3px;
          background: #d4a84f;
          margin: 28px 0;
        }

        .corporate-event-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-top: 10px;
          padding: 24px 0;
          border-top: 1px solid #e5e9ee;
          border-bottom: 1px solid #e5e9ee;
        }

        .corporate-event-detail {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .corporate-event-detail small {
          color: #9aa4b1;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .corporate-event-detail strong {
          color: #34465c;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
        }

        .corporate-event-venue {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .corporate-event-venue small {
          color: #9aa4b1;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .corporate-event-venue strong {
          color: #34465c;
          font-size: 15px;
          font-weight: 600;
        }

        .corporate-event-venue span {
          color: #7b8795;
          font-size: 11px;
        }

        .corporate-event-location {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 3px;
  color: #a57c2f;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.corporate-event-location:hover {
  color: #26364a;
  text-decoration: underline;
}

        .corporate-event-message {
          max-width: 480px;
          margin: 25px 0 0;
          color: #7b8795;
          font-size: 11px;
          line-height: 1.7;
        }

        .corporate-event-rsvp {
          margin-top: 28px;
          padding: 13px 30px;
          border: none;
          background: #26364a;
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .corporate-event-rsvp:hover {
          background: #d4a84f;
        }

        .corporate-event-decoration {
          position: absolute;
          right: -80px;
          top: 90px;
          width: 230px;
          height: 230px;
          border: 1px solid #d9dee5;
          transform: rotate(45deg);
          pointer-events: none;
        }

        .corporate-event-decoration-inner {
          position: absolute;
          right: -35px;
          top: 135px;
          width: 140px;
          height: 140px;
          border: 1px solid #e4c983;
          transform: rotate(45deg);
          pointer-events: none;
        }

        .corporate-event-number {
          position: absolute;
          right: 38px;
          top: 125px;
          color: #edf0f3;
          font-size: 95px;
          line-height: 1;
          font-weight: 700;
          pointer-events: none;
        }

        .corporate-event-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 7px;
          background: #d4a84f;
        }

        @media (max-width: 600px) {
          .corporate-event {
            padding: 18px;
          }

          .corporate-event-content {
            padding: 45px 30px 40px;
          }

          .corporate-event-title {
            font-size: 34px;
          }

          .corporate-event-details {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .corporate-event-number {
            right: 20px;
            top: 135px;
            font-size: 70px;
          }

          .corporate-event-decoration {
            right: -110px;
          }
        }
      `}</style>

      <div className="corporate-event">

        <div className="corporate-event-card">

          <div className="corporate-event-top" />

          <div className="corporate-event-decoration" />
          <div className="corporate-event-decoration-inner" />

          <div className="corporate-event-number">
            01
          </div>

          <div className="corporate-event-content">

            <div className="corporate-event-label">
              Professional Event
            </div>

            <h1 className="corporate-event-title">
              {data.title || "Corporate Event"}
            </h1>

            <p className="corporate-event-subtitle">
              You are invited to join us for an
              inspiring gathering focused on
              meaningful conversations,
              collaboration and new opportunities.
            </p>

            <div className="corporate-event-line" />

            <div className="corporate-event-details">

              <div className="corporate-event-detail">
                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>
              </div>

              <div className="corporate-event-detail">
                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>
              </div>

            </div>

            <div className="corporate-event-venue">

  <small>
    VENUE
  </small>

  <strong>
    {data.venue || "Event Venue"}
  </strong>

  <span>
    {data.address || "Event Address"}
  </span>

  {locationUrl && (
    <a
      href={locationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="corporate-event-location"
    >
      <MapPin size={13} />
      <span>View Location</span>
    </a>
  )}

</div>

            {data.message && (
              <p className="corporate-event-message">
                {data.message}
              </p>
            )}

            <button
              type="button"
              className="corporate-event-rsvp"
              onClick={onRSVP}
            >
              Confirm Attendance
            </button>

          </div>

          <div className="corporate-event-footer" />

        </div>

      </div>
    </>
  );
}

export default CorporateEvent;