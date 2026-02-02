import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import SeasonalChart from './components/SeasonalChart/SeasonalChart';
import ArchiveView from './components/ArchiveView/ArchiveView';
import { getCurrentSeason, getCurrentYear } from './utils/helpers';
import './App.css';

function App() {
  const [currentSeason, setCurrentSeason] = useState(getCurrentSeason());
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [currentView, setCurrentView] = useState('season'); // 'season', 'archive', 'tba'
  const [showArchiveSelector, setShowArchiveSelector] = useState(false);

  const handleSeasonChange = (season, year) => {
    setCurrentSeason(season);
    setCurrentYear(year);
    setCurrentView('season');
    setShowArchiveSelector(false);
  };

  const handleViewChange = (view) => {
    if (view === 'archive') {
      setShowArchiveSelector(true);
    } else {
      setShowArchiveSelector(false);
      setCurrentView(view);
    }
  };

  return (
    <div className="app">
      <Navbar 
        onSeasonChange={handleSeasonChange}
        onViewChange={handleViewChange}
      />
      <main className="main-content">
        {showArchiveSelector ? (
          <ArchiveView 
            onSeasonSelect={handleSeasonChange}
            currentSeason={currentSeason}
            currentYear={currentYear}
          />
        ) : (
          <SeasonalChart 
            season={currentSeason}
            year={currentYear}
            view={currentView}
          />
        )}
      </main>
    </div>
  );
}

export default App;