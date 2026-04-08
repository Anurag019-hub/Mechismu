import React, { memo } from 'react';
import '@/features/team/components/yearselector/YearSelector.css';

// ===== COMPONENT =====
const YearSelector = memo(({ years, activeYear, onYearChange }) => {
  return (
    <div className="year-selector">
      {years.map((year) => (
        <button
          key={year}
          className={`year-selector__btn ${year === activeYear ? 'year-selector__btn--active' : ''}`}
          onClick={() => onYearChange(year)}
          type="button"
        >
          {year}
        </button>
      ))}
    </div>
  );
});

YearSelector.displayName = 'YearSelector';

export default YearSelector;
