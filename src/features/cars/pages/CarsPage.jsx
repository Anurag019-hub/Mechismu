import React, { useState, useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { cars } from '@/data/cars';
import '@/features/cars/pages/CarsPage.css';

// ===== LAZY-LOADED CAR SECTIONS (code-split heavy components) =====
const CarSelector = React.lazy(() => import('../components/CarSelector/CarSelector'));
const CarHero = React.lazy(() => import('../components/CarHero/CarHero'));
const CarStats = React.lazy(() => import('../components/CarStats/CarStats'));
const CarOverview = React.lazy(() => import('../components/CarOverview/CarOverview'));
const CarDomains = React.lazy(() => import('../components/CarDomains/CarDomains'));
const CarSpecs = React.lazy(() => import('../components/CarSpecs/CarSpecs'));
const CarGallery = React.lazy(() => import('../components/CarGallery/CarGallery'));
const CarTimeline = React.lazy(() => import('../components/CarTimeline/CarTimeline'));

const CarsPage = () => {
  const [activeCar, setActiveCar] = useState(cars[0]);
  const contentRef = useRef(null);

  useEffect(() => {
    // Scroll to top and animate in the new content whenever the car changes
    window.scrollTo(0, 0);
    
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [activeCar]);

  // Clean data function to remove null, undefined, and empty string fields
  const getCleanedData = (car) => {
    if (!car) return null;

    // Clean stats: keep only valid scalar values
    const cleanedStats = car.stats
      ? Object.fromEntries(
          Object.entries(car.stats).filter(
            ([_, v]) => v !== null && v !== undefined && v !== ''
          )
        )
      : null;

    // Clean specs: keep only arrays with items having both label and value
    const cleanedSpecs = car.specs ? {} : null;
    if (car.specs) {
      Object.keys(car.specs).forEach((group) => {
        const validItems = car.specs[group]?.filter(
          (item) => item?.label && item?.value
        );
        if (validItems && validItems.length > 0) {
          cleanedSpecs[group] = validItems;
        }
      });
    }

    // Clean domains: keep only domains with valid text
    const cleanedDomains = car.domains ? {} : null;
    if (car.domains) {
      Object.keys(car.domains).forEach((key) => {
        if (car.domains[key]?.text && car.domains[key].text.trim() !== '') {
          cleanedDomains[key] = car.domains[key];
        }
      });
    }

    // Clean images: filter out empty elements in gallery
    const cleanedImages = { ...car.images };
    if (car.images?.gallery) {
      cleanedImages.gallery = car.images.gallery.filter(Boolean);
    }

    return {
      stats: Object.keys(cleanedStats || {}).length > 0 ? cleanedStats : null,
      specs: Object.keys(cleanedSpecs || {}).length > 0 ? cleanedSpecs : null,
      domains: Object.keys(cleanedDomains || {}).length > 0 ? cleanedDomains : null,
      images: cleanedImages,
    };
  };

  const cleanedCar = getCleanedData(activeCar);

  return (
    <div className="cars-page">
      {/* Background Elements */}
      <div className="cars-bg">
        <div className="cars-bg__carbon"></div>
        <div className="cars-bg__grid"></div>
        <div className="cars-bg__glow cars-bg__glow--1"></div>
        <div className="cars-bg__glow cars-bg__glow--2"></div>
      </div>

      <div className="cars-container">
        <Suspense fallback={null}>
          {/* Horizontal Scrollable Selector */}
          <CarSelector 
            cars={cars} 
            activeCar={activeCar} 
            onSelect={setActiveCar} 
          />
          
          {/* Main Content Area (Animated on change) */}
          <div ref={contentRef}>
            <CarHero car={activeCar} />
            
            {cleanedCar.stats && <CarStats stats={cleanedCar.stats} />}
            
            {activeCar?.overview && <CarOverview overview={activeCar.overview} />}
            
            {cleanedCar.domains && <CarDomains domains={cleanedCar.domains} />}
            
            {cleanedCar.specs && <CarSpecs specs={cleanedCar.specs} />}
            
            {cleanedCar.images && <CarGallery images={cleanedCar.images} />}
            
            {activeCar?.timeline && activeCar.timeline.length > 0 && <CarTimeline timeline={activeCar.timeline} />}
          </div>
        </Suspense>
      </div>

    </div>
  );
}

export default React.memo(CarsPage);