import {
  useEffect,
  useState
} from "react";

import { MapPin } from "lucide-react";

function BirthdayPop({
  data = {},
  onRSVP,
  enableOpeningAnimation = false
})  {

  // ==========================================
  // OPENING ANIMATION
  // ==========================================

  const [showOpening, setShowOpening] =
  useState(enableOpeningAnimation);

useEffect(() => {
  if (!enableOpeningAnimation) {
    setShowOpening(false);
    return;
  }

  setShowOpening(true);

  const timer = setTimeout(() => {
    setShowOpening(false);
  }, 3500);

  return () => {
    clearTimeout(timer);
  };
}, [enableOpeningAnimation]);

  // ==========================================
  // GOOGLE MAPS
  // ==========================================

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


  // ==========================================
  // OPENING SCREEN
  // ==========================================

  if (showOpening) {

    return (
      <>
        <style>{`

          /* =====================================
             OPENING SCREEN
             ===================================== */

          .birthday-opening {
            width: 100%;
            min-height: 650px;

            background:
              radial-gradient(
                circle at 50% 45%,
                #fffdf9 0%,
                #fff7ed 45%,
                #f8e7d5 100%
              );

            display: flex;
            align-items: center;
            justify-content: center;

            position: relative;
            overflow: hidden;

            font-family:
              Arial,
              sans-serif;
          }


          /* =====================================
             CENTER CONTENT
             ===================================== */

          .birthday-opening-content {
            position: relative;
            z-index: 5;

            text-align: center;

            animation:
              birthdayOpeningContent
              1s
              ease-out
              both;
          }


          .birthday-opening-cake {
            font-size: 78px;

            line-height: 1;

            margin-bottom: 20px;

            animation:
              birthdayOpeningCake
              1s
              ease-out
              both;
          }


          .birthday-opening-title {
            margin: 0;

            font-size: 38px;

            font-weight: 900;

            letter-spacing: 4px;

            color: #9a6249;

            animation:
              birthdayOpeningTitle
              1s
              ease-out
              0.45s
              both;
          }


          .birthday-opening-subtitle {
            margin-top: 12px;

            font-size: 12px;

            font-weight: 700;

            letter-spacing: 4px;

            color: #8d817a;

            animation:
              birthdayOpeningSubtitle
              1s
              ease-out
              0.8s
              both;
          }


          .birthday-opening-line {
            width: 120px;
            height: 1px;

            background: #d3a05c;

            margin: 25px auto;

            transform-origin: center;

            animation:
              birthdayOpeningLine
              1s
              ease-out
              1.1s
              both;
          }


          .birthday-opening-small {
            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 15px;

            font-style: italic;

            color: #a56f4e;

            animation:
              birthdayOpeningSubtitle
              1s
              ease-out
              1.3s
              both;
          }


          /* =====================================
             BALLOONS
             ===================================== */

          .birthday-opening-balloon {
            position: absolute;

            bottom: -100px;

            font-size: 48px;

            z-index: 2;

            animation:
              birthdayBalloonRise
              3.5s
              ease-in
              both;
          }


          .birthday-opening-balloon.one {
            left: 8%;
            animation-delay: 0.1s;
          }


          .birthday-opening-balloon.two {
            left: 25%;
            font-size: 38px;
            animation-delay: 0.55s;
          }


          .birthday-opening-balloon.three {
            right: 24%;
            font-size: 42px;
            animation-delay: 0.35s;
          }


          .birthday-opening-balloon.four {
            right: 7%;
            animation-delay: 0.8s;
          }


          /* =====================================
             CONFETTI
             ===================================== */

          .birthday-opening-confetti {
            position: absolute;

            inset: 0;

            pointer-events: none;

            overflow: hidden;

            z-index: 3;
          }


          .birthday-opening-confetti span {
            position: absolute;

            top: -50px;

            opacity: 0;

            font-size: 22px;

            animation:
              birthdayOpeningConfetti
              3.2s
              ease-in
              forwards;
          }


          .birthday-opening-confetti span:nth-child(1) {
            left: 7%;
            animation-delay: 0.4s;
          }


          .birthday-opening-confetti span:nth-child(2) {
            left: 18%;
            font-size: 15px;
            animation-delay: 0.8s;
          }


          .birthday-opening-confetti span:nth-child(3) {
            left: 31%;
            animation-delay: 0.2s;
          }


          .birthday-opening-confetti span:nth-child(4) {
            left: 45%;
            font-size: 14px;
            animation-delay: 1s;
          }


          .birthday-opening-confetti span:nth-child(5) {
            left: 58%;
            animation-delay: 0.5s;
          }


          .birthday-opening-confetti span:nth-child(6) {
            left: 70%;
            font-size: 15px;
            animation-delay: 0.9s;
          }


          .birthday-opening-confetti span:nth-child(7) {
            left: 83%;
            animation-delay: 0.3s;
          }


          .birthday-opening-confetti span:nth-child(8) {
            left: 94%;
            font-size: 14px;
            animation-delay: 1.1s;
          }


          /* =====================================
             STARS
             ===================================== */

          .birthday-opening-star {
            position: absolute;

            color: #d3a05c;

            font-size: 28px;

            opacity: 0;

            animation:
              birthdayOpeningStar
              1.5s
              ease-in-out
              infinite;
          }


          .birthday-opening-star.one {
            top: 22%;
            left: 17%;
          }


          .birthday-opening-star.two {
            top: 27%;
            right: 16%;

            animation-delay: 0.4s;
          }


          .birthday-opening-star.three {
            bottom: 25%;
            left: 21%;

            animation-delay: 0.7s;
          }


          .birthday-opening-star.four {
            bottom: 20%;
            right: 21%;

            animation-delay: 1s;
          }


          /* =====================================
             OPENING KEYFRAMES
             ===================================== */

          @keyframes birthdayOpeningContent {

            0% {
              opacity: 0;

              transform:
                scale(0.75)
                translateY(25px);
            }

            60% {
              opacity: 1;

              transform:
                scale(1.05)
                translateY(-3px);
            }

            100% {
              opacity: 1;

              transform:
                scale(1)
                translateY(0);
            }

          }


          @keyframes birthdayOpeningCake {

            0% {
              opacity: 0;

              transform:
                scale(0.2)
                rotate(-15deg);
            }

            60% {
              opacity: 1;

              transform:
                scale(1.18)
                rotate(8deg);
            }

            100% {
              opacity: 1;

              transform:
                scale(1)
                rotate(0);
            }

          }


          @keyframes birthdayOpeningTitle {

            from {
              opacity: 0;

              transform:
                translateY(25px);
            }

            to {
              opacity: 1;

              transform:
                translateY(0);
            }

          }


          @keyframes birthdayOpeningSubtitle {

            from {
              opacity: 0;

              transform:
                translateY(15px);
            }

            to {
              opacity: 1;

              transform:
                translateY(0);
            }

          }


          @keyframes birthdayOpeningLine {

            from {
              opacity: 0;

              transform:
                scaleX(0);
            }

            to {
              opacity: 1;

              transform:
                scaleX(1);
            }

          }


          @keyframes birthdayBalloonRise {

            0% {
              opacity: 0;

              transform:
                translateY(0)
                rotate(-10deg);
            }

            15% {
              opacity: 1;
            }

            100% {
              opacity: 0;

              transform:
                translateY(-800px)
                rotate(15deg);
            }

          }


          @keyframes birthdayOpeningConfetti {

            0% {
              opacity: 0;

              transform:
                translateY(-40px)
                rotate(0);
            }

            15% {
              opacity: 1;
            }

            100% {
              opacity: 0;

              transform:
                translateY(720px)
                rotate(360deg);
            }

          }


          @keyframes birthdayOpeningStar {

            0%,
            100% {
              opacity: 0.2;

              transform:
                scale(0.7)
                rotate(0);
            }

            50% {
              opacity: 1;

              transform:
                scale(1.3)
                rotate(180deg);
            }

          }


          /* =====================================
             MOBILE OPENING
             ===================================== */

          @media (max-width: 600px) {

            .birthday-opening {
              min-height: 600px;
            }


            .birthday-opening-cake {
              font-size: 62px;
            }


            .birthday-opening-title {
              font-size: 27px;

              letter-spacing: 3px;
            }


            .birthday-opening-subtitle {
              font-size: 9px;

              letter-spacing: 3px;
            }


            .birthday-opening-small {
              font-size: 13px;
            }


            .birthday-opening-balloon {
              font-size: 38px;
            }

          }

        `}</style>


        <div className="birthday-opening">


          {/* BALLOONS */}

          <div
            className="
              birthday-opening-balloon
              one
            "
          >
            🎈
          </div>


          <div
            className="
              birthday-opening-balloon
              two
            "
          >
            🎈
          </div>


          <div
            className="
              birthday-opening-balloon
              three
            "
          >
            🎈
          </div>


          <div
            className="
              birthday-opening-balloon
              four
            "
          >
            🎈
          </div>


          {/* CONFETTI */}

          <div className="birthday-opening-confetti">

            <span>🎉</span>

            <span>✦</span>

            <span>🎊</span>

            <span>✦</span>

            <span>🎈</span>

            <span>✦</span>

            <span>🎉</span>

            <span>✦</span>

          </div>


          {/* STARS */}

          <div
            className="
              birthday-opening-star
              one
            "
          >
            ✦
          </div>


          <div
            className="
              birthday-opening-star
              two
            "
          >
            ✦
          </div>


          <div
            className="
              birthday-opening-star
              three
            "
          >
            ✦
          </div>


          <div
            className="
              birthday-opening-star
              four
            "
          >
            ✦
          </div>


          {/* CENTER */}

          <div className="birthday-opening-content">

            <div className="birthday-opening-cake">
              🎂
            </div>


            <h1 className="birthday-opening-title">
              LET'S CELEBRATE
            </h1>


            <div className="birthday-opening-line" />


            <p className="birthday-opening-subtitle">
              A SPECIAL DAY IS HERE
            </p>


            <p className="birthday-opening-small">
              Get ready for a beautiful celebration
            </p>

          </div>

        </div>

      </>
    );
  }


  // ==========================================
  // BIRTHDAY CARD
  // ==========================================

  return (
    <>
      <style>{`

        /* ==========================================
   PDF MODE
   SHOW COMPLETE CARD IMMEDIATELY
   ========================================== */

.pdf-generating .birthday-pop,
.pdf-generating .birthday-pop-card,
.pdf-generating .birthday-pop-circle-one,
.pdf-generating .birthday-pop-circle-two,
.pdf-generating .birthday-pop-circle-three,
.pdf-generating .birthday-pop-star-one,
.pdf-generating .birthday-pop-star-two,
.pdf-generating .birthday-pop-content,
.pdf-generating .birthday-pop-top,
.pdf-generating .birthday-pop-cake,
.pdf-generating .birthday-pop-title,
.pdf-generating .birthday-pop-subtitle,
.pdf-generating .birthday-pop-name,
.pdf-generating .birthday-pop-divider,
.pdf-generating .birthday-pop-details,
.pdf-generating .birthday-pop-venue,
.pdf-generating .birthday-pop-message,
.pdf-generating .birthday-pop-footer,
.pdf-generating .birthday-pop-rsvp {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
}

        /* ==========================================
           MAIN BIRTHDAY CONTAINER
           ========================================== */

        .birthday-pop {
          width: 100%;

          min-height: 650px;

          background: #fff7ed;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 35px;

          box-sizing: border-box;

          font-family:
            Arial,
            sans-serif;

          position: relative;

          overflow: hidden;

          animation:
            birthdayCardPageIn
            0.8s
            ease-out
            both;
        }


        @keyframes birthdayCardPageIn {

          from {
            opacity: 0;

            transform:
              scale(0.96);
          }

          to {
            opacity: 1;

            transform:
              scale(1);
          }

        }


        /* ==========================================
           CARD
           ========================================== */

        .birthday-pop-card {
          width: 100%;

          max-width: 620px;

          min-height: 580px;

          background: #ffffff;

          position: relative;

          overflow: hidden;

          border-radius: 24px;

          box-shadow:
            0 15px 45px
            rgba(
              80,
              55,
              30,
              0.12
            );

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 50px 40px;

          box-sizing: border-box;

          animation:
            birthdayCardOpen
            0.9s
            ease-out
            both;

          transform-origin: center;

        }


        @keyframes birthdayCardOpen {

          0% {
            opacity: 0;

            transform:
              scale(0.88)
              translateY(25px);
          }

          65% {
            opacity: 1;

            transform:
              scale(1.02)
              translateY(-3px);
          }

          100% {
            opacity: 1;

            transform:
              scale(1)
              translateY(0);
          }

        }


        /* ==========================================
           DECORATIVE CIRCLES
           ========================================== */

        .birthday-pop-circle-one {

          position: absolute;

          width: 170px;

          height: 170px;

          border-radius: 50%;

          background: #ffe0c2;

          top: -75px;

          left: -70px;

          animation:
            birthdayCircleOne
            1s
            ease-out
            both;

        }


        .birthday-pop-circle-two {

          position: absolute;

          width: 130px;

          height: 130px;

          border-radius: 50%;

          background: #dcefdc;

          bottom: -50px;

          right: -35px;

          animation:
            birthdayCircleTwo
            1s
            ease-out
            0.1s
            both;

        }


        .birthday-pop-circle-three {

          position: absolute;

          width: 80px;

          height: 80px;

          border-radius: 50%;

          background: #f4d7e8;

          top: 55px;

          right: 35px;

          animation:
            birthdayCircleThree
            0.8s
            ease-out
            0.2s
            both;

        }


        @keyframes birthdayCircleOne {

          from {
            opacity: 0;

            transform:
              scale(0)
              rotate(-30deg);
          }

          to {
            opacity: 1;

            transform:
              scale(1)
              rotate(0);
          }

        }


        @keyframes birthdayCircleTwo {

          from {
            opacity: 0;

            transform:
              scale(0)
              translate(40px, 40px);
          }

          to {
            opacity: 1;

            transform:
              scale(1)
              translate(0, 0);
          }

        }


        @keyframes birthdayCircleThree {

          from {
            opacity: 0;

            transform:
              scale(0);
          }

          to {
            opacity: 1;

            transform:
              scale(1);
          }

        }


        /* ==========================================
           STARS
           ========================================== */

        .birthday-pop-star-one {

          position: absolute;

          top: 105px;

          left: 35px;

          font-size: 30px;

          color: #e7b45d;

          transform: rotate(15deg);

          animation:
            birthdayStarAppear
            0.7s
            ease-out
            0.4s
            both;

        }


        .birthday-pop-star-two {

          position: absolute;

          bottom: 75px;

          left: 55px;

          font-size: 22px;

          color: #b68bc4;

          animation:
            birthdayStarAppear
            0.7s
            ease-out
            0.7s
            both;

        }


        @keyframes birthdayStarAppear {

          0% {
            opacity: 0;

            transform:
              scale(0)
              rotate(0);
          }

          70% {
            opacity: 1;

            transform:
              scale(1.3)
              rotate(180deg);
          }

          100% {
            opacity: 1;

            transform:
              scale(1)
              rotate(360deg);
          }

        }


        /* ==========================================
           CONTENT
           ========================================== */

        .birthday-pop-content {

          width: 100%;

          max-width: 460px;

          text-align: center;

          position: relative;

          z-index: 2;

        }


        /* ==========================================
           TOP
           ========================================== */

        .birthday-pop-top {

          margin: 0 0 15px;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 3px;

          color: #a56f4e;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.6s
            ease-out
            0.3s
            forwards;

        }


        /* ==========================================
           CAKE
           ========================================== */

        .birthday-pop-cake {

          font-size: 58px;

          margin-bottom: 8px;

          opacity: 0;

          animation:
            birthdayCakePop
            0.8s
            ease-out
            0.5s
            forwards,

            birthdayPopFloat
            3s
            ease-in-out
            1.4s
            infinite;

        }


        @keyframes birthdayCakePop {

          0% {
            opacity: 0;

            transform:
              scale(0.3)
              translateY(20px);
          }

          60% {
            opacity: 1;

            transform:
              scale(1.15)
              translateY(-5px);
          }

          100% {
            opacity: 1;

            transform:
              scale(1)
              translateY(0);
          }

        }


        @keyframes birthdayPopFloat {

          0%,
          100% {
            transform:
              translateY(0);
          }

          50% {
            transform:
              translateY(-7px);
          }

        }


        /* ==========================================
           TITLE
           ========================================== */

        .birthday-pop-title {

          margin: 0;

          font-size: 52px;

          line-height: 1;

          font-weight: 900;

          letter-spacing: -2px;

          color: #3b3330;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.7s
            ease-out
            0.7s
            forwards;

        }


        /* ==========================================
           SUBTITLE
           ========================================== */

        .birthday-pop-subtitle {

          margin: 12px 0 28px;

          font-size: 15px;

          color: #8d817a;

          letter-spacing: 1px;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.6s
            ease-out
            0.85s
            forwards;

        }


        /* ==========================================
           NAME
           ========================================== */

        .birthday-pop-name {

          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 42px;

          font-weight: 400;

          font-style: italic;

          color: #9a6249;

          opacity: 0;

          animation:
            birthdayNameReveal
            0.8s
            ease-out
            1s
            forwards;

        }


        @keyframes birthdayNameReveal {

          0% {
            opacity: 0;

            transform:
              translateY(25px)
              scale(0.9);
          }

          100% {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);
          }

        }


        /* ==========================================
           DIVIDER
           ========================================== */

        .birthday-pop-divider {

          width: 100%;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 10px;

          margin: 24px 0;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.5s
            ease-out
            1.2s
            forwards;

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


        /* ==========================================
           DATE / TIME
           ========================================== */

        .birthday-pop-details {

          display: flex;

          justify-content: center;

          gap: 12px;

          flex-wrap: wrap;

          margin-bottom: 22px;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.6s
            ease-out
            1.35s
            forwards;

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


        /* ==========================================
           VENUE
           ========================================== */

        .birthday-pop-venue {

          display: flex;

          flex-direction: column;

          gap: 6px;

          margin-top: 10px;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.6s
            ease-out
            1.5s
            forwards;

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


        /* ==========================================
           GOOGLE MAPS
           ========================================== */

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

          transition:
            opacity 0.2s ease,
            transform 0.2s ease;

        }


        .birthday-pop-location-link:hover {

          opacity: 0.75;

          transform:
            translateY(-1px);

        }


        /* ==========================================
           MESSAGE
           ========================================== */

        .birthday-pop-message {

          margin: 20px auto 0;

          max-width: 390px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          line-height: 1.7;

          font-style: italic;

          color: #82756e;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.6s
            ease-out
            1.65s
            forwards;

        }


        /* ==========================================
           FOOTER
           ========================================== */

        .birthday-pop-footer {

          margin: 22px 0 0;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 2px;

          color: #b27a5a;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.6s
            ease-out
            1.8s
            forwards;

        }


        /* ==========================================
           RSVP
           ========================================== */

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

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;

          opacity: 0;

          animation:
            birthdayFadeUp
            0.6s
            ease-out
            1.95s
            forwards,

            birthdayRSVPGlow
            2s
            ease-in-out
            2.6s
            infinite;

        }


        .birthday-pop-rsvp:hover {

          transform:
            translateY(-2px);

          box-shadow:
            0 8px 18px
            rgba(
              154,
              98,
              73,
              0.25
            );

        }


        @keyframes birthdayFadeUp {

          from {

            opacity: 0;

            transform:
              translateY(18px);

          }

          to {

            opacity: 1;

            transform:
              translateY(0);

          }

        }


        @keyframes birthdayRSVPGlow {

          0%,
          100% {

            box-shadow:
              0 0 0
              rgba(
                154,
                98,
                73,
                0
              );

          }

          50% {

            box-shadow:
              0 0 22px
              rgba(
                154,
                98,
                73,
                0.3
              );

          }

        }


        /* ==========================================
           MOBILE
           ========================================== */

        @media (max-width: 600px) {

          .birthday-pop {

            padding: 18px;

          }


          .birthday-pop-card {

            padding:
              45px
              22px;

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


        {/* =====================================
            CARD
            ===================================== */}

        <div className="birthday-pop-card">


          {/* DECORATIVE CIRCLES */}

          <div
            className="
              birthday-pop-circle-one
            "
          />


          <div
            className="
              birthday-pop-circle-two
            "
          />


          <div
            className="
              birthday-pop-circle-three
            "
          />


          {/* STARS */}

          <div
            className="
              birthday-pop-star-one
            "
          >
            ✦
          </div>


          <div
            className="
              birthday-pop-star-two
            "
          >
            ✦
          </div>


          {/* CONTENT */}

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

              {data.hostName ||
                "Birthday Person"}

            </h2>


            {/* DIVIDER */}

            <div
              className="
                birthday-pop-divider
              "
            >

              <span />

              <b>
                ✦
              </b>

              <span />

            </div>


            {/* DATE / TIME */}

            <div
              className="
                birthday-pop-details
              "
            >


              <div
                className="
                  birthday-pop-detail
                "
              >

                <small>
                  DATE
                </small>

                <strong>
                  {data.eventDate ||
                    "DATE"}
                </strong>

              </div>


              <div
                className="
                  birthday-pop-detail
                "
              >

                <small>
                  TIME
                </small>

                <strong>
                  {data.eventTime ||
                    "TIME"}
                </strong>

              </div>


            </div>


            {/* VENUE */}

            <div
              className="
                birthday-pop-venue
              "
            >

              <strong>
                {data.venue ||
                  "VENUE"}
              </strong>


              <span>
                {data.address ||
                  "ADDRESS"}
              </span>


              {locationUrl && (

                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    birthday-pop-location-link
                  "
                >

                  <MapPin size={14} />

                  <span>
                    View Location
                  </span>

                </a>

              )}

            </div>


            {/* MESSAGE */}

            {data.message && (

              <p
                className="
                  birthday-pop-message
                "
              >
                {data.message}
              </p>

            )}


            {/* FOOTER */}

            <p
              className="
                birthday-pop-footer
              "
            >
              CAKE • MUSIC • FUN • MEMORIES
            </p>


            {/* RSVP */}

            <button
              type="button"
              className="
                birthday-pop-rsvp
                invitation-rsvp-button
              "
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