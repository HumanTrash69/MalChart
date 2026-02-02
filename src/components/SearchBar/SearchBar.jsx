import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, totalResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search anime by title..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={handleClear} className="clear-button" title="Clear search">
            ✕
          </button>
        )}
      </div>
      {searchTerm && totalResults !== undefined && (
        <div className="search-results-count">
          {totalResults} result{totalResults !== 1 ? 's' : ''} found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
