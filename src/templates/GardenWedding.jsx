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

        /* =========================================
           GARDEN WEDDING
        ========================================= */

        .garden-wedding {
          width: 650px;
          height: 850px;
          max-width: 100%;

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

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 45px 50px;
        }


        /* =========================================
           OUTER BORDER
        ========================================= */

        .garden-wedding::before {
          content: "";

          position: absolute;

          inset: 22px;

          border:
            1px solid
            #a7b59b;

          border-radius: 8px;

          pointer-events: none;
        }


        /* =========================================
           DECORATIVE LEAVES
        ========================================= */

        .garden-leaf {
          position: absolute;

          font-size: 65px;

          opacity: 0.4;

          color: #708568;

          pointer-events: none;
        }

        .garden-leaf-one {
          top: 25px;
          left: 25px;

          transform: rotate(-25deg);
        }

        .garden-leaf-two {
          top: 30px;
          right: 30px;

          transform: rotate(25deg);
        }

        .garden-leaf-three {
          bottom: 25px;
          left: 30px;

          transform: rotate(35deg);
        }

        .garden-leaf-four {
          bottom: 25px;
          right: 25px;

          transform: rotate(-35deg);
        }


        /* =========================================
           FLOWERS
        ========================================= */

        .garden-flower {
          position: absolute;

          color: #bd8e8e;

          font-size: 21px;

          opacity: 0.65;

          pointer-events: none;
        }

        .garden-flower-one {
          top: 105px;
          left: 80px;
        }

        .garden-flower-two {
          top: 120px;
          right: 85px;
        }

        .garden-flower-three {
          bottom: 105px;
          left: 85px;
        }

        .garden-flower-four {
          bottom: 95px;
          right: 80px;
        }


        /* =========================================
           CONTENT
        ========================================= */

        .garden-wedding-content {
          width: 100%;
          max-width: 450px;

          position: relative;
          z-index: 2;

          text-align: center;

          display: flex;
          flex-direction: column;
          align-items: center;
        }


        /* =========================================
           SMALL TITLE
        ========================================= */

        .garden-small-title {
          margin: 0 0 14px;

          font-family: Arial, sans-serif;

          font-size: 9px;

          font-weight: 600;

          letter-spacing: 3.5px;

          color: #7c8d70;
        }


        /* =========================================
           WELCOME
        ========================================= */

        .garden-welcome {
          margin: 0;

          font-size: 16px;

          font-weight: normal;

          font-style: italic;

          color: #75856c;
        }


        /* =========================================
           NAMES
        ========================================= */

        .garden-names {
          margin: 14px 0 0;

          font-size: 49px;

          line-height: 1;

          font-weight: normal;

          color: #43533e;
        }

        .garden-names span {
          display: block;
        }

        .garden-names em {
          display: block;

          margin: 6px 0;

          font-size: 21px;

          font-weight: normal;

          color: #b48787;
        }


        /* =========================================
           DIVIDER
        ========================================= */

        .garden-divider {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          margin: 20px auto;
        }

        .garden-divider span {
          width: 55px;

          height: 1px;

          background: #a7b59b;
        }

        .garden-divider b {
          font-size: 14px;

          font-weight: normal;

          color: #b48787;
        }


        /* =========================================
           INVITATION TEXT
        ========================================= */

        .garden-text {
          max-width: 350px;

          margin: 0 auto;

          font-size: 13px;

          line-height: 1.65;

          color: #687463;
        }


        /* =========================================
           DATE / TIME
        ========================================= */

        .garden-details {
          display: flex;

          justify-content: center;

          gap: 55px;

          margin-top: 25px;
        }

        .garden-detail {
          min-width: 110px;
        }

        .garden-detail small {
          display: block;

          margin-bottom: 5px;

          font-family: Arial, sans-serif;

          font-size: 8px;

          font-weight: 700;

          letter-spacing: 2.5px;

          color: #84967b;
        }

        .garden-detail strong {
          display: block;

          font-size: 15px;

          font-weight: normal;

          color: #485743;
        }


        /* =========================================
           LOCATION
        ========================================= */

        .garden-location {
          margin-top: 23px;

          text-align: center;
        }

        .garden-location strong {
          display: block;

          font-size: 18px;

          font-weight: normal;

          color: #4b5c45;
        }

        .garden-location-address {
          display: block;

          margin-top: 5px;

          font-family: Arial, sans-serif;

          font-size: 10px;

          color: #7c8678;
        }


        /* =========================================
           GOOGLE MAP LINK
        ========================================= */

        .garden-location-link {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 5px;

          margin-top: 8px;

          color: #718366;

          text-decoration: none;

          font-family: Arial, sans-serif;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.8px;

          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }

        .garden-location-link:hover {
          color: #4f6047;

          transform: translateY(-1px);
        }

        .garden-location-link svg {
          flex-shrink: 0;
        }


        /* =========================================
           MESSAGE
        ========================================= */

        .garden-message {
          max-width: 350px;

          margin: 14px auto 0;

          font-size: 12px;

          line-height: 1.55;

          font-style: italic;

          color: #778274;
        }


        /* =========================================
           FOOTER
        ========================================= */

        .garden-footer {
          margin: 18px 0 0;

          font-family: Arial, sans-serif;

          font-size: 8px;

          font-weight: 600;

          letter-spacing: 2.5px;

          color: #8b9a82;
        }


        /* =========================================
           RSVP
        ========================================= */

        .garden-rsvp-button {
          margin-top: 15px;

          padding: 10px 30px;

          border:
            1px solid
            #718366;

          border-radius: 25px;

          background: #718366;

          color: #ffffff;

          font-family: Arial, sans-serif;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 2.5px;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .garden-rsvp-button:hover {
          background: #58694f;

          transform: translateY(-2px);
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 700px) {

          .garden-wedding {
            width: 100%;

            height: auto;

            min-height: 100vh;

            padding: 40px 25px;
          }

          .garden-wedding::before {
            inset: 12px;
          }

          .garden-names {
            font-size: 40px;
          }

          .garden-details {
            gap: 25px;
          }

          .garden-leaf {
            font-size: 50px;
          }

          .garden-flower-one {
            left: 45px;
          }

          .garden-flower-two {
            right: 45px;
          }

          .garden-flower-three {
            left: 45px;
          }

          .garden-flower-four {
            right: 45px;
          }
        }

      `}</style>


      <div className="garden-wedding">

        {/* Decorative leaves */}

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


        {/* Decorative flowers */}

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


        {/* Main content */}

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
            Invite you to celebrate their love
            and join them for a beautiful day
            surrounded by family and friends.
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

            <span className="garden-location-address">
              {data.address || "ADDRESS"}
            </span>


            {locationUrl && (

              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="garden-location-link"
              >

                <MapPin size={15} />

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