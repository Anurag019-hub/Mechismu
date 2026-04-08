import React, { memo } from 'react';

// Memoized — rendered inside YearSection list items
const HighlightStrip = memo(function HighlightStrip({ highlights, milestones }) {
  if ((!highlights || highlights.length === 0) && (!milestones || milestones.length === 0)) {
    return null;
  }

  return (
    <div className="wins-highlight-strip">
      {/* Target all highlights */}
      {highlights && highlights.map((hl, index) => (
        <div className="wins-highlight-strip__primary" key={`hl-${index}`}>
          <span className="wins-highlight-strip__primary-label">ACHIEVEMENT</span>
          <span className="wins-highlight-strip__primary-value">{hl}</span>
        </div>
      ))}

      {/* Render milestones */}
      {milestones && milestones.length > 0 && (
        <div className="wins-highlight-strip__milestones">
          {milestones.map((m, index) => (
            <div className="wins-highlight-strip__milestone-block" key={index}>
              <div className="wins-highlight-strip__bullet" />
              <span className="wins-highlight-strip__milestone-text">{m}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

HighlightStrip.displayName = 'HighlightStrip';

export default HighlightStrip;
