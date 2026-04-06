import React, { memo } from 'react';
import CompetitionCard from '../CompetitionCard/CompetitionCard';
import HighlightStrip from '../HighlightStrip/HighlightStrip';

// Memoized to prevent re-render of year sections when sibling sections don't change
const YearSection = memo(function YearSection({ data }) {
  return (
    <section className="wins-year">
      <div className="wins-year__header">
        <h2 className="wins-year__title">{data.year}</h2>
        <span className="wins-year__label">COMPETITION_LOG // SEASON_RECORDS</span>
      </div>
      <div className="wins-year__line" />

      {/* Highlight Strip */}
      <HighlightStrip highlights={data.highlights} milestones={data.milestones} />

      {/* Competition Grid */}
      {data.competitions && data.competitions.length > 0 && (
        <div className="wins-year__grid">
          {data.competitions.map((comp) => (
            <CompetitionCard key={comp.id || comp.name} comp={comp} />
          ))}
        </div>
      )}
    </section>
  );
});

YearSection.displayName = 'YearSection';

export default YearSection;
