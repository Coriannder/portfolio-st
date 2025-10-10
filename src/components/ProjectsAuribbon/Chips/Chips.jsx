import React from 'react';
import './Chips.scss';

/**
 * Chips component renders a collection of small tags representing technologies or skills.
 *
 * Props:
 * - items: Array of strings to display as individual chips.
 */
const Chips = ({ items = [] }) => (
  <div className="chips">
    {items.map((item, idx) => (
      <span key={idx} className="chips__item">
        {item}
      </span>
    ))}
  </div>
);

export default Chips;
