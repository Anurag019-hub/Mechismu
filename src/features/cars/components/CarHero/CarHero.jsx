import React, { useState } from 'react';

// ===== COMPONENT =====
const CarHero = ({ car }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="car-hero">
      <div className="car-hero__tag">{car.tag}</div>
      <h1 className="car-hero__name">{car.name}</h1>
      
      {car?.images?.hero && (
        <div className="car-hero__image-wrapper">
          <div className="car-hero__glow"></div>
          {imgError ? (
            <div className="car-gallery__placeholder" style={{ height: '300px' }}>
              IMAGE_NOT_FOUND :: {car.name}
            </div>
          ) : (
            <img 
              src={car.images.hero} 
              alt={car.name} 
              className="car-hero__image"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              style={{ opacity: imgLoaded ? 1 : 0 }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(CarHero);