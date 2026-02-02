const express = require('express');
const router = express.Router();
const cache = require('../cache');
const { fetchSeasonalAnime, fetchUpcomingAnime } = require('../services/jikanApi');
const { getCurrentSeasonInfo } = require('../services/dataRefresh');

/**
 * GET /api/anime/seasonal/:year/:season
 * Get seasonal anime data
 */
router.get('/seasonal/:year/:season', async (req, res) => {
  try {
    const { year, season } = req.params;
    const cacheKey = `seasonal_${year}_${season}`;
    
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log(`Serving cached data for ${season} ${year}`);
      return res.json({
        data: cachedData,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }
    
    // Fetch fresh data if not in cache
    console.log(`Fetching fresh data for ${season} ${year}`);
    const data = await fetchSeasonalAnime(parseInt(year), season);
    
    // Cache the data
    cache.set(cacheKey, data);
    
    res.json({
      data,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in seasonal route:', error);
    res.status(500).json({ 
      error: 'Failed to fetch seasonal anime',
      message: error.message 
    });
  }
});

/**
 * GET /api/anime/current
 * Get current season anime
 */
router.get('/current', async (req, res) => {
  try {
    const { season, year } = getCurrentSeasonInfo();
    const cacheKey = `seasonal_${year}_${season}`;
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json({
        data: cachedData,
        season,
        year,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }
    
    const data = await fetchSeasonalAnime(year, season);
    cache.set(cacheKey, data);
    
    res.json({
      data,
      season,
      year,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in current route:', error);
    res.status(500).json({ 
      error: 'Failed to fetch current season anime',
      message: error.message 
    });
  }
});

/**
 * GET /api/anime/upcoming
 * Get upcoming anime (TBA)
 */
router.get('/upcoming', async (req, res) => {
  try {
    const cacheKey = 'upcoming_anime';
    
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json({
        data: cachedData,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }
    
    const data = await fetchUpcomingAnime();
    cache.set(cacheKey, data);
    
    res.json({
      data,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in upcoming route:', error);
    res.status(500).json({ 
      error: 'Failed to fetch upcoming anime',
      message: error.message 
    });
  }
});

/**
 * GET /api/anime/cache-status
 * Get cache status
 */
router.get('/cache-status', (req, res) => {
  const keys = cache.keys();
  const stats = cache.getStats();
  
  res.json({
    cachedKeys: keys,
    stats,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
