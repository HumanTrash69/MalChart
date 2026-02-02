import React from 'react';
import './SortSection.css';

const SortSection = ({ totalAnime, unfilteredTotal, onSortChange, onFilterChange, filters, categories }) => {
  const scrollToCategory = (category) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      const yOffset = -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sort-section-container">
      <div className="left-section">
        <div className="total-anime">
          Showing: {totalAnime}/{unfilteredTotal || totalAnime}
        </div>
        {categories && (
          <div className="category-nav-inline">
            {Object.entries(categories).map(([category, count]) => (
              count > 0 && (
                <button
                  key={category}
                  className="category-nav-button"
                  onClick={() => scrollToCategory(category)}
                >
                  {category}
                  <span className="count">({count})</span>
                </button>
              )
            ))}
          </div>
        )}
      </div>
      <div className="controls-section">
        <div className="filter-section">
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={filters?.showHentai ?? false}
              onChange={(e) => onFilterChange('showHentai', e.target.checked)}
            />
            <span>Hentai</span>
          </label>
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={filters?.showKids ?? false}
              onChange={(e) => onFilterChange('showKids', e.target.checked)}
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