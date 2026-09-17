import "./PhotoWeddingFloral.css";

function PhotoWeddingFloral({
  data = {},
  onRSVP
}) {
  return (
    <div className="photo-floral">

      <div className="floral-corner floral-top-left">
        ❀
      </div>

      <div className="floral-corner floral-top-right">
        ❀
      </div>

      <div className="floral-corner floral-bottom-left">
        ❀
      </div>

      <div className="floral-corner floral-bottom-right">
        ❀
      </div>

      <div className="photo-floral-border">

        <p className="photo-floral-small-title">
          TOGETHER WITH THEIR FAMILIES
        </p>

        <div className="photo-floral-divider">
          <span>✦</span>
        </div>

        <h1 className="photo-floral-names">

          <span>
            {data.groomName || "Daniel"}
          </span>

          <small>&</small>

          <span>
            {data.brideName || "Olivia"}
          </span>

        </h1>


        {/* COUPLE PHOTO */}

        <div className="photo-floral-photo-frame">

          <div className="photo-floral-photo-inner">

            {data.couplePhoto ? (

              <img
                src={data.couplePhoto}
                alt="Couple"
              />

            ) : (

              <div className="photo-floral-placeholder">

                <span>♡</span>

                <p>
                  Couple Photo
                </p>

              </div>

            )}

          </div>

        </div>


        {/* MESSAGE */}

        <p className="photo-floral-invitation">

          {data.message ||
            "Request the pleasure of your company at the celebration of our wedding."}

        </p>


        {/* DATE + TIME */}

        <div className="photo-floral-details">

          <div className="photo-floral-detail">

            <span className="detail-label">
              DATE
            </span>

            <strong>
              {data.date || "27 MARCH 2027"}
            </strong>

          </div>


          <div className="photo-floral-detail-divider">
            ✦
          </div>


          <div className="photo-floral-detail">

            <span className="detail-label">
              TIME
            </span>

            <strong>
              {data.time || "05:00 PM"}
            </strong>

          </div>

        </div>


        {/* LOCATION */}

        <div className="photo-floral-location">
  <div className="location-icon">📍</div>

  <span className="location-label">
    VENUE
  </span>

  <strong>
    {data.venue || "THE GRAND PALACE"}
  </strong>

  <span className="location-address">
    {data.address || "123 Garden Avenue"}
  </span>

  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${data.venue || "THE GRAND PALACE"}, ${
        data.address || "123 Garden Avenue"
      }`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="photo-floral-map-link"
  >
    📍 View Location
  </a>
</div>


        {/* RSVP */}

        <button
          type="button"
          className="invitation-rsvp-button photo-floral-rsvp"
          onClick={onRSVP}
        >
          RSVP
        </button>


        <div className="photo-floral-bottom-decoration">

          <span>❧</span>

          <span>✦</span>

          <span>❧</span>

        </div>

      </div>

    </div>
  );
}

export default PhotoWeddingFloral;