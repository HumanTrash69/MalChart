import React, { useState } from 'react';
import './Navbar.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { getCurrentSeason, getCurrentYear } from '../../utils/helpers';

const Navbar = ({ onSeasonChange, onViewChange }) => {
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason());
  const [activeView, setActiveView] = useState('archive');

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
    if (onSeasonChange) {
      onSeasonChange(season, selectedYear);
    }
  };

  const handleYearChange = (direction) => {
    const newYear = direction === 'prev' ? selectedYear - 1 : selectedYear + 1;
    setSelectedYear(newYear);
    if (onSeasonChange) {
      onSeasonChange(selectedSeason, newYear);
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    if (onViewChange) {
      onViewChange(view);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">MALCharts</div>
        
        <div className="year-control">
          <button onClick={() => handleYearChange('prev')} className="year-button">
            ◄
          </button>
          <span className="year-display">{selectedYear}</span>
          <button onClick={() => handleYearChange('next')} className="year-button">
            ►
          </button>
        </div>

        <div className="seasons">
          {['winter', 'spring', 'summer', 'fall'].map(season => (
            <button
              key={season}
              className={`season ${selectedSeason === season ? 'active' : ''}`}
              onClick={() => handleSeasonClick(season)}
            >
              <div className="season-name">{season.charAt(0).toUpperCase() + season.slice(1)}</div>
              <div className="season-year">{selectedYear}</div>
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            className={`nav-button ${activeView === 'archive' ? 'active' : ''}`}
            onClick={() => handleViewChange('archive')}
          >
            Archive
          </button>
          <button 
            className={`nav-button ${activeView === 'tba' ? 'active' : ''}`}
            onClick={() => handleViewChange('tba')}
          >
            TBA
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;