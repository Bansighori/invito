import "./PhotoWeddingRomantic.css";

function PhotoWeddingRomantic({
  data = {},
  onRSVP
}) {
  return (
    <div className="photo-romantic">

      <div className="romantic-top-shape"></div>

      <div className="romantic-card">

        {/* HEADER */}

        <p className="romantic-label">
          WE ARE GETTING MARRIED
        </p>

        <h1 className="romantic-names">

          <span>
            {data.groomName || "Daniel"}
          </span>

          <em>&</em>

          <span>
            {data.brideName || "Olivia"}
          </span>

        </h1>

        <div className="romantic-line">
          <span></span>
          <b>♥</b>
          <span></span>
        </div>


        {/* PHOTO */}

        <div className="romantic-photo-wrap">

          <div className="romantic-photo">

            {data.couplePhoto ? (

              <img
                src={data.couplePhoto}
                alt="Couple"
              />

            ) : (

              <div className="romantic-placeholder">

                <span>♥</span>

                <p>
                  Couple Photo
                </p>

              </div>

            )}

          </div>

          <div className="romantic-photo-flower">
            ❀
          </div>

        </div>


        {/* MESSAGE */}

        <p className="romantic-message">

          With joyful hearts, we invite you
          <br />
          to celebrate our special day
          <br />
          and the beginning of forever.

        </p>


        {/* DATE / TIME */}

        <div className="romantic-event">

          <div className="romantic-event-item">

            <span>
              DATE
            </span>

            <strong>
              {data.date || "18 JUNE 2027"}
            </strong>

          </div>


          <div className="romantic-event-middle">
            ♥
          </div>


          <div className="romantic-event-item">

            <span>
              TIME
            </span>

            <strong>
              {data.time || "06:00 PM"}
            </strong>

          </div>

        </div>


        {/* LOCATION */}

        <div className="romantic-venue">
  <div className="romantic-venue-icon">📍</div>

  <span>CELEBRATION AT</span>

  <strong>
    {data.venue || "ROSE GARDEN"}
  </strong>

  <small>
    {data.address || "45 Love Street"}
  </small>

  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${data.venue || "ROSE GARDEN"}, ${
        data.address || "45 Love Street"
      }`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="romantic-map-link"
  >
    📍 View Location
  </a>
</div>

        {/* RSVP */}

        <button
          type="button"
          className="invitation-rsvp-button romantic-rsvp"
          onClick={onRSVP}
        >
          RSVP NOW
        </button>


        {/* FOOTER */}

        <div className="romantic-footer">
          Forever starts here
        </div>

      </div>

      <div className="romantic-bottom-shape"></div>

    </div>
  );
}

export default PhotoWeddingRomantic;