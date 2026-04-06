import React, { memo } from 'react';
import './YearFilter.css';

// Memoized to prevent re-render of filter buttons on every parent state change
const YearFilter = memo(function YearFilter({ years, activeYear, onSelect }) {
  return (
    <div className="wins-filter">
      <button
        type="button"
        className={`wins-filter__pill ${activeYear === 'ALL_RECORDS' ? 'wins-filter__pill--active' : ''}`}
        onClick={() => onSelect('ALL_RECORDS')}
      >
        ALL_RECORDS
      </button>
      
      {years.map((y) => (
        <button
          key={y}
          type="button"
          className={`wins-filter__pill ${activeYear === y ? 'wins-filter__pill--active' : ''}`}
          onClick={() => onSelect(y)}
        >
          {y}
        </button>
      ))}
    </div>
  );
});

YearFilter.displayName = 'YearFilter';

export default YearFilter;
