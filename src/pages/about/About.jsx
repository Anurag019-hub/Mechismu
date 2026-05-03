import React, { useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Assets & Styles
import PageLoader from "../../components/ui/PageLoader/PageLoader.jsx";

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ===== LAZY-LOADED SECTIONS =====
// Using dynamic imports to optimize initial bundle size
const Intro = React.lazy(() => import('../../components/Intro/Intro.jsx'));
const Philosophy = React.lazy(() => import('../../components/Philosophy/Philosophy.jsx'));
const Timeline = React.lazy(() => import('../../components/Timeline/Timeline.jsx'));
const Domains = React.lazy(() => import('../../components/Domains/Domains.jsx'));
const Achievements = React.lazy(() => import('../../components/Achievements/Achievements.jsx'));
const Funding = React.lazy(() => import('../../components/Funding/Funding.jsx'));

/**
 * About Page Component
 * Handles layout for the About section and global GSAP scroll refreshes.
 */
export default function About() {

  useEffect(() => {
    // gsap.context handles scoping and makes cleanup simple
    const ctx = gsap.context(() => {

      /**
       * ScrollTrigger Refresh Logic
       * Because sections are lazy-loaded, their height might change after 
       * the initial page load. This ensures GSAP markers and triggers 
       * are calculated correctly.
       */
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800); // 800ms gives the lazy components a bit more time to mount

      return () => clearTimeout(timer);
    });

    // Cleanup: Revert all GSAP animations when the component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page-container">
      {/* Suspense catches the "promise" of the lazy components 
        and displays your PageLoader until they are ready.
      */}
      <Suspense fallback={<PageLoader />}>
        <main>
          <Intro />
          <Philosophy />
          <Timeline />
          <Domains />
          <Achievements />
          <Funding />
        </main>
      </Suspense>
    </div>
  );
}