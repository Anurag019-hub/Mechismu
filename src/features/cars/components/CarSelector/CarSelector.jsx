import React from 'react';

// ===== COMPONENT =====
const CarSelector = ({ cars, activeCar, onSelect }) => {
  return (
    <div className="car-selector">
      <div className="car-selector__track">
        {cars.map((car) => {
          const isActive = car.id === activeCar.id;
          return (
            <div
              key={car.id}
              className={`car-selector__item ${isActive ? 'car-selector__item--active' : ''}`}
              onClick={() => onSelect(car)}
            >
              <span className="car-selector__year">{car.year}</span>
              <span className="car-selector__name">{car.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(CarSelector);