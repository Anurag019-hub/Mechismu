import React, { useEffect, useState, useRef } from 'react';
import SectionWrapper from '@/components/home/common/SectionWrapper';
import CTAButton from '@/components/home/common/CTAButton';
import '@/components/home/Achievements/achievements.css';

function useCounter(to, duration = 2, startFrom = 0) {
  const ref = useRef(null);
  const [count, setCount] = useState(startFrom);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(startFrom + (to - startFrom) * progress));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, startFrom]);

  return { ref, count };
}

const STATS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    number: 3,
    suffix: 'rd',
    label: 'OVERALL — PI-EV 2023',
    duration: 0.3,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m16 12-4-4-4 4" /><path d="M12 16V8" />
      </svg>
    ),
    number: 1,
    suffix: 'st',
    label: 'PROCUREMENT',
    duration: 0.35,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    number: 2,
    suffix: 'nd',
    label: 'DESIGN EVENT',
    duration: 0.35,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    number: 7,
    suffix: '+',
    label: 'CARS BUILT',
    duration: 0.5,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    number: 60,
    suffix: '+',
    label: 'TEAM MEMBERS',
    duration: 0.8,
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    number: 15,
    suffix: '+',
    label: 'COMPETITIONS',
    duration: 0.7,
  },
];

function StatCard({ stat }) {
  const { ref, count } = useCounter(stat.number, stat.duration, stat.number > 10 ? Math.floor(stat.number * 0.6) : 0);

  return (
    <div className="stat-card fade-up" ref={ref}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-number-wrapper">
        {count}
        <span className="stat-number-suffix">{stat.suffix}</span>
      </div>
      <p className="stat-label">{stat.label}</p>
    </div>
  );
}

export default function Achievements() {
  return (
    <SectionWrapper className="achievements-section">
      <div className="achievements-bg-glow" />

      <div className="achievements-header-accent fade-up">
        <div className="achievements-header-line" />
        <span className="achievements-header-label">// PERFORMANCE_RECORD</span>
      </div>

      <h2 className="achievements-title fade-up">
        System Performance <span className="achievements-title-accent">Matrix</span>
      </h2>

      <p className="achievements-desc fade-up">
        Proven performance in Formula Student EV competitions with consistent
        top-tier rankings across design, engineering, and procurement events.
      </p>

      <div className="achievements-grid">
        {STATS.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      <div className="achievements-cta fade-up">
        <CTAButton text="ALL WINS" to="/wins" variant="outline" />
      </div>
    </SectionWrapper>
  );
}
