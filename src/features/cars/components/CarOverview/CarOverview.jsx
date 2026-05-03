import React from 'react';

// ===== COMPONENT =====
const CarOverview = ({ overview }) => {
  if (!overview || !overview.description) return null;
  
  return (
    <div className="car-overview">
      {overview.description}
    </div>
  );
}

export default React.memo(CarOverview);