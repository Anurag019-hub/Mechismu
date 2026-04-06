import React from 'react';

// ===== COMPONENT =====
const CarStats = ({ stats }) => {
  return (
    <div className="car-stats">
      {Object.entries(stats).map(([key, value]) => (
        <div className="car-stats__item" key={key}>
          <span className="car-stats__value">{value}</span>
          <span className="car-stats__label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
        </div>
      ))}
    </div>
  );
}


export default React.memo(CarStats);