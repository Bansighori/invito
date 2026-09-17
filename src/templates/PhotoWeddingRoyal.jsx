import "./PhotoWeddingRoyal.css";

function PhotoWeddingRoyal({
  data = {},
  onRSVP
}) {
  return (
    <div className="photo-royal">

      <div className="royal-card">

        {/* TOP */}

        <div className="royal-top-ornament">
          ❦
        </div>

        <p className="royal-label">
          THE WEDDING CELEBRATION
        </p>


        {/* NAMES */}

        <h1 className="royal-names">

          <span>
            {data.groomName || "William"}
          </span>

          <small>&</small>

          <span>
            {data.brideName || "Sophia"}
          </span>

        </h1>


        <div className="royal-title-line">
          <i></i>
          <b>✦</b>
          <i></i>
        </div>


        {/* PHOTO */}

        <div className="royal-photo-wrapper">

          <div className="royal-photo">

            {data.couplePhoto ? (

              <img
                src={data.couplePhoto}
                alt="Couple"
              />

            ) : (

              <div className="royal-placeholder">

                <span>♕</span>

                <p>
                  Couple Photo
                </p>

              </div>

            )}

          </div>

        </div>


        {/* INVITATION MESSAGE */}

        <p className="royal-message">

          Together with their families,
          <br />
          they request the pleasure of
          <br />
          your company.

        </p>


        {/* DATE */}

        <div className="royal-details">

          <div className="royal-detail">

            <span>
              DATE
            </span>

            <strong>
              {data.date || "12 SEPTEMBER 2027"}
            </strong>

          </div>


          <div className="royal-detail-symbol">
            ✦
          </div>


          <div className="royal-detail">

            <span>
              TIME
            </span>

            <strong>
              {data.time || "07:00 PM"}
            </strong>

          </div>

        </div>


        {/* VENUE */}

        <div className="royal-venue">
  <div className="royal-venue-symbol">📍</div>

  <span>VENUE</span>

  <strong>
    {data.venue || "ROYAL PALACE"}
  </strong>

  <small>
    {data.address || "21 Grand Avenue"}
  </small>

  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${data.venue || "ROYAL PALACE"}, ${
        data.address || "21 Grand Avenue"
      }`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="royal-map-link"
  >
    📍 View Location
  </a>
</div>

        {/* RSVP */}

        <button
          type="button"
          className="invitation-rsvp-button royal-rsvp"
          onClick={onRSVP}
        >
          KINDLY RSVP
        </button>


        {/* FOOTER */}

        <div className="royal-footer">

          <span>❦</span>

          <p>
            WITH LOVE & HONOUR
          </p>

          <span>❦</span>

        </div>

      </div>

    </div>
  );
}

export default PhotoWeddingRoyal;