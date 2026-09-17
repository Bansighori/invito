import {
  useState
} from "react";

import {
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";


function InvitationGallery({
  gallery = []
}) {

  const [selectedIndex, setSelectedIndex] =
    useState(null);


  const images =
    Array.isArray(gallery)
      ? gallery
          .map((image) =>
            typeof image === "string"
              ? image
              : image?.url
          )
          .filter(Boolean)
      : [];


  if (images.length === 0) {
    return null;
  }


  // ==========================================
  // OPEN IMAGE
  // ==========================================

  const openImage = (index) => {
    setSelectedIndex(index);
  };


  // ==========================================
  // CLOSE IMAGE
  // ==========================================

  const closeImage = () => {
    setSelectedIndex(null);
  };


  // ==========================================
  // PREVIOUS IMAGE
  // ==========================================

  const previousImage = () => {

    setSelectedIndex(
      (current) =>
        current === 0
          ? images.length - 1
          : current - 1
    );

  };


  // ==========================================
  // NEXT IMAGE
  // ==========================================

  const nextImage = () => {

    setSelectedIndex(
      (current) =>
        current === images.length - 1
          ? 0
          : current + 1
    );

  };


  return (
    <>

      {/* ======================================
          GALLERY
      ====================================== */}

      <section className="invitation-gallery">

        <div className="invitation-gallery-header">

          <p className="invitation-gallery-eyebrow">
            MOMENTS
          </p>

          <h2>
            Photo Gallery
          </h2>

          <span>
            A collection of beautiful memories.
          </span>

        </div>


        <div className="invitation-gallery-grid">

          {images.map(
            (image, index) => (

              <button
                type="button"
                className="invitation-gallery-item"
                key={`${image}-${index}`}
                onClick={() =>
                  openImage(index)
                }
              >

                <img
                  src={image}
                  alt={`Gallery photo ${index + 1}`}
                  loading="lazy"
                />

              </button>

            )
          )}

        </div>

      </section>


      {/* ======================================
          FULL SCREEN VIEWER
      ====================================== */}

      {selectedIndex !== null && (

        <div
          className="gallery-lightbox"
          onClick={closeImage}
        >

          {/* CLOSE */}

          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={closeImage}
            aria-label="Close"
          >
            <X size={26} />
          </button>


          {/* PREVIOUS */}

          {images.length > 1 && (

            <button
              type="button"
              className="gallery-lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={32} />
            </button>

          )}


          {/* IMAGE */}

          <img
            className="gallery-lightbox-image"
            src={images[selectedIndex]}
            alt={`Gallery photo ${selectedIndex + 1}`}
            onClick={(event) =>
              event.stopPropagation()
            }
          />


          {/* NEXT */}

          {images.length > 1 && (

            <button
              type="button"
              className="gallery-lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="Next photo"
            >
              <ChevronRight size={32} />
            </button>

          )}


          {/* COUNTER */}

          <div className="gallery-lightbox-counter">

            {selectedIndex + 1}
            {" / "}
            {images.length}

          </div>

        </div>

      )}

    </>
  );
}


export default InvitationGallery;