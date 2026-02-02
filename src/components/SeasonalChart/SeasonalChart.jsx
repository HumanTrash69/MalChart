import React, { useState, useEffect } from 'react';
import { getSeasonalAnime, getUpcomingAnime } from '../../services/animeService';
import SortSection from '../SortSection/SortSection';
import CategorizedAnimeList from '../CategorizedAnimeList/CategorizedAnimeList';
import './SeasonalChart.css';

const SeasonalChart = ({ season, year, view }) => {
  const [allAnimeList, setAllAnimeList] = useState([]);
  const [displayedAnime, setDisplayedAnime] = useState([]);
  const [sortBy, setSortBy] = useState('members');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setDisplayedAnime([]); // Clear current list
    fetchAnime();
  }, [season, year, view]);

  const fetchAnime = async () => {
    try {
      setIsLoading(true);
      
      let data;
      if (view === 'tba') {
        // Fetch upcoming anime for TBA view
        data = await getUpcomingAnime();
      } else {
        // Fetch seasonal anime for airing/archive views
        data = await getSeasonalAnime(year, season);
        
        // Filter based on view
        if (view === 'airing') {
          data = data.filter(anime => anime.airing === true);
        }
      }
      
      // Sort initially by members
      const sortedData = [...data].sort((a, b) => (b.members || 0) - (a.members || 0));
      setAllAnimeList(sortedData);
      
      // Load first batch immediately
      setDisplayedAnime(sortedData.slice(0, 20));
      
      // Load remaining anime with slight delay
      setTimeout(() => {
        setDisplayedAnime(sortedData);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching anime:', error);
      setIsLoading(false);
    }
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    const sortedAnime = [...allAnimeList].sort((a, b) => {
      switch (sortType) {
        case 'members':
          return (b.members || 0) - (a.members || 0);
        case 'score':
          return ((b.score || 0) - (a.score || 0)) || ((b.members || 0) - (a.members || 0));
        case 'startDate':
          const dateA = new Date(a.aired?.from || '9999');
          const dateB = new Date(b.aired?.from || '9999');
          return dateA - dateB;
        case 'title':
          return (a.title_english || a.title).localeCompare(b.title_english || b.title);
        case 'studio':
          const studioA = a.studios?.[0]?.name || 'zzz';
          const studioB = b.studios?.[0]?.name || 'zzz';
          return studioA.localeCompare(studioB);
        default:
          return 0;
      }
    });
    
    setAllAnimeList(sortedAnime);
    setDisplayedAnime(sortedAnime); // Update displayed anime immediately after sorting
  };

  const getViewTitle = () => {
    if (view === 'tba') return 'To Be Announced';
    if (view === 'airing') return 'Currently Airing';
    return `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`;
  };

  return (
    <div className="seasonal-chart">
      <div className="chart-header">
        <h1 className="chart-title">{getViewTitle()}</h1>
      </div>
      <SortSection 
        totalAnime={allAnimeList.length} 
        onSortChange={handleSort}
      />
      <CategorizedAnimeList 
        animeList={displayedAnime}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SeasonalChart;