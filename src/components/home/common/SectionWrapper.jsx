import React, { useEffect, useRef } from 'react';
import '@/components/home/common/common.css';

export default function SectionWrapper({ children, className = '' }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = wrapperRef.current.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className={`section-wrapper ${className}`} ref={wrapperRef}>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}
