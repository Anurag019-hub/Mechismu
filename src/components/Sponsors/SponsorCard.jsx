import React, { memo, useState } from 'react';
import { tierColors } from '../../data/sponsors';
import './SponsorCard.css';

const SponsorCard = memo(({ sponsor }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const tierColor = tierColors[sponsor.tier] || '#FF544A';
  const initials = sponsor.name.slice(0, 2).toUpperCase();

  return (
    <div className="sponsor-card" style={{ '--tier-color': tierColor }}>
      <div className="sponsor-card__tier-badge">
        <span>{sponsor.tier}</span>
      </div>

      <div className="sponsor-card__logo-wrapper">
        {!imgLoaded && !imgError && (
          <div className="sponsor-card__logo-placeholder">
            <span>{initials}</span>
          </div>
        )}
        {imgError ? (
          <div className="sponsor-card__logo-placeholder sponsor-card__logo-placeholder--error">
            <span>{initials}</span>
          </div>
        ) : (
          <img
            className={`sponsor-card__logo ${imgLoaded ? 'sponsor-card__logo--loaded' : ''}`}
            src={sponsor.logo}
            alt={sponsor.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="sponsor-card__body">
        <h3 className="sponsor-card__name">{sponsor.name}</h3>
        {sponsor.description && (
          <p className="sponsor-card__desc">{sponsor.description}</p>
        )}
      </div>

      <div className="sponsor-card__footer">
        <span className="sponsor-card__year">{sponsor.year}</span>
        {sponsor.website && (
          <a
            href={sponsor.website}
            className="sponsor-card__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>VISIT</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
});

SponsorCard.displayName = 'SponsorCard';

export default SponsorCard;
