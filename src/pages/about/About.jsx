import React, { useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import '@/styles/base.css';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ===== LAZY-LOADED SECTIONS =====
const Intro = React.lazy(() => import('../../components/Intro/Intro.jsx'));
const Philosophy = React.lazy(() => import('../../components/Philosophy/Philosophy.jsx'));
const Timeline = React.lazy(() => import('../../components/Timeline/Timeline.jsx'));
const Domains = React.lazy(() => import('../../components/Domains/Domains.jsx'));
const Achievements = React.lazy(() => import('../../components/Achievements/Achievements.jsx'));
const Funding = React.lazy(() => import('../../components/Funding/Funding.jsx'));

/**
 * Loading Component (The "Roater")
 * You can style this in your CSS file
 */
const Loader = () => (
  <div className="loader-wrapper">
    <div className="spinner"></div>
    <style jsx>{`
      .loader-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: #000; /* Match your site background */
      }
      .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.1);
        border-left-color: #ffffff; /* Spinner color */
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default function About() {
  useEffect(() => {
    // gsap.context makes cleanup easy
    const ctx = gsap.context(() => {

      // Refresh ScrollTrigger once components are likely rendered
      // This prevents "jumpy" scroll markers caused by lazy loading
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => clearTimeout(timer);
    });

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <div className="about-page-container">
      <Suspense fallback={<Loader />}>
        <Intro />
        <Philosophy />
        <Timeline />
        <Domains />
        <Achievements />
        <Funding />
      </Suspense>
    </div>
  );
}