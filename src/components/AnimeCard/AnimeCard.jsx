import React from 'react';
import './AnimeCard.css';

const AnimeCard = ({ anime }) => {
  const handleTitleClick = () => {
    window.open(anime.url, '_blank');
  };
  
  const handleLinkClick = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    
    // Check if it's just a year (Jan 1st of a year indicates unknown date within that year)
    if (month === 0 && day === 1) {
      return `${year}`;
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="anime-card">
      <div className="anime-content">
        <div className="anime-image">
          <img src={anime.images.jpg.large_image_url} alt={anime.title} />
          <div className="anime-overlay">
            <div className="anime-score">{anime.score || 'N/A'}</div>
            <div className="anime-members">{(anime.members || 0).toLocaleString()} members</div>
          </div>
        </div>
        <div className="anime-details">
          <div className="title-section">
            <h3 onClick={handleTitleClick} className="anime-title">{anime.title_english || anime.title}</h3>
            {anime.title_english && anime.title_english !== anime.title && (
              <h4 className="anime-title-japanese">{anime.title}</h4>
            )}
          </div>
          
          <div className="content-separator"></div>
          
          <div className="scrollable-content">
            <div className="anime-stats">
              {formatDate(anime.aired?.from)} • {anime.episodes || '?'} eps
            </div>

            <div className="anime-genres">
              <span className="genre-label">Genre:</span>
              {anime.genres?.map((genre) => (
                <span 
                  key={genre.mal_id} 
                  className="genre-tag clickable"
                  onClick={() => handleLinkClick(genre.url)}
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="anime-metadata">
              {anime.studios?.length > 0 && (
                <div className="metadata-item">
                  <span className="metadata-label">Studio:</span>
                  <span className="metadata-values">
                    {anime.studios.map((studio, idx) => (
                      <React.Fragment key={studio.mal_id}>
                        {idx > 0 && ', '}
                        <span 
                          className="clickable-link"
                          onClick={() => handleLinkClick(studio.url)}
                        >
                          {studio.name}
                        </span>
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              )}
              
              {anime.source && (
                <div className="metadata-item">
                  <span className="metadata-label">Source:</span>
                  {anime.source}
                </div>
              )}
            </div>
            
            <div className="content-separator"></div>

            <div className="anime-metadata">
              {anime.themes?.length > 0 && (
                <div className="metadata-item">
                  <span className="metadata-label">Theme:</span>
                  <span className="metadata-values">
                    {anime.themes.map((theme, idx) => (
                      <React.Fragment key={theme.mal_id}>
                        {idx > 0 && ', '}
                        <span 
                          className="clickable-link"
                          onClick={() => handleLinkClick(theme.url)}
                        >
                          {theme.name}
                        </span>
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              )}

              {anime.demographics?.length > 0 && (
                <div className="metadata-item">
                  <span className="metadata-label">Demographic:</span>
                  <span className="metadata-values">
                    {anime.demographics.map((demo, idx) => (
                      <React.Fragment key={demo.mal_id}>
                        {idx > 0 && ', '}
                        <span 
                          className="clickable-link"
                          onClick={() => handleLinkClick(demo.url)}
                        >
                          {demo.name}
                        </span>
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              )}
            </div>
            
            <div className="content-separator"></div>

            <div className="synopsis">
              <span className="synopsis-label">Synopsis:</span>
              {anime.synopsis}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;