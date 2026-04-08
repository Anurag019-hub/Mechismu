import React, { memo } from 'react';
import '@/features/sponsors/components/sponsorfilters/SponsorFilters.css';

const STATUS_OPTIONS = [
  { key: 'all', label: 'ALL' },
  { key: 'current', label: 'CURRENT' },
  { key: 'past', label: 'PAST' },
];

const YEAR_OPTIONS = [2025, 2024, 2023, 2022];

const SponsorFilters = memo(({
  activeStatus,
  onStatusChange,
  activeYear,
  onYearChange,
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
              className={`sponsor-filters__pill ${opt.key === activeStatus ? 'sponsor-filters__pill--active' : ''}`}
              onClick={() => onStatusChange(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year Pills */}
      <div className="sponsor-filters__group">
        <span className="sponsor-filters__label">YEAR</span>
        <div className="sponsor-filters__pills">
          <button
            type="button"
            className={`sponsor-filters__pill ${activeYear === null ? 'sponsor-filters__pill--active' : ''}`}
            onClick={() => onYearChange(null)}
          >
            ALL
          </button>
          {YEAR_OPTIONS.map((year) => (
            <button
              key={year}
              type="button"
              className={`sponsor-filters__pill ${year === activeYear ? 'sponsor-filters__pill--active' : ''}`}
              onClick={() => onYearChange(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

SponsorFilters.displayName = 'SponsorFilters';

export default SponsorFilters;
