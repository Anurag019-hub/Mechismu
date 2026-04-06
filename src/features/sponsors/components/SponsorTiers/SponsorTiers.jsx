import React, { memo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tierBenefits, tierColors } from '@/data/sponsors';
import './SponsorTiers.css';

gsap.registerPlugin(ScrollTrigger);

const SponsorTiers = memo(() => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.tier-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="sponsor-tiers" ref={sectionRef}>
      <div className="sponsor-tiers__header">
        <div className="sponsor-tiers__accent" />
        <h2 className="sponsor-tiers__title">SPONSORSHIP TIERS & BENEFITS</h2>
      </div>
      <div className="sponsor-tiers__grid">
        {tierBenefits.map((t) => (
          <div
            className="tier-card"
            key={t.tier}
            style={{ '--tier-color': tierColors[t.tier] }}
          >
            <div className="tier-card__top">
              <span className="tier-card__tier">{t.tier}</span>
              <span className="tier-card__price">{t.price}</span>
            </div>
            <div className="tier-card__divider" />
            <ul className="tier-card__list">
              {t.benefits.map((b, i) => (
                <li className="tier-card__item" key={i}>
                  <span className="tier-card__bullet" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
});

SponsorTiers.displayName = 'SponsorTiers';

export default SponsorTiers;
