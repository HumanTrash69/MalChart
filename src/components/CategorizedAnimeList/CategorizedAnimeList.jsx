import React, { useEffect } from 'react';
import AnimeCard from '../AnimeCard/AnimeCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './CategorizedAnimeList.css';

const CategorizedAnimeList = ({ animeList, isLoading, onCategoriesChange, season, year }) => {
  // Helper function to check if anime started this season
  const isNewThisSeason = (anime) => {
    if (!anime.aired?.from || anime.type !== 'TV') return false;
    
    const airDate = new Date(anime.aired.from);
    const airYear = airDate.getFullYear();
    const airMonth = airDate.getMonth() + 1; // 1-12
    
    // If not from this year, it's continuing
    if (airYear !== year) return airYear === year;
    
    // Determine which season the air date falls into
    let airSeason;
    if (airMonth >= 1 && airMonth <= 3) airSeason = 'winter';
    else if (airMonth >= 4 && airMonth <= 6) airSeason = 'spring';
    else if (airMonth >= 7 && airMonth <= 9) airSeason = 'summer';
    else airSeason = 'fall';
    
    // If it started this season/year, it's new
    return airSeason === season && airYear === year;
  };
  
  // Group anime by type and status
  const groupedAnime = {
    'TV (NEW)': animeList?.filter(anime => anime.type === 'TV' && isNewThisSeason(anime)) || [],
    'TV (Continuing)': animeList?.filter(anime => anime.type === 'TV' && !isNewThisSeason(anime)) || [],
    'ONA': animeList?.filter(anime => anime.type === 'ONA') || [],
    'OVA': animeList?.filter(anime => anime.type === 'OVA') || [],
    'Movie': animeList?.filter(anime => anime.type === 'Movie') || [],
    'Special': animeList?.filter(anime => anime.type === 'Special') || []
  };

  // Create categories object with counts
  const categories = {};
  Object.entries(groupedAnime).forEach(([category, animeInCategory]) => {
    categories[category] = animeInCategory.length;
  });

  // Notify parent component of category changes
  useEffect(() => {
    if (onCategoriesChange && animeList) {
      onCategoriesChange(categories);
    }
  }, [animeList, onCategoriesChange]);

  if (isLoading) {
    return <LoadingSpinner message="Fetching anime data..." />;
  }

  if (!animeList || animeList.length === 0) {
    return (
      <div className="no-results">
        <p>No anime found.</p>
      </div>
    );
  }

  return (
    <div className="categorized-list">
      {Object.entries(groupedAnime).map(([category, animeInCategory]) => (
        animeInCategory.length > 0 && (
          <div key={category} id={`category-${category}`} className="category-section">
            <h2 className="category-title">{category}</h2>
            <div className="anime-grid">
              {animeInCategory.map(anime => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default CategorizedAnimeList;