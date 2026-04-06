import React, { useState, useMemo, useCallback } from 'react';
import { winsData } from '@/data/wins';
import YearFilter from '../components/YearFilter/YearFilter';
import YearSection from '../components/YearSection/YearSection';
import './WinsPage.css';

export default function WinsPage() {
  const [activeYear, setActiveYear] = useState('ALL_RECORDS');

  // Memoized to prevent recalculating years array every render
  const years = useMemo(() => winsData.map(w => w.year), []);

  // Memoized filtered wins — only recalculates when activeYear changes
  const displayedWins = useMemo(() => {
    return activeYear === 'ALL_RECORDS'
      ? winsData
      : winsData.filter(w => w.year === activeYear);
  }, [activeYear]);

  // Stable callback for child optimization
  const handleYearSelect = useCallback((year) => {
    setActiveYear(year);
  }, []);

  return (
    <div className="wins-page">
      <div className="wins-bg">
        <div className="wins-bg__carbon" />
        <div className="wins-bg__grid" />
        <div className="wins-bg__glow wins-bg__glow--1" />
        <div className="wins-bg__glow wins-bg__glow--2" />
      </div>

      <div className="wins-container">
        {/* HERO */}
        <header className="wins-hero">
          <span className="wins-hero__tag">// MECHISMU RACING — TRACK RECORD</span>
          <h1 className="wins-hero__title">OUR WINS</h1>
          <p className="wins-hero__subtitle">
            A LEGACY OF ENGINEERING EXCELLENCE AND HIGH-PERFORMANCE DOMINANCE
          </p>
          <div className="wins-hero__line" />
        </header>

        <YearFilter 
          years={years} 
          activeYear={activeYear} 
          onSelect={handleYearSelect} 
        />

        <div className="wins-list">
          {displayedWins.map(yearData => (
            <YearSection key={yearData.year} data={yearData} />
          ))}
        </div>
      </div>
    </div>
  );
}
