import React, { useState, useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { cars } from '../../../data/cars';
import './CarsPage.css';

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
            
            <CarStats stats={activeCar.stats} />
            
            <CarOverview overview={activeCar.overview} />
            
            <CarDomains domains={activeCar.domains} />
            
            <CarSpecs specs={activeCar.specs} />
            
            <CarGallery images={activeCar.images} />
            
            <CarTimeline timeline={activeCar.timeline} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default React.memo(CarsPage);