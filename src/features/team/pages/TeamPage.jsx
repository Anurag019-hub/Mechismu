/**
 * File: TeamPage.jsx
 * Purpose: Container and logic for the Team feature
 * Notes:
 * - Handles dynamic JSON loading for roster seasons
 * - Orchestrates FilterBar and YearSelector states
 * - Injects GSAP animations
 */

// ===== IMPORTS =====
// React
import React, { useRef, useEffect } from 'react';

// Third-party
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Internal
import { YearSelector, FilterBar, TeamSection } from '@/features/team/components';
import { useTeamFilter } from '@/features/team/hooks/useTeamFilter';
import '@/features/team/pages/TeamPage.css';

gsap.registerPlugin(ScrollTrigger);

const AVAILABLE_YEARS = [2026];

// ===== COMPONENT =====
const TeamPage = () => {
  // ===== HOOKS & STATE =====
  const {
    activeYear,
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    isLoading,
    filteredSections,
    totalMembers,
    changeYear,
    completeYearChange
  } = useTeamFilter(2026);

  const contentRef = useRef(null);
  const heroRef = useRef(null);

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

  // ===== HANDLERS =====
  // Year change transition
  const handleYearChange = (year) => {
    if (!changeYear(year)) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        completeYearChange(year);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
        );
        setTimeout(() => ScrollTrigger.refresh(), 200);
      },
    });
  };

  // ===== RENDER =====
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
              <TeamSection
                key={section.key}
                id={`section-${section.key}`}
                deptKey={section.key}
                title={section.label}
                members={section.members}
                activeYear={activeYear}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default React.memo(TeamPage);
