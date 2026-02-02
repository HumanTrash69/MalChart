import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import SeasonalChart from './components/SeasonalChart/SeasonalChart';
import { getCurrentSeason, getCurrentYear } from './utils/helpers';
import './App.css';

function App() {
  const [currentSeason, setCurrentSeason] = useState(getCurrentSeason());
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [currentView, setCurrentView] = useState('archive');

  const handleSeasonChange = (season, year) => {
    setCurrentSeason(season);
    setCurrentYear(year);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="app">
      <Navbar 
        onSeasonChange={handleSeasonChange}
        onViewChange={handleViewChange}
      />
      <main className="main-content">
        <SeasonalChart 
          season={currentSeason}
          year={currentYear}
          view={currentView}
        />
      </main>
    </div>
  );
}

export default App;