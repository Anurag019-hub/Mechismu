import React from 'react';
import SectionWrapper from '@/components/home/common/SectionWrapper';
import '@/components/FacultyIncharge/faculty-incharge.css';

const FACULTY = [
  {
    name: 'Faculty Incharge',
    role: 'Incharge',
    image: '/images/faculty/prof-srinivas.jpg',
  },
  {
    name: 'Faculty Incharge',
    role: 'Incharge',
    image: '/images/faculty/prof-anirban.jpg',
  },
];

function FacultyCard({ person }) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const showImage = person.image && !imgError;

  return (
    <div className="faculty-card fade-up">
      <div className="faculty-image-wrap">
        {!imgLoaded && (
          <div className="faculty-image-placeholder">
            <span>FI</span>
          </div>
        )}

        {showImage && (
          <img
            src={person.image}
            alt={person.role}
            width={640}
            height={420}
            loading="lazy"
            decoding="async"
            className={`faculty-image ${imgLoaded ? 'loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        <div className="faculty-image-overlay" />
        <div className="faculty-badge">{person.role}</div>
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
            <FacultyCard key={p.role} person={p} />
          ))}
        </div>
      </div>
    </Wrap>
  );
}

export default function FacultyIncharge({ variant }) {
  return <FacultyInchargeInner variant={variant} />;
}

