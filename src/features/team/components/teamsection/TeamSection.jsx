import React, { memo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamCard from '@/features/team/components/teamcard/TeamCard';
import '@/features/team/components/teamsection/TeamSection.css';

gsap.registerPlugin(ScrollTrigger);

const TeamSection = ({ title, members, id, activeYear, deptKey }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !members?.length) return;

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
  }, [members, activeYear]); // Added activeYear to dependency to refresh animations on year change

  if (!members || members.length === 0) return null;

  return (
    <section className="team-section" id={id} ref={sectionRef}>
      <div className="team-section__header" ref={headingRef}>
        <div className="team-section__accent" />
        <h2 className="team-section__title">{title}</h2>
        <span className="team-section__count">
          {String(members.length).padStart(2, '0')}
        </span>
      </div>

      <div className="team-section__grid" ref={gridRef}>
        {members.map((member) => (
          <TeamCard
            /* CRITICAL FIX: Use a composite key. 
               If Anurag is in 'lv' and 'ops', he needs a unique key for each 
               to avoid React state conflicts.
            */
            key={`${deptKey}-${member.id || member.name}`}
            member={member}
            activeYear={activeYear}
            sectionKey={deptKey} // This links back to r.dept in your JSON
          />
        ))}
      </div>
    </section>
  );
};

TeamSection.displayName = 'TeamSection';

export default memo(TeamSection);