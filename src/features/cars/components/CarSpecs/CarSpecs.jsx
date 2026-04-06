import React from 'react';

// ===== COMPONENT =====
const CarSpecs = ({ specs }) => {
  if (!specs) return null;

  return (
    <div className="car-section">
      <div className="car-section__header">
        <div className="car-section__accent" />
        <h2 className="car-section__title">SPECIFICATIONS</h2>
      </div>
      
      <div className="car-specs">
        {Object.entries(specs).map(([groupKey, groupSpecs]) => (
          <div className="car-specs__group" key={groupKey}>
            <h3 className="car-specs__group-title">
              {groupKey.toUpperCase()}
            </h3>
            {groupSpecs.map((spec, index) => (
              <div className="car-specs__row" key={index}>
                <span className="car-specs__label">{spec.label}</span>
                <span className="car-specs__value">{spec.value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


export default React.memo(CarSpecs);