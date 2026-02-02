const cache = require('../cache');
const { fetchSeasonalAnime, fetchUpcomingAnime } = require('./jikanApi');

/**
 * Get current season and year
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

/**
 * Refresh seasonal data for current and upcoming seasons
 */
const refreshSeasonalData = async () => {
  try {
    const { season, year } = getCurrentSeasonInfo();
    
    // Fetch previous season (for users who want to see last season)
    const prevSeasonInfo = getPreviousSeason(season, year);
    console.log('Refreshing previous season data...');
    const prevData = await fetchSeasonalAnime(prevSeasonInfo.year, prevSeasonInfo.season);
    const prevCacheKey = `seasonal_${prevSeasonInfo.year}_${prevSeasonInfo.season}`;
    cache.set(prevCacheKey, prevData);
    
    // Fetch current season
    console.log('Refreshing current season data...');
    const currentData = await fetchSeasonalAnime(year, season);
    const cacheKey = `seasonal_${year}_${season}`;
    cache.set(cacheKey, currentData);
    
    // Fetch next season
    const nextSeasonInfo = getNextSeason(season, year);
    console.log('Refreshing next season data...');
    const nextData = await fetchSeasonalAnime(nextSeasonInfo.year, nextSeasonInfo.season);
    const nextCacheKey = `seasonal_${nextSeasonInfo.year}_${nextSeasonInfo.season}`;
    cache.set(nextCacheKey, nextData);
    
    // Fetch upcoming anime
    console.log('Refreshing upcoming anime data...');
    const upcomingData = await fetchUpcomingAnime();
    cache.set('upcoming_anime', upcomingData);
    
    console.log('Data refresh completed successfully');
  } catch (error) {
    console.error('Error refreshing seasonal data:', error);
  }
};

/**
 * Get next season info
 */
const getNextSeason = (currentSeason, currentYear) => {
  const seasons = ['winter', 'spring', 'summer', 'fall'];
  const currentIndex = seasons.indexOf(currentSeason);
  const nextIndex = (currentIndex + 1) % 4;
  const nextSeason = seasons[nextIndex];
  const nextYear = nextIndex === 0 ? currentYear + 1 : currentYear;
  
  return { season: nextSeason, year: nextYear };
};

/**
 * Get previous season info
 */
const getPreviousSeason = (currentSeason, currentYear) => {
  const seasons = ['winter', 'spring', 'summer', 'fall'];
  const currentIndex = seasons.indexOf(currentSeason);
  const prevIndex = currentIndex === 0 ? 3 : currentIndex - 1;
  const prevSeason = seasons[prevIndex];
  const prevYear = currentIndex === 0 ? currentYear - 1 : currentYear;
  
  return { season: prevSeason, year: prevYear };
};

module.exports = {
  refreshSeasonalData,
  getCurrentSeasonInfo,
  getNextSeason,
  getPreviousSeason
};
