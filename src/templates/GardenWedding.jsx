import { MapPin } from "lucide-react";

function GardenWedding({ data, onRSVP }) {
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
        .garden-wedding {
          width: 650px;
          min-height: 850px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(183, 205, 173, 0.45),
              transparent 25%
            ),
            radial-gradient(
              circle at 85% 75%,
              rgba(221, 194, 169, 0.4),
              transparent 28%
            ),
            #f8f5ec;

          color: #40513b;
          font-family: Georgia, "Times New Roman", serif;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 60px;
        }

        .garden-wedding::before {
          content: "";
          position: absolute;
          inset: 28px;

          border: 1px solid #a7b59b;

          border-radius: 8px;

          pointer-events: none;
        }

        .garden-leaf {
          position: absolute;

          font-size: 75px;

          opacity: 0.45;

          color: #708568;
        }

        .garden-leaf-one {
          top: 35px;
          left: 30px;

          transform: rotate(-25deg);
        }

        .garden-leaf-two {
          top: 45px;
          right: 35px;

          transform: rotate(25deg);
        }

        .garden-leaf-three {
          bottom: 35px;
          left: 35px;

          transform: rotate(35deg);
        }

        .garden-leaf-four {
          bottom: 30px;
          right: 30px;

          transform: rotate(-35deg);
        }

        .garden-flower {
          position: absolute;

          color: #bd8e8e;

          font-size: 25px;

          opacity: 0.7;
        }

        .garden-flower-one {
          top: 125px;
          left: 95px;
        }

        .garden-flower-two {
          top: 145px;
          right: 100px;
        }

        .garden-flower-three {
          bottom: 130px;
          left: 100px;
        }

        .garden-flower-four {
          bottom: 110px;
          right: 95px;
        }

        .garden-wedding-content {
          width: 100%;
          max-width: 470px;

          position: relative;
          z-index: 2;

          text-align: center;
        }

        .garden-small-title {
          margin: 0 0 20px;

          font-family: Arial, sans-serif;
          font-size: 10px;
          font-weight: 600;

          letter-spacing: 4px;

          color: #7c8d70;
        }

        .garden-welcome {
          margin: 0;

          font-size: 17px;
          font-weight: normal;

          font-style: italic;

          color: #75856c;
        }

        .garden-names {
          margin: 20px 0 0;

          font-size: 55px;
          line-height: 1.05;
          font-weight: normal;

          color: #43533e;
        }

        .garden-names span {
          display: block;
        }

        .garden-names em {
          display: block;

          margin: 8px 0;

          font-size: 23px;
          font-weight: normal;

          color: #b48787;
        }

        .garden-divider {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 12px;

          margin: 28px auto;
        }

        .garden-divider span {
          width: 65px;
          height: 1px;

          background: #a7b59b;
        }

        .garden-divider b {
          font-size: 15px;
          font-weight: normal;

          color: #b48787;
        }

        .garden-text {
          max-width: 370px;

          margin: 0 auto;

          font-size: 14px;
          line-height: 1.8;

          color: #687463;
        }

        .garden-details {
          display: flex;

          justify-content: center;

          gap: 50px;

          margin-top: 32px;
        }

        .garden-detail {
          min-width: 120px;
        }

        .garden-detail small {
          display: block;

          margin-bottom: 7px;

          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 700;

          letter-spacing: 3px;

          color: #84967b;
        }

        .garden-detail strong {
          display: block;

          font-size: 16px;
          font-weight: normal;

          color: #485743;
        }

        .garden-location {
          margin-top: 30px;
        }

        .garden-location strong {
          display: block;

          font-size: 19px;
          font-weight: normal;

          color: #4b5c45;
        }

        .garden-location span {
          display: block;

          margin-top: 6px;

          font-family: Arial, sans-serif;
          font-size: 11px;

          color: #7c8678;
        }

        .garden-location-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  margin-top: 12px;

  color: #718366;
  text-decoration: none;

  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: 600;

  letter-spacing: 1px;

  transition: all 0.2s ease;
}

.garden-location-link:hover {
  color: #4f6047;
  transform: translateY(-1px);
}

.garden-location-link svg {
  flex-shrink: 0;
}

        .garden-message {
          max-width: 380px;

          margin: 22px auto 0;

          font-size: 13px;
          line-height: 1.7;

          font-style: italic;

          color: #778274;
        }

        .garden-footer {
          margin: 28px 0 0;

          font-family: Arial, sans-serif;
          font-size: 9px;
          font-weight: 600;

          letter-spacing: 3px;

          color: #8b9a82;
        }

        .garden-rsvp-button {
          margin-top: 23px;

          padding: 12px 35px;

          border: 1px solid #718366;
          border-radius: 25px;

          background: #718366;
          color: #ffffff;

          font-family: Arial, sans-serif;
          font-size: 10px;
          font-weight: 700;

          letter-spacing: 3px;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .garden-rsvp-button:hover {
          background: #58694f;

          transform: translateY(-2px);
        }

        @media (max-width: 700px) {
          .garden-wedding {
            width: 100%;
            min-height: 100vh;

            padding: 45px 30px;
          }

          .garden-wedding::before {
            inset: 15px;
          }

          .garden-names {
            font-size: 42px;
          }

          .garden-details {
            gap: 20px;
          }
        }
      `}</style>


      <div className="garden-wedding">

        <div className="garden-leaf garden-leaf-one">
          ❧
        </div>

        <div className="garden-leaf garden-leaf-two">
          ❧
        </div>

        <div className="garden-leaf garden-leaf-three">
          ❧
        </div>

        <div className="garden-leaf garden-leaf-four">
          ❧
        </div>


        <div className="garden-flower garden-flower-one">
          ✿
        </div>

        <div className="garden-flower garden-flower-two">
          ❀
        </div>

        <div className="garden-flower garden-flower-three">
          ✿
        </div>

        <div className="garden-flower garden-flower-four">
          ❀
        </div>


        <div className="garden-wedding-content">

          <p className="garden-small-title">
            A BEAUTIFUL DAY • A BEAUTIFUL BEGINNING
          </p>

          <p className="garden-welcome">
            Together with their families
          </p>


          <h1 className="garden-names">

            <span>
              {data.brideName || "Bride"}
            </span>

            <em>
              &
            </em>

            <span>
              {data.groomName || "Groom"}
            </span>

          </h1>


          <div className="garden-divider">

            <span />

            <b>
              ❀
            </b>

            <span />

          </div>


          <p className="garden-text">
            Invite you to celebrate their
            love and join them for a beautiful
            day surrounded by family and friends.
          </p>


          <div className="garden-details">

            <div className="garden-detail">

              <small>
                DATE
              </small>

              <strong>
                {data.eventDate || "DATE"}
              </strong>

            </div>


            <div className="garden-detail">

              <small>
                TIME
              </small>

              <strong>
                {data.eventTime || "TIME"}
              </strong>

            </div>

          </div>


          <div className="garden-location">

  <strong>
    {data.venue || "GARDEN VENUE"}
  </strong>

  <span>
    {data.address || "ADDRESS"}
  </span>

  {locationUrl && (
    <a
      href={locationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="garden-location-link"
    >
      <MapPin size={16} />
      <span>
        View Location
      </span>
    </a>
  )}

</div>


          {data.message && (
            <p className="garden-message">
              {data.message}
            </p>
          )}


          <p className="garden-footer">
            LOVE GROWS HERE
          </p>


          <button
            type="button"
            className="garden-rsvp-button"
            onClick={onRSVP}
          >
            RSVP
          </button>

        </div>

      </div>
    </>
  );
}

export default GardenWedding;