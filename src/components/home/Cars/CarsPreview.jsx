
import SectionWrapper from '@/components/home/common/SectionWrapper';
import CTAButton from '@/components/home/common/CTAButton';
import '@/components/home/Cars/cars.css';

import { cars as CARS_DATA } from '@/data/cars';

function CarCard({ car }) {
  return (
    <div className="car-card glass-card fade-up">
      {car.image && (
        <div className="car-image-container">
          <img
            src={car.image}
            alt={car.name}
            loading="lazy"
            className="car-image"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="car-image-overlay" />
          {car.year && <div className="car-year-badge">{car.year}</div>}
        </div>
      )}

      <div className="car-info">
        <h3 className="car-name">{car.name}</h3>

        <div className="car-stats">
          {car.accel && (
            <div className="car-stat-item">
              <div className="car-stat-val">{car.accel}</div>
              <div className="car-stat-label">0-60</div>
            </div>
          )}
          {car.mass && (
            <div className="car-stat-item">
              <div className="car-stat-val">{car.mass}</div>
              <div className="car-stat-label">MASS</div>
            </div>
          )}
          {car.power && (
            <div className="car-stat-item">
              <div className="car-stat-val">{car.power}</div>
              <div className="car-stat-label">POWER</div>
            </div>
          )}
        </div>
      </div>

      <div className="car-card-accent" />
    </div>
  );
}

export default function CarsPreview() {
  return (
    <SectionWrapper className="cars-section">
      <div className="cars-header-accent fade-up">
        <div className="cars-header-line" />
        <span className="cars-header-label">// VEHICLE_ARCHIVE</span>
      </div>

      <h2 className="cars-title fade-up">
        OUR <span className="cars-title-accent">MACHINES</span>
      </h2>

      <p className="cars-desc fade-up">
        Each prototype represents a generation of engineering evolution —
        pushing performance limits further with every iteration.
      </p>

      <div className="cars-grid">
        {CARS_DATA?.map((carData, index) => {
          // Map structured data to UI format
          const mappedCar = {
            name: carData?.name || "UNKNOWN",
            year: carData?.year || null,
            accel: carData?.stats?.acceleration || null,
            mass: carData?.stats?.weight || null,
            power: carData?.stats?.power || null,
            image: carData?.images?.hero || null,
          };

          return <CarCard key={carData?.id || index} car={mappedCar} />;
        })}
      </div>

      <div className="fade-up">
        <CTAButton text="VIEW ALL CARS" to="/cars" variant="outline" />
      </div>
    </SectionWrapper>
  );
}
