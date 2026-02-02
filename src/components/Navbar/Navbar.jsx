import React, { useState } from 'react';
import './Navbar.css';
import SeasonSelector from '../SeasonSelector/SeasonSelector';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { getCurrentSeason, getCurrentYear } from '../../utils/helpers';

const Navbar = ({ onSeasonChange, onViewChange }) => {
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [selectedSeason, setSelectedSeason] = useState(getCurrentSeason());
  const [activeView, setActiveView] = useState('airing');

  const handleSeasonSelect = (season, year, specialView) => {
    setSelectedSeason(season);
    setSelectedYear(year);
    
    if (specialView) {
      // Handle special views like 'tba' or 'archive'
      setActiveView(specialView);
      if (onViewChange) {
        onViewChange(specialView);
      }
    } else {
      // Regular season change
      if (onSeasonChange) {
        onSeasonChange(season, year);
      }
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
        
        <SeasonSelector 
          onSeasonSelect={handleSeasonSelect}
          currentSeason={selectedSeason}
          currentYear={selectedYear}
        />

        <div className="nav-actions">
          <button 
            className={`nav-button ${activeView === 'airing' ? 'active' : ''}`}
            onClick={() => handleViewChange('airing')}
          >
            Airing
          </button>
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