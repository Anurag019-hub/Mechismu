import React from 'react';

// ===== COMPONENT =====
const CarTimeline = ({ timeline }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="car-section">
      <div className="car-section__header">
        <div className="car-section__accent" />
        <h2 className="car-section__title">TIMELINE</h2>
      </div>
      
      <div className="car-timeline">
        {timeline.map((item, index) => (
          <div className="car-timeline__item" key={index}>
            <span className="car-timeline__date">{item.date}</span>
            <span className="car-timeline__event">{item.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(CarTimeline);