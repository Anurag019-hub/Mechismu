import React, { memo, useState, useRef, useEffect } from 'react';
import './FilterBar.css';

const FILTERS = [
  { key: 'all', label: 'ALL' },
  { key: 'leadership', label: 'LEADERSHIP' },
  { key: 'vd', label: 'VD' },
  { key: 'hv', label: 'HV' },
  { key: 'lv', label: 'LV' },
  { key: 'ops', label: 'OPS' },
  { key: 'structures', label: 'STRUCTURES' },
];

const FilterBar = memo(({ activeFilter, onFilterChange, searchQuery, onSearchChange }) => {
  const searchRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="filter-bar">
      <div className="filter-bar__buttons">
        {FILTERS.map((filter) => (
          <button
            key={filter.key}
            className={`filter-bar__btn ${filter.key === activeFilter ? 'filter-bar__btn--active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={`filter-bar__search ${isFocused ? 'filter-bar__search--focused' : ''}`}>
        <svg
          className="filter-bar__search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={searchRef}
          className="filter-bar__search-input"
          type="text"
          placeholder="SEARCH MEMBER..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchQuery && (
          <button
            className="filter-bar__search-clear"
            onClick={() => onSearchChange('')}
            type="button"
            aria-label="Clear search"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;
