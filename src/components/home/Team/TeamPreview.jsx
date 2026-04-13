import React from 'react';
import SectionWrapper from '@/components/home/common/SectionWrapper';
import CTAButton from '@/components/home/common/CTAButton';
import '@/components/home/Team/team.css';

const LEADERS = [
  {
    name: 'Sangeet M. Ajith',
    role: 'Team Captain',
    tagline: 'Drives vision, sets direction, owns every decision — defining the standard and pushing performance forward.',
    image: '/images/members/sangeeth-m-ajith.webp',
    linkedin: 'https://www.linkedin.com/in/sangeethmajith/',
  },
  {
    name: 'Maninder Singh',
    role: 'Vice Captain',
    tagline: 'Drives execution alongside vision — keeping performance consistent across every system.',
    image: '/images/members/maninder-singh.webp',
    linkedin: 'https://www.linkedin.com/in/mrdimara/',
  },
  {
    name: 'Yash Rao',
    role: 'Manufacturing head',
    tagline: 'Builds what others only design — no shortcuts, only performance that holds under pressure.',
    image: '/images/members/yash-rao.webp',
    linkedin: 'https://www.linkedin.com/in/yash-rao-71820a287/',
  },
  {
    name: 'Sahil Kumar',
    role: 'HV Head',
    tagline: 'Powers every system. Controls every move — absolute precision in every signal, every response',
    image: '/images/members/sahil-kumar.webp',
    linkedin: 'https://www.linkedin.com/in/sahil-kumar-0b0784287/',
  },
  {
    name: 'Arindam Jha',
    role: 'VD Head',
    tagline: 'Masters vehicle behavior — where precision handling meets raw performance.',
    image: '/images/members/arindam-jha.webp',
    linkedin: 'https://www.linkedin.com/in/arindamjha/',
  },
  {
    name: 'Justin George',
    role: 'Operations Head',
    tagline: 'Transforms connections into capital, and strategy into sustained growth — powering the team beyond the track',
    image: '/images/members/justin-george.webp',
    linkedin: 'https://www.linkedin.com/in/jstingeorg/',
  },
];

function LeaderCard({ leader }) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  const initials = leader.name
    ? leader.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  const showImage = leader.image && !imgError;

  return (
    <div className="team-card fade-up">
      <div className="team-image-wrapper">
        {/* Placeholder (initials) */}
        {!imgLoaded && (
          <div className="team-image-placeholder">
            <span>{initials}</span>
          </div>
        )}

        {/* Image */}
        {showImage && (
          <img
            src={leader.image}
            alt={leader.name}
            loading="lazy"
            className={`team-image ${imgLoaded ? 'loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}

        <div className="team-image-overlay" />
        <div className="team-role-badge">{leader.role}</div>
      </div>

      <div className="team-info">
        <h3 className="team-name">{leader.name}</h3>
        <p className="team-tagline">{leader.tagline}</p>

        <a
          href={leader.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="team-social-link"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          LINKEDIN
        </a>
      </div>

      <div className="team-card-accent" />
    </div>
  );
}

export default function TeamPreview() {
  return (
    <SectionWrapper className="team-section">
      <div className="team-header-accent fade-up">
        <div className="team-header-line" />
        <span className="team-header-label">// COMMAND_STRUCTURE</span>
      </div>

      <h2 className="team-title fade-up">
        THE <span className="team-title-accent">CREW</span>
      </h2>

      <p className="team-desc fade-up">
        Led by passionate engineers who live and breathe racing — our
        leadership drives innovation from concept to competition.
      </p>

      <div className="team-grid">
        {LEADERS.map((leader) => (
          <LeaderCard key={leader.name} leader={leader} />
        ))}
      </div>

      <div className="fade-up">
        <CTAButton text="FULL TEAM" to="/team" variant="outline" />
      </div>
    </SectionWrapper>
  );
}