import React, { useState, useEffect } from 'react';
import SectionWrapper from '@/components/home/common/SectionWrapper';
import '@/components/home/Countdown/countdown.css';

const TARGET_DATE = new Date('2027-01-19T00:00:00');

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' });
        return;
      }
      const pad = n => String(Math.max(0, Math.floor(n))).padStart(2, '0');
      setTimeLeft({
        days:  pad(diff / 86400000),
        hours: pad((diff % 86400000) / 3600000),
        mins:  pad((diff % 3600000) / 60000),
        secs:  pad((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function UnitBlock({ value, label }) {
  return (
    <div className="cd-unit glass-card">
      <span className="cd-num">{value ?? '00'}</span>
      <span className="cd-label">{label}</span>
      <div className="cd-accent" />
    </div>
  );
}

export default function Countdown() {
  const { days, hours, mins, secs } = useCountdown(TARGET_DATE);

  return (
    <SectionWrapper className="countdown-section">
      <div className="cars-header-accent fade-up">
        <div className="cars-header-line" />
        <span className="cars-header-label">// NEXT_EVENT</span>
      </div>

      <h2 className="cars-title fade-up">
        THE <span className="cars-title-accent">COUNTDOWN</span>
      </h2>

      <p className="cars-desc fade-up">
        Every second brings us closer to the track. Formula Bharat 2027 —
        where months of engineering face their ultimate test.
      </p>

      <div className="cd-event-strip fade-up">
        <div className="cd-event-dot" />
        <span className="cd-event-text">Formula Bharat 2027</span>
        <span className="cd-event-date">19 JAN 2027 · Kari Motor Speedway, Coimbatore, Tamil Nadu</span>
      </div>

      <div className="cd-grid fade-up">
        <UnitBlock value={days}  label="Days" />
        <span className="cd-sep" aria-hidden="true">:</span>
        <UnitBlock value={hours} label="Hours" />
        <span className="cd-sep" aria-hidden="true">:</span>
        <UnitBlock value={mins}  label="Minutes" />
        <span className="cd-sep" aria-hidden="true">:</span>
        <UnitBlock value={secs}  label="Seconds" />
      </div>
    </SectionWrapper>
  );
}