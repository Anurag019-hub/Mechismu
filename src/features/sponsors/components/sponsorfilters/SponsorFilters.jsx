import React, { memo } from 'react';
import '@/features/sponsors/components/sponsorfilters/SponsorFilters.css';

const STATUS_OPTIONS = [
  { key: 'all', label: 'ALL' },
  { key: 'current', label: 'CURRENT' },
  { key: 'past', label: 'PAST' },
];

const SponsorFilters = memo(({
  activeStatus,
  onStatusChange,
}) => {
  return (
    <div className="sponsor-filters">
      {/* Status Pills */}
      <div className="sponsor-filters__group">
        <span className="sponsor-filters__label">STATUS</span>
        <div className="sponsor-filters__pills">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              className={`sponsor-filters__pill ${opt.key === activeStatus
                ? 'sponsor-filters__pill--active'
                : ''
                }`}
              onClick={() => onStatusChange(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

SponsorFilters.displayName = 'SponsorFilters';

export default SponsorFilters;