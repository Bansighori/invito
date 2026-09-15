import { MapPin } from "lucide-react";

function BirthdayKids({ data, onRSVP }) {
  const locationText = [data.venue, data.address]
    .filter(Boolean)
    .join(", ");

  const locationUrl = locationText
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`
    : null;

  return (
    <>
      <style>{`
        .birthday-kids {
          width: 100%;
          min-height: 650px;
          background: linear-gradient(135deg, #fff5e6 0%, #ffe0f0 50%, #e0f0ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .birthday-kids-confetti {
          position: absolute;
          font-size: 16px;
          animation: birthdayKidsFall 4s ease-in-out infinite;
          opacity: 0.7;
        }

        .birthday-kids-confetti-one { top: 8%; left: 10%; animation-delay: 0s; }
        .birthday-kids-confetti-two { top: 15%; right: 12%; animation-delay: 0.6s; }
        .birthday-kids-confetti-three { bottom: 20%; left: 8%; animation-delay: 1.2s; }
        .birthday-kids-confetti-four { bottom: 12%; right: 10%; animation-delay: 0.3s; }
        .birthday-kids-confetti-five { top: 40%; left: 5%; animation-delay: 1.8s; }
        .birthday-kids-confetti-six { top: 35%; right: 6%; animation-delay: 0.9s; }

        @keyframes birthdayKidsFall {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(12px) rotate(15deg); }
        }

        .birthday-kids-balloon {
          position: absolute;
          font-size: 36px;
          animation: birthdayKidsBob 3s ease-in-out infinite;
        }

        .birthday-kids-balloon-one {
          top: 30px;
          left: 30px;
          animation-delay: 0s;
        }

        .birthday-kids-balloon-two {
          top: 50px;
          right: 35px;
          font-size: 28px;
          animation-delay: 0.5s;
        }

        .birthday-kids-balloon-three {
          bottom: 40px;
          left: 40px;
          font-size: 30px;
          animation-delay: 1s;
        }

        @keyframes birthdayKidsBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .birthday-kids-card {
          width: 100%;
          max-width: 620px;
          min-height: 580px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          border: 4px solid #ff9ecd;
          box-shadow: 0 15px 45px rgba(255, 120, 180, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px 40px;
          box-sizing: border-box;
        }

        .birthday-kids-card::before {
          content: "";
          position: absolute;
          inset: 8px;
          border: 2px dashed #ffd6ec;
          border-radius: 22px;
          pointer-events: none;
        }

        .birthday-kids-content {
          width: 100%;
          max-width: 460px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .birthday-kids-top {
          margin: 0 0 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          color: #ff6b9d;
        }

        .birthday-kids-emoji-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 10px;
          font-size: 32px;
        }

        .birthday-kids-emoji-row span {
          animation: birthdayKidsWiggle 2s ease-in-out infinite;
        }

        .birthday-kids-emoji-row span:nth-child(2) { animation-delay: 0.3s; }
        .birthday-kids-emoji-row span:nth-child(3) { animation-delay: 0.6s; }

        @keyframes birthdayKidsWiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-8deg); }
          75% { transform: rotate(8deg); }
        }

        .birthday-kids-title {
          margin: 0;
          font-size: 48px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -1px;
          background: linear-gradient(90deg, #ff6b9d, #ffb347, #6bcb77, #4d96ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .birthday-kids-subtitle {
          margin: 10px 0 20px;
          font-size: 14px;
          color: #9a8a9a;
          letter-spacing: 1px;
        }

        .birthday-kids-name {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 40px;
          font-weight: 400;
          font-style: italic;
          color: #ff6b9d;
        }

        .birthday-kids-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 22px 0;
          font-size: 18px;
        }

        .birthday-kids-details {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .birthday-kids-detail {
          min-width: 120px;
          padding: 14px 18px;
          border-radius: 16px;
          background: linear-gradient(135deg, #fff0f5, #f0f8ff);
          border: 2px solid #ffe0f0;
          box-sizing: border-box;
        }

        .birthday-kids-detail small {
          display: block;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #c0a0b0;
          margin-bottom: 6px;
        }

        .birthday-kids-detail strong {
          font-size: 13px;
          font-weight: 700;
          color: #5a4a5a;
        }

        .birthday-kids-venue {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .birthday-kids-venue strong {
          font-size: 12px;
          letter-spacing: 1px;
          color: #5a4a5a;
        }

        .birthday-kids-venue span {
          font-size: 11px;
          color: #9a8a9a;
        }

        .birthday-kids-location-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 5px;
          color: #ff6b9d;
          text-decoration: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .birthday-kids-location-link:hover {
          opacity: 0.75;
          transform: translateY(-1px);
        }

        .birthday-kids-message {
          margin: 18px auto 0;
          max-width: 390px;
          font-size: 13px;
          line-height: 1.7;
          color: #8a7a8a;
        }

        .birthday-kids-footer {
          margin: 18px 0 0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ffb347;
        }

        .birthday-kids-rsvp {
          margin-top: 20px;
          padding: 12px 32px;
          border: none;
          border-radius: 30px;
          background: linear-gradient(90deg, #ff6b9d, #ffb347);
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .birthday-kids-rsvp:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 157, 0.35);
        }

        @media (max-width: 600px) {
          .birthday-kids {
            padding: 18px;
          }

          .birthday-kids-card {
            padding: 45px 22px;
          }

          .birthday-kids-title {
            font-size: 38px;
          }

          .birthday-kids-name {
            font-size: 32px;
          }

          .birthday-kids-balloon-one,
          .birthday-kids-balloon-three {
            display: none;
          }
        }
      `}</style>

      <div className="birthday-kids">
        <span className="birthday-kids-confetti birthday-kids-confetti-one">🎊</span>
        <span className="birthday-kids-confetti birthday-kids-confetti-two">✨</span>
        <span className="birthday-kids-confetti birthday-kids-confetti-three">🎉</span>
        <span className="birthday-kids-confetti birthday-kids-confetti-four">⭐</span>
        <span className="birthday-kids-confetti birthday-kids-confetti-five">🎈</span>
        <span className="birthday-kids-confetti birthday-kids-confetti-six">🌟</span>

        <span className="birthday-kids-balloon birthday-kids-balloon-one">🎈</span>
        <span className="birthday-kids-balloon birthday-kids-balloon-two">🎈</span>
        <span className="birthday-kids-balloon birthday-kids-balloon-three">🎈</span>

        <div className="birthday-kids-card">
          <div className="birthday-kids-content">
            <p className="birthday-kids-top">YOU&apos;RE INVITED TO A</p>

            <div className="birthday-kids-emoji-row">
              <span>🎂</span>
              <span>🎁</span>
              <span>🎈</span>
            </div>

            <h1 className="birthday-kids-title">PARTY!</h1>

            <p className="birthday-kids-subtitle">Let&apos;s Celebrate!</p>

            <h2 className="birthday-kids-name">
              {data.hostName || "Birthday Star"}
            </h2>

            <div className="birthday-kids-divider">
              🌈 🦄 🌈
            </div>

            <div className="birthday-kids-details">
              <div className="birthday-kids-detail">
                <small>DATE</small>
                <strong>{data.eventDate || "DATE"}</strong>
              </div>

              <div className="birthday-kids-detail">
                <small>TIME</small>
                <strong>{data.eventTime || "TIME"}</strong>
              </div>
            </div>

            <div className="birthday-kids-venue">
              <strong>{data.venue || "VENUE"}</strong>
              <span>{data.address || "ADDRESS"}</span>

              {locationUrl && (
                <a
                  href={locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="birthday-kids-location-link"
                >
                  <MapPin size={14} />
                  <span>View Location</span>
                </a>
              )}
            </div>

            {data.message && (
              <p className="birthday-kids-message">{data.message}</p>
            )}

            <p className="birthday-kids-footer">
              GAMES • CAKE • FUN • SURPRISES
            </p>

            <button
              type="button"
              className="birthday-kids-rsvp"
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

export default BirthdayKids;
