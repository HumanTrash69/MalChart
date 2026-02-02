import React from 'react';
import './CategoryNav.css';

const CategoryNav = ({ categories }) => {
  const scrollToCategory = (category) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      const yOffset = -20; // Offset for better visibility
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-nav">
      {Object.entries(categories).map(([category, count]) => (
        count > 0 && (
          <button
            key={category}
            className="category-nav-button"
            onClick={() => scrollToCategory(category)}
          >
            {category}
            <span className="count">({count})</span>
          </button>
        )
      ))}
    </div>
  );
};

export default CategoryNav;
