import React, { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectsData from '@/data/projects.json';
import '@/features/projects/pages/ProjectsPage.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectsPage = memo(function ProjectsPage() {
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.proj-hero__tag',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.proj-hero__title',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
      );
      gsap.fromTo(
        '.proj-hero__sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.45 }
      );
      gsap.fromTo(
        '.proj-hero__line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut', delay: 0.65 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.proj-card');
    if (!cards?.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  const count = projectsData.projects?.length ?? 0;

  return (
    <div className="proj-page">
      <div className="proj-page__bg" aria-hidden="true">
        <div className="proj-page__bg-glow proj-page__bg-glow--1" />
        <div className="proj-page__bg-glow proj-page__bg-glow--2" />
        <div className="proj-page__bg-grid" />
      </div>

      <div className="proj-page__container" ref={heroRef}>
        <header className="proj-hero">
          <span className="proj-hero__tag">{projectsData.heroTag}</span>
          <h1 className="proj-hero__title">{projectsData.heroTitle}</h1>
          <p className="proj-hero__sub">{projectsData.heroSubtitle}</p>
          <div className="proj-hero__line" />
        </header>

        <section aria-labelledby="projects-heading">
          <div className="proj-section__header">
            <div className="proj-section__accent" />
            <h2 id="projects-heading" className="proj-section__title">
              Featured work
            </h2>
            <span className="proj-section__count">
              {String(count).padStart(2, '0')} PROJECT{count === 1 ? '' : 'S'}
            </span>
          </div>

          <div className="proj-list" ref={cardsRef}>
            {projectsData.projects.map((project) => (
              <article key={project.id} className="proj-card">
                <div className="proj-card__media">
                  <img src={project.image} alt={project.imageAlt || project.title} loading="lazy" />
                  <div className="proj-card__overlay" />
                  <div className="proj-card__pill">{project.category || 'Project'}</div>
                </div>
                <div className="proj-card__body">
                  <div className="proj-card__meta">
                    <span>{project.status || 'Active'}</span>
                    <span>{project.year || '2026'}</span>
                  </div>
                  <h3 className="proj-card__title">{project.title}</h3>
                  {!!project.tags?.length && (
                    <div className="proj-card__tags">
                      {project.tags.map((tag) => (
                        <span key={`${project.id}-${tag}`} className="proj-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="proj-card__sections">
                    {(project.sections || []).map((block, i) => (
                      <div key={`${project.id}-section-${i}`} className="proj-block">
                        <h4 className="proj-block__heading">{block.heading}</h4>
                        <p className="proj-block__text">{block.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});

ProjectsPage.displayName = 'ProjectsPage';

export default ProjectsPage;
