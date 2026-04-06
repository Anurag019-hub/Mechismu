import React, { memo, useRef, useState } from 'react';
import './TeamCard.css';

const TeamCard = memo(({ member }) => {
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="team-card" ref={cardRef}>
      <div className="team-card__image-wrapper">
        {!imgLoaded && !imgError && (
          <div className="team-card__placeholder">
            <span className="team-card__initials">{initials}</span>
          </div>
        )}
        {imgError ? (
          <div className="team-card__placeholder team-card__placeholder--error">
            <span className="team-card__initials">{initials}</span>
          </div>
        ) : (
          <img
            className={`team-card__image ${imgLoaded ? 'team-card__image--loaded' : ''}`}
            src={member.image}
            alt={member.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
        <div className="team-card__overlay" />
      </div>

      <div className="team-card__content">
        <h3 className="team-card__name">{member.name}</h3>
        <p className="team-card__role">{member.role}</p>
      </div>

      <div className="team-card__socials">
        {member.email && (
          <a
            href={member.email}
            className="team-card__social-link"
            aria-label={`Email ${member.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            className="team-card__social-link"
            aria-label={`LinkedIn of ${member.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        )}
        {member.instagram && (
          <a
            href={member.instagram}
            className="team-card__social-link"
            aria-label={`Instagram of ${member.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
});

TeamCard.displayName = 'TeamCard';

export default TeamCard;
