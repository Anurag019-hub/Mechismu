import React, { useState, useMemo, useEffect, useRef, useCallback, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sponsors, tierOrder, whyPartner, supportMethods } from '@/data/sponsors';
import SponsorFilters from '@/features/sponsors/components/sponsorfilters/SponsorFilters';
import SponsorCard from '@/features/sponsors/components/sponsorcard/SponsorCard';
import SponsorTiers from '@/features/sponsors/components/sponsortiers/SponsorTiers';
import '@/features/sponsors/pages/SponsorsPage.css';

gsap.registerPlugin(ScrollTrigger);

const SponsorsPage = memo(function SponsorsPage() {
  const [activeStatus, setActiveStatus] = useState('all');

  // Stable callback
  const handleStatusChange = useCallback((status) => setActiveStatus(status), []);

  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const whyRef = useRef(null);
  const howRef = useRef(null);
  const ctaRef = useRef(null);

  // ── Filter logic (YEAR REMOVED) ──
  const filtered = useMemo(() => {
    let list = [...sponsors];

    if (activeStatus !== 'all') {
      list = list.filter((s) => s.status === activeStatus);
    }

    // Sort by tier hierarchy
    list.sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier));

    return list;
  }, [activeStatus]);

  // ── Hero GSAP ──
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.sp-hero__tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo('.sp-hero__title', { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out', delay: 0.2 });
      gsap.fromTo('.sp-hero__sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.5 });
      gsap.fromTo('.sp-hero__line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut', delay: 0.75 });
      gsap.fromTo('.sp-hero__actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.95 });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── Section reveals ──
  useEffect(() => {
    const sections = [whyRef.current, howRef.current, ctaRef.current].filter(Boolean);

    const ctx = gsap.context(() => {
      sections.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // ── Grid animation on filter change ──
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.sponsor-card');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
      }
    );
  }, [filtered]);

  return (
    <div className="sp-page">
      {/* Background */}
      <div className="sp-page__bg">
        <div className="sp-page__bg-glow sp-page__bg-glow--1" />
        <div className="sp-page__bg-glow sp-page__bg-glow--2" />
        <div className="sp-page__bg-grid" />
      </div>

      <div className="sp-page__container" ref={heroRef}>

        {/* HERO */}
        <header className="sp-hero">
          <span className="sp-hero__tag">// MECHISMU RACING — PARTNERSHIPS</span>
          <h1 className="sp-hero__title">SUPPORT OUR TEAM</h1>
          <p className="sp-hero__sub">
            POWERING THE NEXT GENERATION OF ELECTRIC FORMULA STUDENT ENGINEERING
          </p>
          <div className="sp-hero__line" />
          <div className="sp-hero__actions">
            <a href="#contact-cta" className="sp-btn sp-btn--primary">
              BECOME A SPONSOR
            </a>
            <a href="#tiers" className="sp-btn sp-btn--glass">
              VIEW BENEFITS
            </a>
          </div>
        </header>

        {/* FILTERS */}
        <section className="sp-section" id="sponsors">
          <div className="sp-section__header">
            <div className="sp-section__accent" />
            <h2 className="sp-section__title">OUR SPONSORS</h2>
            <span className="sp-section__count">
              {String(filtered.length).padStart(2, '0')} SPONSORS
            </span>
          </div>

          <SponsorFilters
            activeStatus={activeStatus}
            onStatusChange={handleStatusChange}
          />
        </section>

        {/* GRID */}
        <div className="sp-grid" ref={gridRef}>
          {filtered.length === 0 ? (
            <div className="sp-empty">
              <span className="sp-empty__icon">⚡</span>
              <p className="sp-empty__text">NO SPONSORS MATCH FILTERS</p>
              <p className="sp-empty__sub">Try adjusting your selection</p>
            </div>
          ) : (
            filtered.map((s, i) => (
              <SponsorCard key={`${s.name}-${i}`} sponsor={s} />
            ))
          )}
        </div>

        {/* TIERS */}
        <div id="tiers">
          <SponsorTiers />
        </div>

        {/* WHY */}
        <section className="sp-why" ref={whyRef}>
          <div className="sp-section__header">
            <div className="sp-section__accent" />
            <h2 className="sp-section__title">WHY PARTNER WITH US</h2>
          </div>

          <div className="sp-why__grid">
            {whyPartner.map((item, i) => (
              <div className="sp-why__card" key={i}>
                <h3 className="sp-why__heading">{item.title}</h3>
                <p className="sp-why__text">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW */}
        <section className="sp-how" ref={howRef}>
          <div className="sp-section__header">
            <div className="sp-section__accent" />
            <h2 className="sp-section__title">HOW TO SUPPORT</h2>
          </div>

          <div className="sp-how__grid">
            {supportMethods.map((method, i) => (
              <div className="sp-how__block" key={i}>
                <span className="sp-how__icon">{method.icon}</span>
                <h3 className="sp-how__heading">{method.title}</h3>
                <p className="sp-how__text">{method.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="sp-cta" id="contact-cta" ref={ctaRef}>
          <div className="sp-cta__inner">
            <span className="sp-cta__tag">// READY TO MAKE AN IMPACT?</span>
            <h2 className="sp-cta__title">FUEL THE FUTURE OF RACING</h2>
            <p className="sp-cta__sub">
              Join our mission to push the limits of electric motorsport engineering.
            </p>
            <a href="mailto:sponsors@mechismu.com" className="sp-btn sp-btn--primary sp-btn--lg">
              GET IN TOUCH
            </a>
          </div>
        </section>

      </div>
    </div>
  );
});

SponsorsPage.displayName = 'SponsorsPage';

export default SponsorsPage;