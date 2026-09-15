import { MapPin } from "lucide-react";

function RoyalWedding({ data, onRSVP }) {

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
           ROYAL WEDDING
        ========================================= */

        .royal-wedding {
          width: 650px;
          height: 850px;
          max-width: 100%;

          box-sizing: border-box;
          position: relative;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 15%,
              rgba(255, 255, 255, 0.9),
              transparent 28%
            ),
            linear-gradient(
              145deg,
              #f8f0df 0%,
              #fffaf0 45%,
              #ead9b7 100%
            );

          color: #342516;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          display: flex;

          justify-content: center;

          align-items: center;

          padding: 45px 50px;
        }


        /* =========================================
           BORDERS
        ========================================= */

        .royal-wedding::before {
          content: "";

          position: absolute;

          inset: 20px;

          border:
            2px solid
            #b18a45;

          pointer-events: none;
        }

        .royal-wedding::after {
          content: "";

          position: absolute;

          inset: 29px;

          border:
            1px solid
            rgba(177, 138, 69, 0.55);

          pointer-events: none;
        }


        /* =========================================
           CORNERS
        ========================================= */

        .royal-corner {
          position: absolute;

          width: 75px;

          height: 75px;

          border-color: #b18a45;

          border-style: solid;

          opacity: 0.7;

          pointer-events: none;
        }

        .royal-corner-one {
          top: 30px;
          left: 30px;

          border-width:
            3px 0 0 3px;
        }

        .royal-corner-two {
          top: 30px;
          right: 30px;

          border-width:
            3px 3px 0 0;
        }

        .royal-corner-three {
          bottom: 30px;
          left: 30px;

          border-width:
            0 0 3px 3px;
        }

        .royal-corner-four {
          bottom: 30px;
          right: 30px;

          border-width:
            0 3px 3px 0;
        }


        /* =========================================
           CONTENT
        ========================================= */

        .royal-wedding-content {
          width: 100%;

          max-width: 450px;

          text-align: center;

          position: relative;

          z-index: 2;

          display: flex;

          flex-direction: column;

          align-items: center;
        }


        /* =========================================
           CROWN
        ========================================= */

        .royal-crown {
          font-size: 34px;

          margin-bottom: 9px;

          color: #b18a45;

          line-height: 1;
        }


        /* =========================================
           SMALL TITLE
        ========================================= */

        .royal-small-title {
          margin: 0 0 17px;

          font-family: Arial, sans-serif;

          font-size: 9px;

          font-weight: 600;

          letter-spacing: 4px;

          color: #8d6b35;
        }


        /* =========================================
           TITLE
        ========================================= */

        .royal-wedding-title {
          margin: 0;

          font-size: 20px;

          font-weight: normal;

          letter-spacing: 5px;

          text-transform: uppercase;

          color: #5d4425;
        }


        /* =========================================
           DIVIDER
        ========================================= */

        .royal-divider {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          margin: 18px auto;
        }

        .royal-divider span {
          display: block;

          width: 55px;

          height: 1px;

          background: #b18a45;
        }

        .royal-divider b {
          font-size: 15px;

          font-weight: normal;

          color: #b18a45;
        }


        /* =========================================
           NAMES
        ========================================= */

        .royal-names {
          margin: 0;

          display: flex;

          flex-direction: column;

          gap: 4px;

          font-size: 48px;

          line-height: 0.98;

          font-weight: normal;

          color: #38281a;
        }

        .royal-names span {
          display: block;
        }

        .royal-names em {
          font-size: 22px;

          font-style: italic;

          color: #b18a45;
        }


        /* =========================================
           INVITATION TEXT
        ========================================= */

        .royal-invitation-text {
          margin: 19px auto 0;

          max-width: 360px;

          font-size: 13px;

          line-height: 1.65;

          color: #725d42;
        }


        /* =========================================
           DATE / TIME
        ========================================= */

        .royal-details {
          display: flex;

          justify-content: center;

          gap: 40px;

          margin-top: 24px;
        }

        .royal-detail {
          min-width: 115px;
        }

        .royal-detail small {
          display: block;

          margin-bottom: 5px;

          font-family: Arial, sans-serif;

          font-size: 8px;

          font-weight: 700;

          letter-spacing: 2.5px;

          color: #9a7842;
        }

        .royal-detail strong {
          display: block;

          font-size: 15px;

          font-weight: normal;

          color: #3d2b1b;
        }


        /* =========================================
           LOCATION
        ========================================= */

        .royal-location {
          margin-top: 22px;

          text-align: center;
        }

        .royal-location strong {
          display: block;

          font-size: 18px;

          font-weight: normal;

          color: #4a341f;
        }

        .royal-location-address {
          display: block;

          margin-top: 5px;

          font-family: Arial, sans-serif;

          font-size: 10px;

          letter-spacing: 0.5px;

          color: #8b765d;
        }


        /* =========================================
           GOOGLE MAP LINK
        ========================================= */

        .royal-location-link {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 5px;

          margin-top: 8px;

          color: #9a7842;

          text-decoration: none;

          font-family: Arial, sans-serif;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 0.8px;

          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }

        .royal-location-link:hover {
          color: #765625;

          transform: translateY(-1px);
        }

        .royal-location-link svg {
          flex-shrink: 0;
        }


        /* =========================================
           MESSAGE
        ========================================= */

        .royal-message {
          max-width: 360px;

          margin: 13px auto 0;

          font-size: 11px;

          line-height: 1.55;

          font-style: italic;

          color: #765f43;
        }


        /* =========================================
           FOOTER
        ========================================= */

        .royal-footer {
          margin-top: 15px;

          font-family: Arial, sans-serif;

          font-size: 8px;

          font-weight: 600;

          letter-spacing: 3px;

          color: #9a7842;
        }


        /* =========================================
           RSVP
        ========================================= */

        .royal-rsvp-button {
          margin-top: 13px;

          padding: 10px 30px;

          border:
            1px solid
            #9b7537;

          border-radius: 0;

          background: #9b7537;

          color: white;

          font-family: Arial, sans-serif;

          font-size: 9px;

          font-weight: 700;

          letter-spacing: 2.5px;

          cursor: pointer;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .royal-rsvp-button:hover {
          background: #765625;

          transform: translateY(-2px);
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 700px) {

          .royal-wedding {
            width: 100%;

            height: auto;

            min-height: 100vh;

            padding: 40px 25px;
          }

          .royal-wedding::before {
            inset: 12px;
          }

          .royal-wedding::after {
            inset: 20px;
          }

          .royal-names {
            font-size: 40px;
          }

          .royal-details {
            gap: 20px;
          }

          .royal-detail strong {
            font-size: 14px;
          }

          .royal-corner {
            width: 55px;
            height: 55px;
          }
        }

      `}</style>


      <div className="royal-wedding">

        {/* Decorative corners */}

        <div className="royal-corner royal-corner-one" />

        <div className="royal-corner royal-corner-two" />

        <div className="royal-corner royal-corner-three" />

        <div className="royal-corner royal-corner-four" />


        {/* Main content */}

        <div className="royal-wedding-content">

          <div className="royal-crown">
            ♕
          </div>


          <p className="royal-small-title">
            TOGETHER WITH THEIR FAMILIES
          </p>


          <h2 className="royal-wedding-title">
            The Wedding Celebration
          </h2>


          <div className="royal-divider">

            <span />

            <b>
              ✦
            </b>

            <span />

          </div>


          <h1 className="royal-names">

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


          <p className="royal-invitation-text">
            Request the pleasure of your company
            <br />
            as they begin their beautiful journey together.
          </p>


          <div className="royal-details">

            <div className="royal-detail">

              <small>
                DATE
              </small>

              <strong>
                {data.eventDate || "DATE"}
              </strong>

            </div>


            <div className="royal-detail">

              <small>
                TIME
              </small>

              <strong>
                {data.eventTime || "TIME"}
              </strong>

            </div>

          </div>


          <div className="royal-location">

            <strong>
              {data.venue || "VENUE"}
            </strong>

            <span className="royal-location-address">
              {data.address || "ADDRESS"}
            </span>


            {locationUrl && (

              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="royal-location-link"
              >

                <MapPin size={15} />

                <span>
                  View Location
                </span>

              </a>

            )}

          </div>


          {data.message && (

            <p className="royal-message">
              {data.message}
            </p>

          )}


          <p className="royal-footer">
            WITH LOVE • WITH JOY • FOREVER
          </p>


          <button
            type="button"
            className="royal-rsvp-button"
            onClick={onRSVP}
          >
            RSVP
          </button>

        </div>

      </div>
    </>
  );
}

export default RoyalWedding;