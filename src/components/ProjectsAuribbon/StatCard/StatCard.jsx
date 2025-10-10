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
const StatCard = ({ label, value }) => (
  <div className="stat-card">
    <h4 className="stat-card__label">{label}</h4>
    <p className="stat-card__value">{value}</p>
  </div>
);

export default StatCard;
