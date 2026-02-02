import React from 'react';
import './SortSection.css';

const SortSection = ({ totalAnime, unfilteredTotal, onSortChange, onFilterChange, filters }) => {
  return (
    <div className="sort-section-container">
      <div className="total-anime">
        Showing: {totalAnime}/{unfilteredTotal || totalAnime}
      </div>
      <div className="controls-section">
        <div className="filter-section">
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={filters?.hideHentai ?? true}
              onChange={(e) => onFilterChange('hideHentai', e.target.checked)}
            />
            <span>Hentai</span>
          </label>
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={filters?.hideKids ?? true}
              onChange={(e) => onFilterChange('hideKids', e.target.checked)}
            />
            <span>Kids</span>
          </label>
        </div>
        <div className="sort-section">
          <label>Sort by:</label>
          <select onChange={(e) => onSortChange(e.target.value)}>
            <option value="members">Members</option>
            <option value="score">Score</option>
            <option value="startDate">Start Date</option>
            <option value="title">Title</option>
            <option value="studio">Studio</option>
            <option value="licensor">Licensor</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortSection;