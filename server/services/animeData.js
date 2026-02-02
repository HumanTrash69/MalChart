const SeasonalAnime = require('../models/SeasonalAnime');
const UpcomingAnime = require('../models/UpcomingAnime');
const { fetchSeasonalAnime, fetchUpcomingAnime } = require('./jikanApi');
const { isDBConnected } = require('../db');
const cache = require('../cache');

// How old data can be before we re-fetch (24 hours)
const STALE_THRESHOLD = 24 * 60 * 60 * 1000;

/**
 * Check if data is stale (older than threshold)
 */
const isStale = (lastUpdated) => {
  if (!lastUpdated) return true;
  return Date.now() - new Date(lastUpdated).getTime() > STALE_THRESHOLD;
};

/**
 * Get seasonal anime with database caching
 * @param {number} year 
 * @param {string} season 
 * @returns {Promise<Array>}
 */
const getSeasonalAnime = async (year, season) => {
  const cacheKey = `seasonal_${year}_${season}`;
  
  // Try cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Cache hit for ${season} ${year}`);
    return cachedData;
  }

  // If database is connected, try to get from database
  if (isDBConnected()) {
    try {
      const dbData = await SeasonalAnime.findOne({ season, year });
      
      if (dbData && !isStale(dbData.lastUpdated)) {
        console.log(`Database hit for ${season} ${year} (${dbData.data.length} entries)`);
        // Store in cache for faster access
        cache.set(cacheKey, dbData.data);
        return dbData.data;
      }
      
      // Data is stale or missing, fetch from API
      console.log(`Database data stale or missing for ${season} ${year}, fetching from API...`);
      const apiData = await fetchSeasonalAnime(year, season);
      
      // Update database
      await SeasonalAnime.findOneAndUpdate(
        { season, year },
        { 
          data: apiData, 
          lastUpdated: new Date(),
          totalCount: apiData.length
        },
        { upsert: true, new: true }
      );
      
      // Store in cache
      cache.set(cacheKey, apiData);
      console.log(`Stored ${apiData.length} entries in database for ${season} ${year}`);
      return apiData;
    } catch (error) {
      console.error('Database error, falling back to API:', error.message);
    }
  }

  // No database or database error, fetch from API directly
  console.log(`Fetching ${season} ${year} directly from API (no database)`);
  const apiData = await fetchSeasonalAnime(year, season);
  cache.set(cacheKey, apiData);
  return apiData;
};

/**
 * Get upcoming anime with database caching
 * @returns {Promise<Array>}
 */
const getUpcomingAnime = async () => {
  const cacheKey = 'upcoming';
  
  // Try cache first
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit for upcoming anime');
    return cachedData;
  }

  // If database is connected, try to get from database
  if (isDBConnected()) {
    try {
      const dbData = await UpcomingAnime.findOne({ type: 'upcoming' });
      
      if (dbData && !isStale(dbData.lastUpdated)) {
        console.log(`Database hit for upcoming anime (${dbData.data.length} entries)`);
        cache.set(cacheKey, dbData.data);
        return dbData.data;
      }
      
      // Data is stale or missing, fetch from API
      console.log('Database data stale or missing for upcoming, fetching from API...');
      const apiData = await fetchUpcomingAnime();
      
      // Update database
      await UpcomingAnime.findOneAndUpdate(
        { type: 'upcoming' },
        { 
          data: apiData,
          lastUpdated: new Date(),
          totalCount: apiData.length
        },
        { upsert: true, new: true }
      );
      
      cache.set(cacheKey, apiData);
      console.log(`Stored ${apiData.length} upcoming entries in database`);
      return apiData;
    } catch (error) {
      console.error('Database error, falling back to API:', error.message);
    }
  }

  // No database or database error, fetch from API directly
  console.log('Fetching upcoming anime directly from API (no database)');
  const apiData = await fetchUpcomingAnime();
  cache.set(cacheKey, apiData);
  return apiData;
};

module.exports = {
  getSeasonalAnime,
  getUpcomingAnime
};
