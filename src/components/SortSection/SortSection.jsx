import React from 'react';
import './SortSection.css';

const SortSection = ({ totalAnime, onSortChange, onFilterChange, filters }) => {
  return (
    <div className="sort-section-container">
      <div className="total-anime">
        {totalAnime} titles
      </div>
      <div className="controls-section">
        <div className="filter-section">
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={filters?.hideHentai ?? true}
              onChange={(e) => onFilterChange('hideHentai', e.target.checked)}
            />
            <span>Hide Hentai</span>
          </label>
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={filters?.hideKids ?? false}
              onChange={(e) => onFilterChange('hideKids', e.target.checked)}
            />
            <span>Hide Kids</span>
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