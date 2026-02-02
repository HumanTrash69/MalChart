import React, { useEffect } from 'react';
import AnimeCard from '../AnimeCard/AnimeCard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './CategorizedAnimeList.css';

const CategorizedAnimeList = ({ animeList, isLoading, onCategoriesChange }) => {
  // Group anime by type and status
  const groupedAnime = {
    'TV (NEW)': animeList?.filter(anime => anime.type === 'TV' && !anime.continuing) || [],
    'TV (Continuing)': animeList?.filter(anime => anime.type === 'TV' && anime.continuing) || [],
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