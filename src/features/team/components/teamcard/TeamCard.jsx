import React, { memo, useRef, useState, useMemo, useEffect } from 'react';
import '@/features/team/components/teamcard/TeamCard.css';

const TeamCard = memo(({ member, activeYear, sectionKey }) => {
  const cardRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Initials
  const initials = member.name
    ? member.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  // Get year entry
  const yearEntry = useMemo(() =>
    member.history?.find((h) => String(h.year) === String(activeYear)),
    [member.history, activeYear]
  );

  // Active roles
  const activeRoles = useMemo(() => {
    if (!yearEntry || !yearEntry.roles) return [];

    if (sectionKey) {
      return yearEntry.roles.filter(
        (r) => r.dept.toLowerCase() === sectionKey.toLowerCase()
      );
    }
    return yearEntry.roles;
  }, [yearEntry, sectionKey]);

  // Role history
  const roleHistory = useMemo(() =>
    (member.history || [])
      .flatMap((h) => h.roles.map((r) => ({ ...r, year: h.year })))
      .sort((a, b) => Number(b.year) - Number(a.year)),
    [member.history]
  );

  const hasHistory = member.history?.length > 1;

  // Handle cached images
  useEffect(() => {
    const img = cardRef.current?.querySelector('img');
    if (img?.complete) setImgLoaded(true);
  }, []);

  return (
    <div className="team-card" ref={cardRef}>
      {/* Image */}
      <div className="team-card__image-wrapper">
        {member.image ? (
          <>
            {!imgLoaded && (
              <div className="team-card__placeholder">
                <span className="team-card__initials">{initials}</span>
              </div>
            )}

            <img
              className={`team-card__image ${imgLoaded ? 'team-card__image--loaded' : ''}`}
              src={member.image}
              alt={member.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </>
        ) : (
          <div className="team-card__placeholder">
            <span className="team-card__initials">{initials}</span>
          </div>
        )}

        <div className="team-card__overlay" />

        {hasHistory && (
          <span className="team-card__history-badge">
            {member.history.length}Y
          </span>
        )}
      </div>

      {/* Content */}
      <div className="team-card__content">
        <h3 className="team-card__name">{member.name}</h3>

        <div className="team-card__roles">
          {activeRoles.length > 0 ? (
            activeRoles.map((r, i) => (
              <span key={`${r.dept}-${i}`} className="team-card__role-pill">
                {r.title}
              </span>
            ))
          ) : (
            <span className="team-card__role-pill team-card__role-pill--none">—</span>
          )}
        </div>

        {hasHistory && (
          <ul className="team-card__history">
            {roleHistory.map((r, i) => (
              <li
                key={`${r.year}-${i}`}
                className={`team-card__history-item ${String(r.year) === String(activeYear)
                    ? 'team-card__history-item--active'
                    : ''
                  }`}
              >
                <span className="team-card__history-year">{r.year}</span>
                <span className="team-card__history-title">{r.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Socials */}
      <div className="team-card__socials">
        {member.email && (
          <a href={member.email} className="team-card__social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        )}

        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-card__social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        )}

        {member.instagram && (
          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="team-card__social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
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