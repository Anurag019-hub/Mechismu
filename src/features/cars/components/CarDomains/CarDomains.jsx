import React from 'react';

// ===== COMPONENT =====
const CarDomains = ({ domains }) => {
  if (!domains) return null;

  return (
    <div className="car-section">
      <div className="car-section__header">
        <div className="car-section__accent" />
        <h2 className="car-section__title">TECHNICAL DOMAINS</h2>
      </div>
      
      <div className="car-domains">
        {Object.entries(domains).map(([key, domain]) => (
          <div className="car-domains__card" key={key}>
            <h3 className="car-domains__title">{domain.title}</h3>
            <p className="car-domains__text">{domain.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default React.memo(CarDomains);