import React, { memo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamCard from './TeamCard';
import './Section.css';

gsap.registerPlugin(ScrollTrigger);

const Section = memo(({ title, members, id }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards stagger reveal
      const cards = gridRef.current?.querySelectorAll('.team-card');
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [members]);

  if (!members || members.length === 0) return null;

  return (
    <section className="team-section" id={id} ref={sectionRef}>
      <div className="team-section__header" ref={headingRef}>
        <div className="team-section__accent" />
        <h2 className="team-section__title">{title}</h2>
        <span className="team-section__count">{String(members.length).padStart(2, '0')}</span>
      </div>
      <div className="team-section__grid" ref={gridRef}>
        {members.map((member, index) => (
          <TeamCard key={`${member.name}-${index}`} member={member} />
        ))}
      </div>
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
