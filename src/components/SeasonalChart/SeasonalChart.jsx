import React, { useState, useEffect, useCallback } from 'react';
import { getSeasonalAnime, getUpcomingAnime } from '../../services/animeService';
import SortSection from '../SortSection/SortSection';
import CategorizedAnimeList from '../CategorizedAnimeList/CategorizedAnimeList';
import SearchBar from '../SearchBar/SearchBar';
import './SeasonalChart.css';

const SeasonalChart = ({ season, year, view }) => {
  const [allAnimeList, setAllAnimeList] = useState([]);
  const [displayedAnime, setDisplayedAnime] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [unfilteredTotal, setUnfilteredTotal] = useState(0);
  const [categories, setCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    hideHentai: true,
    hideKids: true
  });

  const applyFilters = (animeList) => {
    return animeList.filter(anime => {
      // Check for hentai content
      if (filters.hideHentai) {
        const hasHentaiGenre = anime.genres?.some(genre => 
          genre.name?.toLowerCase() === 'hentai' || 
          genre.name?.toLowerCase() === 'erotica'
        );
        const hasExplicitRating = anime.rating?.toLowerCase().includes('rx');
        if (hasHentaiGenre || hasExplicitRating) {
          return false;
        }
      }
      
      // Check for kids content
      if (filters.hideKids) {
        const hasKidsGenre = anime.genres?.some(genre => 
          genre.name?.toLowerCase() === 'kids'
        );
        const hasKidsRating = anime.rating?.toLowerCase().includes('g - all ages');
        const hasKidsDemographic = anime.demographics?.some(demo =>
          demo.name?.toLowerCase() === 'kids'
        );
        if (hasKidsGenre || hasKidsRating || hasKidsDemographic) {
          return false;
        }
      }
      
      return true;
    });
  };

  const fetchAnime = useCallback(async () => {
    try {
      setIsLoading(true);
      
      let data;
      if (view === 'later') {
        // Fetch upcoming anime for Later view - only shows anime with no air date or far future dates
        const upcomingData = await getUpcomingAnime();
        const now = new Date();
        // Set threshold to 3 months from now to exclude currently airing/near future
        const futureThreshold = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000));
        
        data = upcomingData.filter(anime => {
          if (!anime.aired?.from) return true; // No date means truly upcoming
          const airDate = new Date(anime.aired.from);
          // Only include if air date is more than 3 months in the future
          return airDate > futureThreshold;
        });
      } else {
        // Fetch seasonal anime for archive view
        data = await getSeasonalAnime(year, season);
      }
      
      // Store unfiltered total
      setUnfilteredTotal(data.length);
      
      // Apply content filters
      data = applyFilters(data);
      
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
  }, [season, year, view, filters]);

  useEffect(() => {
    setDisplayedAnime([]); // Clear current list
    setSearchTerm(''); // Clear search
    fetchAnime();
  }, [fetchAnime]);

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

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
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
    if (view === 'later') return 'Later';
    return `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`;
  };

  const handleCategoriesChange = useCallback((newCategories) => {
    setCategories(newCategories);
  }, []);

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
        unfilteredTotal={unfilteredTotal}
        onSortChange={handleSort}
        onFilterChange={handleFilterChange}
        filters={filters}
        categories={categories}
      />
      <CategorizedAnimeList 
        animeList={displayedAnime}
        isLoading={isLoading}
        onCategoriesChange={handleCategoriesChange}
      />
    </div>
  );
};

export default SeasonalChart;