import React, { useState } from 'react';

// ===== COMPONENT =====
const CarGallery = ({ images }) => {
  if (!images || !images.gallery || images.gallery.length === 0) return null;

  return (
    <div className="car-section">
      <div className="car-section__header">
        <div className="car-section__accent" />
        <h2 className="car-section__title">GALLERY</h2>
      </div>
      
      <div className="car-gallery">
        {images.gallery.map((imgSrc, index) => (
          <GalleryItem key={index} src={imgSrc} alt={`Gallery ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

function GalleryItem({ src, alt }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="car-gallery__item">
      {imgError ? (
        <div className="car-gallery__placeholder">IMG_ERR</div>
      ) : (
        <img 
          src={src} 
          alt={alt} 
          className="car-gallery__image"
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}

export default React.memo(CarGallery);