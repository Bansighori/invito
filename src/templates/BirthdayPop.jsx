import { MapPin } from "lucide-react";

function BirthdayPop({ data, onRSVP }) {

  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .birthday-pop {
          width: 100%;
          min-height: 650px;
          background: #fff7ed;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .birthday-pop-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          box-shadow: 0 15px 45px rgba(80, 55, 30, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px 40px;
          box-sizing: border-box;
        }

        .birthday-pop-circle-one {
          position: absolute;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: #ffe0c2;
          top: -75px;
          left: -70px;
        }

        .birthday-pop-circle-two {
          position: absolute;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: #dcefdc;
          bottom: -50px;
          right: -35px;
        }

        .birthday-pop-circle-three {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #f4d7e8;
          top: 55px;
          right: 35px;
        }

        .birthday-pop-star-one {
          position: absolute;
          top: 105px;
          left: 35px;
          font-size: 30px;
          color: #e7b45d;
          transform: rotate(15deg);
        }

        .birthday-pop-star-two {
          position: absolute;
          bottom: 75px;
          left: 55px;
          font-size: 22px;
          color: #b68bc4;
        }

        .birthday-pop-content {
          width: 100%;
          max-width: 460px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .birthday-pop-top {
          margin: 0 0 15px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #a56f4e;
        }

        .birthday-pop-cake {
          font-size: 58px;
          margin-bottom: 8px;
          animation: birthdayPopFloat 3s ease-in-out infinite;
        }

        @keyframes birthdayPopFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        .birthday-pop-title {
          margin: 0;
          font-size: 52px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -2px;
          color: #3b3330;
        }

        .birthday-pop-subtitle {
          margin: 12px 0 28px;
          font-size: 15px;
          color: #8d817a;
          letter-spacing: 1px;
        }

        .birthday-pop-name {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 42px;
          font-weight: 400;
          font-style: italic;
          color: #9a6249;
        }

        .birthday-pop-divider {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 24px 0;
        }

        .birthday-pop-divider span {
          width: 55px;
          height: 1px;
          background: #e1d5cb;
        }

        .birthday-pop-divider b {
          font-size: 14px;
          color: #d3a05c;
        }

        .birthday-pop-details {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }

        .birthday-pop-detail {
          min-width: 125px;
          padding: 14px 18px;
          border-radius: 14px;
          background: #fff5e8;
          box-sizing: border-box;
        }

        .birthday-pop-detail small {
          display: block;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #aa9588;
          margin-bottom: 6px;
        }

        .birthday-pop-detail strong {
          font-size: 13px;
          font-weight: 700;
          color: #514640;
        }

        .birthday-pop-venue {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 10px;
        }

        .birthday-pop-venue strong {
          font-size: 12px;
          letter-spacing: 1px;
          color: #514640;
        }

        .birthday-pop-venue span {
          font-size: 11px;
          color: #958981;
        }

        .birthday-pop-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 5px;
  color: #9a6249;
  text-decoration: none;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.birthday-pop-location-link:hover {
  opacity: 0.75;
  transform: translateY(-1px);
}

        .birthday-pop-message {
          margin: 20px auto 0;
          max-width: 390px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
          line-height: 1.7;
          font-style: italic;
          color: #82756e;
        }

        .birthday-pop-footer {
          margin: 22px 0 0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #b27a5a;
        }

        .birthday-pop-rsvp {
          margin-top: 22px;
          padding: 12px 30px;
          border: none;
          border-radius: 30px;
          background: #9a6249;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: transform 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .birthday-pop-rsvp:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(154, 98, 73, 0.25);
        }

        @media (max-width: 600px) {
          .birthday-pop {
            padding: 18px;
          }

          .birthday-pop-card {
            padding: 45px 22px;
            min-height: 600px;
          }

          .birthday-pop-title {
            font-size: 40px;
          }

          .birthday-pop-name {
            font-size: 34px;
          }

          .birthday-pop-cake {
            font-size: 48px;
          }

          .birthday-pop-circle-three {
            right: -20px;
          }
        }
      `}</style>

      <div className="birthday-pop">

        <div className="birthday-pop-card">

          <div className="birthday-pop-circle-one" />
          <div className="birthday-pop-circle-two" />
          <div className="birthday-pop-circle-three" />

          <div className="birthday-pop-star-one">
            ✦
          </div>

          <div className="birthday-pop-star-two">
            ✦
          </div>

          <div className="birthday-pop-content">

            <p className="birthday-pop-top">
              YOU'RE INVITED TO
            </p>

            <div className="birthday-pop-cake">
              🎂
            </div>

            <h1 className="birthday-pop-title">
              BIRTHDAY
            </h1>

            <p className="birthday-pop-subtitle">
              LET'S CELEBRATE
            </p>

            <h2 className="birthday-pop-name">
              {data.hostName || "Birthday Person"}
            </h2>

            <div className="birthday-pop-divider">
              <span />
              <b>✦</b>
              <span />
            </div>

            <div className="birthday-pop-details">

              <div className="birthday-pop-detail">
                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate || "DATE"}
                </strong>
              </div>

              <div className="birthday-pop-detail">
                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime || "TIME"}
                </strong>
              </div>

            </div>

            <div className="birthday-pop-venue">

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
      className="birthday-pop-location-link"
    >
      <MapPin size={14} />
      <span>View Location</span>
    </a>
  )}

</div>

            {data.message && (
              <p className="birthday-pop-message">
                {data.message}
              </p>
            )}

            <p className="birthday-pop-footer">
              CAKE • MUSIC • FUN • MEMORIES
            </p>

            <button
              type="button"
              className="birthday-pop-rsvp"
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

export default BirthdayPop;