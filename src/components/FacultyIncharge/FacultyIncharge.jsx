import React from 'react';
import SectionWrapper from '@/components/home/common/SectionWrapper';
import '@/components/FacultyIncharge/faculty-incharge.css';

const FACULTY = [
  {
    name: 'Vedantham Lakshmi Srinivas',
    role: 'Incharge',
    image: '/images/faculty/prof-srinivas.jpg',
  },
  {
    name: 'Anirban Ghoshal',
    role: 'Incharge',
    image: '/images/faculty/prof-anirban.jpg',
  },
];

function FacultyCard({ person }) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const showImage = person.image && !imgError;
  const initials = person.name
    ? person.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'FI';

  return (
    <div className="faculty-card fade-up">
      <div className="faculty-image-wrap">
        {(!imgLoaded || !showImage) && (
          <div className="faculty-image-placeholder">
            <span>{initials}</span>
          </div>
        )}

        {showImage && (
          <img
            src={person.image}
            alt={person.name}
            width={300}
            height={400}
            loading="lazy"
            decoding="async"
            className={`faculty-image ${imgLoaded ? 'loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        <div className="faculty-image-overlay" />
      </div>

      <div className="faculty-card__content">
        <h3 className="faculty-card__name">{person.name}</h3>
        <span className="faculty-card__role-pill">{person.role}</span>
      </div>
    </div>
  );
}

function FacultyInchargeInner({ variant = 'home' }) {
  const Wrap = variant === 'home' ? SectionWrapper : React.Fragment;
  const wrapProps = variant === 'home' ? { className: 'faculty-section' } : {};

  return (
    <Wrap {...wrapProps}>
      <div className={`faculty-incharge faculty-incharge--${variant}`}>
        <div className="faculty-header-accent fade-up">
          <div className="faculty-header-line" />
          <span className="faculty-header-label">// FACULTY_SUPPORT</span>
        </div>

        <h2 className="faculty-title fade-up">
          FACULTY <span className="faculty-title-accent">INCHARGE</span>
        </h2>

        <p className="faculty-desc fade-up">
          Guidance that keeps our engineering sharp and our execution disciplined.
        </p>

        <div className="faculty-grid">
          {FACULTY.map((p) => (
            <FacultyCard key={p.image} person={p} />
          ))}
        </div>
      </div>
    </Wrap>
  );
}

export default function FacultyIncharge({ variant }) {
  return <FacultyInchargeInner variant={variant} />;
}

