import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

function BirthdayElegant({
  data = {},
  onRSVP,
  enableOpeningAnimation = false
}) {
  const [showOpening, setShowOpening] = useState(
    enableOpeningAnimation
  );

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

  useEffect(() => {
    if (!enableOpeningAnimation) {
      setShowOpening(false);
      return;
    }

    setShowOpening(true);

    const timer = setTimeout(() => {
      setShowOpening(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, [enableOpeningAnimation]);

  /* =========================================
     LUXURY OPENING ANIMATION
     ========================================= */

  if (showOpening) {
    return (
      <>
        <style>{`

          .elegant-opening {
            width: 100%;
            min-height: 650px;

            background:
              radial-gradient(
                circle at center,
                #403b35 0%,
                #282725 45%,
                #171615 100%
              );

            display: flex;
            align-items: center;
            justify-content: center;

            position: relative;
            overflow: hidden;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            box-sizing: border-box;
          }

          .elegant-opening-glow {
            position: absolute;

            width: 350px;
            height: 350px;

            border-radius: 50%;

            background:
              radial-gradient(
                circle,
                rgba(185, 162, 123, 0.22),
                rgba(185, 162, 123, 0)
              );

            animation:
              elegantGlow
              4.2s
              ease-out
              both;
          }

          .elegant-envelope {
            width: 360px;
            height: 470px;

            position: relative;

            perspective: 1600px;

            animation:
              elegantEnvelopeIn
              0.9s
              ease-out
              both;
          }

          .elegant-inside {
            position: absolute;

            inset: 0;

            background:
              linear-gradient(
                145deg,
                #302e2b,
                #242321
              );

            border: 1px solid #b9a27b;

            box-shadow:
              0 30px 80px
              rgba(0, 0, 0, 0.45);

            display: flex;

            align-items: center;
            justify-content: center;

            text-align: center;

            overflow: hidden;
          }

          .elegant-inside::before {
            content: "";

            position: absolute;

            inset: 15px;

            border:
              1px solid
              rgba(185, 162, 123, 0.55);
          }

          .elegant-inside-content {
            position: relative;

            z-index: 2;

            opacity: 0;

            animation:
              elegantInsideReveal
              0.9s
              ease-out
              2.55s
              forwards;
          }

          .elegant-inside-small {
            font-family: Arial, sans-serif;

            font-size: 8px;

            letter-spacing: 4px;

            color: #b9a27b;

            margin-bottom: 22px;
          }

          .elegant-inside-number {
            font-size: 78px;

            line-height: 0.9;

            font-weight: 400;

            color: #f4efe7;

            margin: 0;
          }

          .elegant-inside-title {
            margin-top: 14px;

            font-family: Arial, sans-serif;

            font-size: 13px;

            letter-spacing: 6px;

            color: #b9a27b;

            text-transform: uppercase;
          }

          .elegant-inside-line {
            width: 55px;

            height: 1px;

            background: #b9a27b;

            margin: 25px auto;
          }

          .elegant-inside-name {
            margin: 0;

            font-size: 30px;

            font-style: italic;

            font-weight: 400;

            color: #f4efe7;
          }

          /* LEFT DOOR */

          .elegant-panel-left {
            position: absolute;

            left: 0;
            top: 0;

            width: 50%;
            height: 100%;

            background:
              linear-gradient(
                135deg,
                #302f2c,
                #252422
              );

            border-right:
              1px solid #8d806b;

            transform-origin: left center;

            z-index: 10;

            animation:
              elegantLeftOpen
              1.7s
              cubic-bezier(
                .65,
                .05,
                .36,
                1
              )
              1.15s
              forwards;
          }

          /* RIGHT DOOR */

          .elegant-panel-right {
            position: absolute;

            right: 0;
            top: 0;

            width: 50%;
            height: 100%;

            background:
              linear-gradient(
                225deg,
                #302f2c,
                #252422
              );

            border-left:
              1px solid #8d806b;

            transform-origin: right center;

            z-index: 10;

            animation:
              elegantRightOpen
              1.7s
              cubic-bezier(
                .65,
                .05,
                .36,
                1
              )
              1.15s
              forwards;
          }

          .elegant-panel-symbol {
            position: absolute;

            top: 50%;

            transform:
              translateY(-50%);

            color: #b9a27b;

            font-size: 26px;
          }

          .elegant-panel-left
          .elegant-panel-symbol {
            right: 22px;
          }

          .elegant-panel-right
          .elegant-panel-symbol {
            left: 22px;
          }

          /* GOLD SEAL */

          .elegant-seal {
            position: absolute;

            left: 50%;
            top: 50%;

            width: 72px;
            height: 72px;

            transform:
              translate(-50%, -50%);

            border-radius: 50%;

            background:
              radial-gradient(
                circle,
                #d2b578,
                #8f6e35
              );

            border:
              2px solid #ead7ad;

            box-shadow:
              0 8px 30px
              rgba(0, 0, 0, 0.4);

            display: flex;

            align-items: center;
            justify-content: center;

            color: #292724;

            font-size: 24px;

            z-index: 20;

            animation:
              elegantSealPulse
              1.2s
              ease-in-out
              0.3s
              2;
          }

          .elegant-seal-inner {
            animation:
              elegantSealDisappear
              0.6s
              ease-out
              1.7s
              forwards;
          }

          /* SPARKLES */

          .elegant-sparkle {
            position: absolute;

            color: #d4b978;

            font-size: 18px;

            opacity: 0;

            z-index: 30;

            animation:
              elegantSparkle
              1.5s
              ease-out
              forwards;
          }

          .elegant-sparkle.one {
            top: 18%;
            left: 18%;

            animation-delay: 1.8s;
          }

          .elegant-sparkle.two {
            top: 25%;
            right: 17%;

            animation-delay: 2s;
          }

          .elegant-sparkle.three {
            bottom: 21%;
            left: 20%;

            animation-delay: 2.15s;
          }

          .elegant-sparkle.four {
            bottom: 18%;
            right: 19%;

            animation-delay: 2.3s;
          }

          /* BOTTOM TEXT */

          .elegant-opening-text {
            position: absolute;

            bottom: 32px;

            left: 0;
            right: 0;

            text-align: center;

            color: #9f927e;

            font-family: Arial, sans-serif;

            font-size: 8px;

            letter-spacing: 3px;

            opacity: 0;

            animation:
              elegantTextReveal
              0.8s
              ease-out
              2.8s
              forwards;
          }

          /* ANIMATIONS */

          @keyframes elegantEnvelopeIn {
            from {
              opacity: 0;

              transform:
                translateY(35px)
                scale(0.94);
            }

            to {
              opacity: 1;

              transform:
                translateY(0)
                scale(1);
            }
          }

          @keyframes elegantGlow {
            0% {
              opacity: 0;

              transform:
                scale(0.5);
            }

            50% {
              opacity: 1;

              transform:
                scale(1);
            }

            100% {
              opacity: 0.45;

              transform:
                scale(1.3);
            }
          }

          @keyframes elegantLeftOpen {
            from {
              transform:
                rotateY(0deg);
            }

            to {
              transform:
                rotateY(-108deg);
            }
          }

          @keyframes elegantRightOpen {
            from {
              transform:
                rotateY(0deg);
            }

            to {
              transform:
                rotateY(108deg);
            }
          }

          @keyframes elegantSealPulse {
            0%,
            100% {
              transform:
                translate(-50%, -50%)
                scale(1);
            }

            50% {
              transform:
                translate(-50%, -50%)
                scale(1.12);
            }
          }

          @keyframes elegantSealDisappear {
            to {
              opacity: 0;

              transform:
                scale(0.45)
                rotate(20deg);
            }
          }

          @keyframes elegantInsideReveal {
            from {
              opacity: 0;

              transform:
                translateY(18px)
                scale(0.96);
            }

            to {
              opacity: 1;

              transform:
                translateY(0)
                scale(1);
            }
          }

          @keyframes elegantSparkle {
            0% {
              opacity: 0;

              transform:
                scale(0)
                rotate(0);
            }

            50% {
              opacity: 1;

              transform:
                scale(1.3)
                rotate(90deg);
            }

            100% {
              opacity: 0.45;

              transform:
                scale(1)
                rotate(180deg);
            }
          }

          @keyframes elegantTextReveal {
            from {
              opacity: 0;

              transform:
                translateY(8px);
            }

            to {
              opacity: 1;

              transform:
                translateY(0);
            }
          }

          /* MOBILE */

          @media (max-width: 600px) {

            .elegant-envelope {
              width: 300px;
              height: 430px;
            }

            .elegant-inside-number {
              font-size: 62px;
            }

            .elegant-inside-title {
              font-size: 10px;
              letter-spacing: 4px;
            }

            .elegant-inside-name {
              font-size: 25px;
            }

            .elegant-seal {
              width: 60px;
              height: 60px;
            }

          }

        `}</style>

        <div className="elegant-opening">

          <div className="elegant-opening-glow" />

          <div className="elegant-envelope">

            {/* INSIDE CARD */}

            <div className="elegant-inside">

              <div className="elegant-inside-content">

                <div className="elegant-inside-small">
                  YOU ARE CORDIALLY INVITED
                </div>

                <h1 className="elegant-inside-number">
                  50
                </h1>

                <div className="elegant-inside-title">
                  Birthday Celebration
                </div>

                <div className="elegant-inside-line" />

                <h2 className="elegant-inside-name">
                  {data.hostName || "Birthday Person"}
                </h2>

              </div>

            </div>

            {/* LEFT PANEL */}

            <div className="elegant-panel-left">

              <div className="elegant-panel-symbol">
                ✦
              </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="elegant-panel-right">

              <div className="elegant-panel-symbol">
                ✦
              </div>

            </div>

            {/* GOLD SEAL */}

            <div className="elegant-seal">

              <div className="elegant-seal-inner">
                ✦
              </div>

            </div>

            {/* SPARKLES */}

            <div className="elegant-sparkle one">
              ✦
            </div>

            <div className="elegant-sparkle two">
              ✧
            </div>

            <div className="elegant-sparkle three">
              ✦
            </div>

            <div className="elegant-sparkle four">
              ✧
            </div>

            <div className="elegant-opening-text">
              A MOMENT WORTH CELEBRATING
            </div>

          </div>

        </div>
      </>
    );
  }

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

          font-family:
            Georgia,
            "Times New Roman",
            serif;
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

          border:
            1px solid #8d806b;

          pointer-events: none;
        }

        .birthday-elegant-card::after {
          content: "";

          position: absolute;

          inset: 22px;

          border:
            1px solid
            rgba(255, 255, 255, 0.08);

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

          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .birthday-elegant-location-link:hover {
          opacity: 0.75;

          transform:
            translateY(-1px);
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

          border:
            1px solid #b9a27b;

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

        /* PDF MODE */

        .pdf-generating .birthday-elegant,
        .pdf-generating .birthday-elegant-card,
        .pdf-generating .birthday-elegant-content,
        .pdf-generating .birthday-elegant-decoration,
        .pdf-generating .birthday-elegant-small,
        .pdf-generating .birthday-elegant-number,
        .pdf-generating .birthday-elegant-title,
        .pdf-generating .birthday-elegant-line,
        .pdf-generating .birthday-elegant-name,
        .pdf-generating .birthday-elegant-invite,
        .pdf-generating .birthday-elegant-details,
        .pdf-generating .birthday-elegant-venue,
        .pdf-generating .birthday-elegant-message,
        .pdf-generating .birthday-elegant-rsvp {
          animation: none !important;

          opacity: 1 !important;

          transform: none !important;
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
                  <span>
                    View Location
                  </span>
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
              className="birthday-elegant-rsvp invitation-rsvp-button"
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