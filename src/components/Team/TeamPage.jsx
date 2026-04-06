import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import YearSelector from './YearSelector';
import FilterBar from './FilterBar';
import Section from './Section';
import './TeamPage.css';

gsap.registerPlugin(ScrollTrigger);

const AVAILABLE_YEARS = [2025, 2024];

const SECTION_CONFIG = [
  { key: 'leadership', label: 'Leadership', file: 'leadership' },
  { key: 'vd', label: 'Vehicle Dynamics', file: 'vd' },
  { key: 'hv', label: 'High Voltage', file: 'hv' },
  { key: 'lv', label: 'Low Voltage', file: 'lv' },
  { key: 'ops', label: 'Operations', file: 'ops' },
  { key: 'structures', label: 'Structures', file: 'structures' },
];

// Dynamic JSON loader
const loadYearData = async (year) => {
  const results = {};
  for (const section of SECTION_CONFIG) {
    try {
      const module = await import(`../../data/${year}/${section.file}.json`);
      results[section.key] = module.default || module;
    } catch (e) {
      results[section.key] = [];
    }
  }
  return results;
};

export default function TeamPage() {
  const [activeYear, setActiveYear] = useState(2025);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [teamData, setTeamData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef(null);
  const heroRef = useRef(null);

  // Load data for the active year
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    loadYearData(activeYear).then((data) => {
      if (!cancelled) {
        setTeamData(data);
        setIsLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [activeYear]);

  // Hero GSAP animation
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.team-hero__title',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out', delay: 0.15 }
      );
      gsap.fromTo(
        '.team-hero__subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.45 }
      );
      gsap.fromTo(
        '.team-hero__line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut', delay: 0.7 }
      );
      gsap.fromTo(
        '.team-controls',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.9 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Year change transition
  const handleYearChange = useCallback((year) => {
    if (year === activeYear) return;
    setIsTransitioning(true);

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveYear(year);
        setIsTransitioning(false);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
        );
        // Refresh ScrollTrigger for new content
        setTimeout(() => ScrollTrigger.refresh(), 200);
      },
    });
  }, [activeYear]);

  // Filter + search
  const filteredSections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return SECTION_CONFIG.map((section) => {
      if (activeFilter !== 'all' && activeFilter !== section.key) {
        return { ...section, members: [] };
      }

      let members = teamData[section.key] || [];

      if (query) {
        members = members.filter(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            m.role.toLowerCase().includes(query)
        );
      }

      return { ...section, members };
    }).filter((s) => s.members.length > 0);
  }, [teamData, activeFilter, searchQuery]);

  const totalMembers = useMemo(() => {
    return Object.values(teamData).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  }, [teamData]);

  return (
    <div className="team-page">
      {/* Atmospheric background effects */}
      <div className="team-page__bg">
        <div className="team-page__bg-glow team-page__bg-glow--1" />
        <div className="team-page__bg-glow team-page__bg-glow--2" />
        <div className="team-page__bg-grid" />
      </div>

      <div className="team-page__container" ref={heroRef}>
        {/* Hero */}
        <header className="team-hero">
          <span className="team-hero__tag">// MECHISMU RACING</span>
          <h1 className="team-hero__title">OUR TEAM</h1>
          <p className="team-hero__subtitle">
            THE ENGINEERS BEHIND THE MACHINE — {totalMembers} MEMBERS STRONG
          </p>
          <div className="team-hero__line" />
        </header>

        {/* Controls */}
        <div className="team-controls">
          <YearSelector
            years={AVAILABLE_YEARS}
            activeYear={activeYear}
            onYearChange={handleYearChange}
          />
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Content */}
        <main className="team-content" ref={contentRef}>
          {isLoading ? (
            <div className="team-loading">
              <div className="team-loading__spinner" />
              <span className="team-loading__text">LOADING ROSTER...</span>
            </div>
          ) : filteredSections.length === 0 ? (
            <div className="team-empty">
              <span className="team-empty__icon">⚡</span>
              <p className="team-empty__text">NO MEMBERS FOUND</p>
              <p className="team-empty__sub">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredSections.map((section) => (
              <Section
                key={section.key}
                id={`section-${section.key}`}
                title={section.label}
                members={section.members}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
}
