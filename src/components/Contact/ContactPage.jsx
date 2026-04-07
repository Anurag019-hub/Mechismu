import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from '@/components/contact/ContactForm';
import '@/components/contact/ContactPage.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_CARDS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    sysLabel: 'COMMS_SYS',
    title: 'EMAIL',
    info: 'mechismu@iitism.ac.in',
    href: 'mailto:mechismu@iitism.ac.in',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    sysLabel: 'LOC_NODE',
    title: 'LOCATION',
    info: 'IIT (ISM) Dhanbad, Jharkhand 826004',
    href: 'https://maps.google.com/?q=IIT+ISM+Dhanbad',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    sysLabel: 'NET_LINK',
    title: 'SOCIAL',
    info: '@mechismu_racing',
    href: 'https://instagram.com/mechismu_racing',
  },
];

const SOCIALS = [
  {
    name: 'LINKEDIN',
    href: 'https://linkedin.com/company/mechismu',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'INSTAGRAM',
    href: 'https://instagram.com/mechismu_racing',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'YOUTUBE',
    href: 'https://youtube.com/@mechismu',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
];

const ContactPage = memo(function ContactPage() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const mainRef = useRef(null);
  const socialRef = useRef(null);
  const ctaRef = useRef(null);

  // Hero reveal
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.ctp-hero__tag', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo('.ctp-hero__title', { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out', delay: 0.2 });
      gsap.fromTo('.ctp-hero__sub', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.55 });
      gsap.fromTo('.ctp-hero__ref', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.8 });
      gsap.fromTo('.ctp-hero__wire', { opacity: 0, scale: 0.7, rotation: 0 }, { opacity: 1, scale: 1, rotation: 45, duration: 1, ease: 'power2.out', delay: 0.4 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Cards stagger
  useEffect(() => {
    if (!cardsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ctp-cards__item',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.85 }
      );
    }, cardsRef);
    return () => ctx.revert();
  }, []);

  // Section reveals
  useEffect(() => {
    const refs = [mainRef.current, socialRef.current, ctaRef.current].filter(Boolean);
    const ctx = gsap.context(() => {
      refs.forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="ctp">
      {/* ── BG ── */}
      <div className="ctp__bg">
        <div className="ctp__bg-carbon" />
        <div className="ctp__bg-grid" />
        <div className="ctp__bg-glow ctp__bg-glow--1" />
        <div className="ctp__bg-glow ctp__bg-glow--2" />
      </div>

      {/* ═══ 1. HERO ═══ */}
      <header className="ctp-hero" ref={heroRef}>
        {/* Wireframe decorations */}
        <div className="ctp-hero__wire ctp-hero__wire--l" />
        <div className="ctp-hero__wire ctp-hero__wire--r" />

        <div className="ctp-hero__content">
          <div className="ctp-hero__tag-row">
            <span className="ctp-hero__line-deco" />
            <span className="ctp-hero__tag">// MECHISMU RACING — IIT (ISM) DHANBAD</span>
            <span className="ctp-hero__line-deco" />
          </div>

          <h1 className="ctp-hero__title">
            GET IN <span className="ctp-hero__title--accent">TOUCH</span>
          </h1>

          <p className="ctp-hero__sub">
            FORMULA STUDENT ELECTRIC TEAM — OPEN COMMUNICATION CHANNEL
          </p>

          <span className="ctp-hero__ref">REF_001 :: CONTACT_MODULE</span>
        </div>
      </header>

      {/* ═══ 2. FLOATING CARDS ═══ */}
      <div className="ctp-cards" ref={cardsRef}>
        <div className="ctp-cards__grid">
          {CONTACT_CARDS.map((card, i) => (
            <a
              key={i}
              className="ctp-cards__item"
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="ctp-cards__top">
                <span className="ctp-cards__icon">{card.icon}</span>
                <span className="ctp-cards__sys">{card.sysLabel}</span>
              </div>
              <h3 className="ctp-cards__title">{card.title}</h3>
              <p className="ctp-cards__info">{card.info}</p>
            </a>
          ))}
        </div>
      </div>

      {/* ═══ 3. MAIN — FORM + INFO ═══ */}
      <section className="ctp-main" ref={mainRef}>
        <div className="ctp-main__grid">
          {/* LEFT: Form */}
          <div className="ctp-main__left">
            <ContactForm />
          </div>

          {/* RIGHT: Info */}
          <div className="ctp-main__right">
            {/* Image block */}
            <div className="ctp-info-img">
              <div className="ctp-info-img__overlay">
                <span className="ctp-info-img__label">ENGINEERING_BAY_04</span>
              </div>
            </div>

            {/* Info panel */}
            <div className="ctp-info-panel">
              <div className="ctp-info-panel__row">
                <span className="ctp-info-panel__key">ADDRESS</span>
                <span className="ctp-info-panel__val">
                  SAC Building, IIT (ISM) Dhanbad,<br />
                  Jharkhand — 826004, India
                </span>
              </div>
              <div className="ctp-info-panel__divider" />
              <div className="ctp-info-panel__row">
                <span className="ctp-info-panel__key">EMAIL</span>
                <span className="ctp-info-panel__val">mechismu@iitism.ac.in</span>
              </div>
              <div className="ctp-info-panel__divider" />
              <div className="ctp-info-panel__row">
                <span className="ctp-info-panel__key">RESPONSE TIME</span>
                <span className="ctp-info-panel__val">~24–48 HOURS</span>
              </div>
              <div className="ctp-info-panel__divider" />
              <div className="ctp-info-panel__row">
                <span className="ctp-info-panel__key">STATUS</span>
                <span className="ctp-info-panel__val ctp-info-panel__val--live">
                  <span className="ctp-info-panel__dot" />
                  CHANNEL ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. SOCIAL CONNECT ═══ */}
      <section className="ctp-social" ref={socialRef}>
        <div className="ctp-social__header">
          <div className="ctp-social__accent" />
          <h2 className="ctp-social__title">CONNECT TO EXTERNAL NODE</h2>
        </div>
        <div className="ctp-social__grid">
          {SOCIALS.map((s, i) => (
            <a
              key={i}
              className="ctp-social__link"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
            >
              <span className="ctp-social__icon">{s.icon}</span>
              <span className="ctp-social__name">{s.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ 5. FINAL CTA ═══ */}
      <section className="ctp-cta" ref={ctaRef}>
        <div className="ctp-cta__inner">
          <div className="ctp-cta__glow" />
          <span className="ctp-cta__tag">// TRANSMISSION READY</span>
          <h2 className="ctp-cta__title">
            READY TO BUILD THE FUTURE<br />OF ELECTRIC MOBILITY?
          </h2>
          <a href="mailto:mechismu@iitism.ac.in" className="ctp-cta__btn">
            <span>INITIATE CONTACT</span>
            <div className="ctp-cta__btn-fill" />
          </a>
          <div className="ctp-cta__status">
            <span className="ctp-cta__status-item">
              <span className="ctp-cta__status-dot ctp-cta__status-dot--green" />
              SYSTEM_STATUS: NOMINAL
            </span>
            <span className="ctp-cta__status-item">
              <span className="ctp-cta__status-dot ctp-cta__status-dot--green" />
              CORE_TEMP: OPTIMAL
            </span>
            <span className="ctp-cta__status-item">
              <span className="ctp-cta__status-dot" />
              LINK_QUALITY: 98.7%
            </span>
          </div>
        </div>
      </section>
    </div>
  );
});

ContactPage.displayName = 'ContactPage';

export default ContactPage;
