import React, { useState, useEffect } from 'react';
import { getSeasonalAnime, getUpcomingAnime } from '../../services/animeService';
import SortSection from '../SortSection/SortSection';
import CategorizedAnimeList from '../CategorizedAnimeList/CategorizedAnimeList';
import SearchBar from '../SearchBar/SearchBar';
import './SeasonalChart.css';

const SeasonalChart = ({ season, year, view }) => {
  const [allAnimeList, setAllAnimeList] = useState([]);
  const [displayedAnime, setDisplayedAnime] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      setFilteredAnime(sortedData);
      
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

  useEffect(() => {
    setDisplayedAnime([]); // Clear current list
    setSearchTerm(''); // Clear search
    fetchAnime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season, year, view]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredAnime(allAnimeList);
      setDisplayedAnime(allAnimeList);
      return;
    }

    const filtered = allAnimeList.filter(anime => {
      const titleMatch = anime.title?.toLowerCase().includes(term.toLowerCase());
      const englishTitleMatch = anime.title_english?.toLowerCase().includes(term.toLowerCase());
      const japaneseMatch = anime.title_japanese?.toLowerCase().includes(term.toLowerCase());
      return titleMatch || englishTitleMatch || japaneseMatch;
    });

    setFilteredAnime(filtered);
    setDisplayedAnime(filtered);
  };

  const handleSort = (sortType) => {
    const dataToSort = searchTerm ? filteredAnime : allAnimeList;
    const sortedAnime = [...dataToSort].sort((a, b) => {
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
    
    if (searchTerm) {
      setFilteredAnime(sortedAnime);
    } else {
      setAllAnimeList(sortedAnime);
    }
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
      <SearchBar 
        onSearch={handleSearch}
        totalResults={searchTerm ? filteredAnime.length : undefined}
      />
      <SortSection 
        totalAnime={searchTerm ? filteredAnime.length : allAnimeList.length} 
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