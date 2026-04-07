import React, { useEffect, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import '@/styles/base.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ===== LAZY-LOADED SECTIONS (code-split heavy sub-components) =====
const Intro = React.lazy(() => import('../../components/Intro/Intro.jsx'));
const Philosophy = React.lazy(() => import('../../components/Philosophy/Philosophy.jsx'));
const Timeline = React.lazy(() => import('../../components/Timeline/Timeline.jsx'));
const Domains = React.lazy(() => import('../../components/Domains/Domains.jsx'));
const Achievements = React.lazy(() => import('../../components/Achievements/Achievements.jsx'));
const Funding = React.lazy(() => import('../../components/Funding/Funding.jsx'));

export default function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  return (
    <Suspense fallback={null}>
      <Intro />
      <Philosophy />
      <Timeline />
      <Domains />
      <Achievements />
      <Funding />
    </Suspense>
  );
}
