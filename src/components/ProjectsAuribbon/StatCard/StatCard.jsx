import React from 'react';
import './StatCard.scss';

/**
 * StatCard component displays a labeled piece of information, such as
 * "Problem", "Approach", or "Result" along with its description.
 *
 * Props:
 * - label: A short heading for the card.
 * - value: The content or description associated with the label.
 */
const StatCard = ({ label, value, tone = 'pink' }) => {
  const toneClass = {
    pink: 'stat-card--pink',
    emerald: 'stat-card--emerald',
    sky: 'stat-card--sky',
  }[tone] || 'stat-card--pink';

  return (
    <div className={`stat-card ${toneClass}`}>
      <h4 className="stat-card__label">{label}</h4>
      <p className="stat-card__value">{value}</p>
    </div>
  );
};

export default StatCard;
