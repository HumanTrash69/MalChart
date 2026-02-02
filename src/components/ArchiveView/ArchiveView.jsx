import React, { useState } from 'react';
import './ArchiveView.css';

const ArchiveView = ({ onSeasonSelect, currentSeason, currentYear }) => {
  const currentYearNum = new Date().getFullYear();
  const [expandedYears, setExpandedYears] = useState([currentYearNum - 1]);
  
  // Generate years from 2000 to current year - 1 (only past years)
  const years = [];
  for (let y = currentYearNum - 1; y >= 2000; y--) {
    years.push(y);
  }
  
  const seasons = ['winter', 'spring', 'summer', 'fall'];
  
  const toggleYear = (year) => {
    setExpandedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };
  
  const handleSeasonClick = (season, year) => {
    onSeasonSelect(season, year);
  };
  
  const formatSeason = (season) => {
    return season.charAt(0).toUpperCase() + season.slice(1);
  };
  
  return (
    <div className="archive-view">
      <div className="archive-header">
        <h2>Archive - Select Season</h2>
        <p className="archive-subtitle">Browse anime from any season</p>
      </div>
      
      <div className="archive-years">
        {years.map(year => (
          <div key={year} className="archive-year-section">
            <button 
              className={`archive-year-header ${expandedYears.includes(year) ? 'expanded' : ''}`}
              onClick={() => toggleYear(year)}
            >
              <span className="year-label">{year}</span>
              <span className="expand-icon">{expandedYears.includes(year) ? '▼' : '▶'}</span>
            </button>
            
            {expandedYears.includes(year) && (
              <div className="archive-seasons-grid">
                {seasons.map(season => {
                  const isActive = season === currentSeason && year === currentYear;
                  return (
                    <button
                      key={season}
                      className={`archive-season-button ${isActive ? 'active' : ''}`}
                      onClick={() => handleSeasonClick(season, year)}
                    >
                      <span className="season-name">{formatSeason(season)}</span>
                      <span className="season-year">{year}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveView;
