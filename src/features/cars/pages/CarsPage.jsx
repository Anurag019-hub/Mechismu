import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';
import { cars } from '@/data/cars';

// Components & Styles
import PageLoader from "../../../components/ui/PageLoader/PageLoader.jsx";
import '@/features/cars/pages/CarsPage.css';

// ===== LAZY-LOADED CAR SECTIONS =====
const CarSelector = React.lazy(() => import('../components/CarSelector/CarSelector'));
const CarHero = React.lazy(() => import('../components/CarHero/CarHero'));
const CarStats = React.lazy(() => import('../components/CarStats/CarStats'));
const CarOverview = React.lazy(() => import('../components/CarOverview/CarOverview'));
const CarDomains = React.lazy(() => import('../components/CarDomains/CarDomains'));
const CarSpecs = React.lazy(() => import('../components/CarSpecs/CarSpecs'));
const CarGallery = React.lazy(() => import('../components/CarGallery/CarGallery'));
const CarTimeline = React.lazy(() => import('../components/CarTimeline/CarTimeline'));

const CarsPage = () => {
  const { carId } = useParams();

  // Find matching car from URL param, fallback to first car
  const initialCar = carId
    ? cars.find((c) => c.id === carId) || cars[0]
    : cars[0];

  const [activeCar, setActiveCar] = useState(initialCar);
  const contentRef = useRef(null);

  // Sync activeCar when URL param changes (e.g. navigating from home)
  useEffect(() => {
    if (carId) {
      const found = cars.find((c) => c.id === carId);
      if (found && found.id !== activeCar.id) {
        setActiveCar(found);
      }
    }
  }, [carId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Scroll to top and animate in the new content whenever the car changes
    window.scrollTo(0, 0);

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: "all" }
      );
    }
  }, [activeCar]);

  // Clean data function to remove null, undefined, and empty string fields
  const getCleanedData = (car) => {
    if (!car) return null;

    const cleanedStats = car.stats
      ? Object.fromEntries(
        Object.entries(car.stats).filter(
          ([_, v]) => v !== null && v !== undefined && v !== ''
        )
      )
      : null;

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

    const cleanedDomains = car.domains ? {} : null;
    if (car.domains) {
      Object.keys(car.domains).forEach((key) => {
        if (car.domains[key]?.text && car.domains[key].text.trim() !== '') {
          cleanedDomains[key] = car.domains[key];
        }
      });
    }

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
        {/* Suspense handles the initial load of all lazy components */}
        <Suspense fallback={<PageLoader />}>

          <CarSelector
            cars={cars}
            activeCar={activeCar}
            onSelect={setActiveCar}
          />

          {/* Main Content Area (Animated on car change) */}
          <div ref={contentRef}>
            <CarHero car={activeCar} />

            {cleanedCar.stats && <CarStats stats={cleanedCar.stats} />}

            {activeCar?.overview && <CarOverview overview={activeCar.overview} />}

            {cleanedCar.domains && <CarDomains domains={cleanedCar.domains} />}

            {cleanedCar.specs && <CarSpecs specs={cleanedCar.specs} />}

            {cleanedCar.images && <CarGallery images={cleanedCar.images} />}

            {activeCar?.timeline && activeCar.timeline.length > 0 && (
              <CarTimeline timeline={activeCar.timeline} />
            )}
          </div>

        </Suspense>
      </div>
    </div>
  );
}

export default React.memo(CarsPage);