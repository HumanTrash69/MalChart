import React, { useState, useEffect } from 'react';
import './SeasonSelector.css';

const SeasonSelector = ({ onSeasonSelect, currentSeason, currentYear }) => {
  const [showGrid, setShowGrid] = useState(false);
  
  // Generate available seasons (previous season of last year + all current year seasons)
  const generateSeasons = () => {
    const seasons = ['winter', 'spring', 'summer', 'fall'];
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    
    // Determine current season
    let currentSeasonIdx;
    if (month >= 3 && month <= 5) currentSeasonIdx = 1; // spring
    else if (month >= 6 && month <= 8) currentSeasonIdx = 2; // summer
    else if (month >= 9 && month <= 11) currentSeasonIdx = 3; // fall
    else currentSeasonIdx = 0; // winter
    
    const seasonList = [];
    
    // Add previous season from previous year
    if (currentSeasonIdx === 0) {
      // If current is winter, add fall of previous year
      seasonList.push({ season: 'fall', year: year - 1 });
    } else {
      seasonList.push({ season: seasons[currentSeasonIdx - 1], year });
    }
    
    // Add remaining seasons of current year
    for (let i = currentSeasonIdx; i < 4; i++) {
      seasonList.push({ season: seasons[i], year });
    }
    
    // Add first season of next year if we're past summer
    if (currentSeasonIdx >= 2) {
      seasonList.push({ season: 'winter', year: year + 1 });
    }
    
    return seasonList;
  };
  
  const availableSeasons = generateSeasons();
  
  const handleSeasonClick = (season, year) => {
    onSeasonSelect(season, year);
    setShowGrid(false);
  };
  
  const formatSeasonDisplay = (season) => {
    return season.charAt(0).toUpperCase() + season.slice(1);
  };
  
  return (
    <div className="season-selector">
      <button 
        className="season-selector-toggle"
        onClick={() => setShowGrid(!showGrid)}
      >
        {formatSeasonDisplay(currentSeason)} {currentYear}
        <span className="dropdown-arrow">{showGrid ? '▲' : '▼'}</span>
      </button>
      
      {showGrid && (
        <div className="season-grid">
          {availableSeasons.map(({ season, year }) => (
            <button
              key={`${season}-${year}`}
              className={`season-grid-item ${
                season === currentSeason && year === currentYear ? 'active' : ''
              }`}
              onClick={() => handleSeasonClick(season, year)}
            >
              <span className="season-grid-season">{formatSeasonDisplay(season)}</span>
              <span className="season-grid-year">{year}</span>
            </button>
          ))}
          
          <button
            className="season-grid-item special"
            onClick={() => {
              onSeasonSelect(currentSeason, currentYear, 'tba');
              setShowGrid(false);
            }}
          >
            Later
          </button>
          
          <button
            className="season-grid-item special"
            onClick={() => {
              // Archive shows all anime from selected season without filtering
              onSeasonSelect(currentSeason, currentYear, 'archive');
              setShowGrid(false);
            }}
          >
            Archive
          </button>
        </div>
      )}
    </div>
  );
};

export default SeasonSelector;
