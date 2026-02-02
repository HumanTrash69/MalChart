// Use backend API or fallback to direct Jikan API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const USE_BACKEND = process.env.REACT_APP_USE_BACKEND !== 'false';

/**
 * Fetch seasonal anime data
 * Uses backend API if available, falls back to direct Jikan API
 */
export const getSeasonalAnime = async (year, season) => {
  try {
    if (USE_BACKEND) {
      // Try backend API first
      try {
        const response = await fetch(`${API_BASE_URL}/anime/seasonal/${year}/${season}`);
        if (response.ok) {
          const result = await response.json();
          return result.data || [];
        }
      } catch (backendError) {
        console.warn('Backend API unavailable, falling back to direct API:', backendError.message);
      }
    }
    
    // Fallback to direct Jikan API
    return await fetchDirectFromJikan(year, season);
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

/**
 * Fetch current season anime
 */
export const getCurrentSeasonAnime = async () => {
  try {
    if (USE_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/anime/current`);
        if (response.ok) {
          const result = await response.json();
          return result.data || [];
        }
      } catch (backendError) {
        console.warn('Backend API unavailable:', backendError.message);
      }
    }
    
    // Fallback: calculate current season and fetch
    const { season, year } = getCurrentSeasonInfo();
    return await fetchDirectFromJikan(year, season);
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

/**
 * Fetch upcoming anime (TBA)
 */
export const getUpcomingAnime = async () => {
  try {
    if (USE_BACKEND) {
      try {
        const response = await fetch(`${API_BASE_URL}/anime/upcoming`);
        if (response.ok) {
          const result = await response.json();
          return result.data || [];
        }
      } catch (backendError) {
        console.warn('Backend API unavailable:', backendError.message);
      }
    }
    
    // Fallback to direct API
    return await fetchUpcomingDirect();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

/**
 * Direct fetch from Jikan API (fallback)
 */
const fetchDirectFromJikan = async (year, season) => {
  let allAnime = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}`);
    const data = await response.json();
    
    if (data.data?.length > 0) {
      allAnime = [...allAnime, ...data.data];
      hasNextPage = data.pagination?.has_next_page;
      page++;
      
      // Add delay to respect rate limits
      if (hasNextPage) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } else {
      hasNextPage = false;
    }
  }

  const uniqueAnime = Array.from(
    new Set(allAnime.map(a => a.mal_id))
  ).map(id => allAnime.find(a => a.mal_id === id));

  return uniqueAnime;
};

/**
 * Fetch upcoming anime directly
 */
const fetchUpcomingDirect = async () => {
  const response = await fetch('https://api.jikan.moe/v4/seasons/upcoming?page=1');
  const data = await response.json();
  return data.data || [];
};

/**
 * Get current season info
 */
const getCurrentSeasonInfo = () => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  
  let season;
  if (month >= 3 && month <= 5) season = 'spring';
  else if (month >= 6 && month <= 8) season = 'summer';
  else if (month >= 9 && month <= 11) season = 'fall';
  else season = 'winter';
  
  return { season, year };
};