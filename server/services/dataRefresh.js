const cache = require('../cache');
const { getSeasonalAnime, getUpcomingAnime } = require('./animeData');

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
    await getSeasonalAnime(prevSeasonInfo.year, prevSeasonInfo.season);
    
    // Fetch current season
    console.log('Refreshing current season data...');
    await getSeasonalAnime(year, season);
    
    // Fetch next season
    const nextSeasonInfo = getNextSeason(season, year);
    console.log('Refreshing next season data...');
    await getSeasonalAnime(nextSeasonInfo.year, nextSeasonInfo.season);
    
    // Fetch upcoming anime
    console.log('Refreshing upcoming anime data...');
    await getUpcomingAnime();
    
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
