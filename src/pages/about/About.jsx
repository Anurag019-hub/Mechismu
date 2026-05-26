import React, { useEffect, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Assets & Styles
import PageLoader from "../../components/ui/PageLoader/PageLoader.jsx";

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Lazy-loaded sections
const Intro = React.lazy(() => import('../../components/Intro/Intro.jsx'));
const Philosophy = React.lazy(() => import('../../components/Philosophy/Philosophy.jsx'));
const Timeline = React.lazy(() => import('../../components/Timeline/Timeline.jsx'));
const Domains = React.lazy(() => import('../../components/Domains/Domains.jsx'));
const Achievements = React.lazy(() => import('../../components/Achievements/Achievements.jsx'));
const Funding = React.lazy(() => import('../../components/Funding/Funding.jsx'));

export default function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800);

      return () => clearTimeout(timer);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page-container">
      <Helmet>
        <title>About Us | Team Mechismu</title>
        <meta
          name="description"
          content="Learn about Team Mechismu, our vision, philosophy, domains, achievements, and journey in Formula Student electric vehicle development."
        />

        <meta property="og:title" content="About Us | Team Mechismu" />
        <meta
          property="og:description"
          content="Learn about Team Mechismu, our journey, philosophy, and achievements."
        />
        <meta property="og:url" content="https://mechismu.nvcti.in/about" />
        <meta property="og:type" content="website" />
      </Helmet>

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