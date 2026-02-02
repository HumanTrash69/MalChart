const express = require('express');
const router = express.Router();
const cache = require('../cache');
const { getSeasonalAnime, getUpcomingAnime } = require('../services/animeData');
const { getCurrentSeasonInfo } = require('../services/dataRefresh');
const { isDBConnected } = require('../db');

/**
 * GET /api/anime/seasonal/:year/:season
 * Get seasonal anime data
 */
router.get('/seasonal/:year/:season', async (req, res) => {
  try {
    const { year, season } = req.params;
    
    // Use the new service layer (handles cache, DB, and API)
    const data = await getSeasonalAnime(parseInt(year), season);
    
    res.json({
      data,
      year: parseInt(year),
      season,
      dbConnected: isDBConnected(),
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
    
    // Use the new service layer
    const data = await getSeasonalAnime(year, season);
    
    res.json({
      data,
      season,
      year,
      dbConnected: isDBConnected(),
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
    // Use the new service layer
    const data = await getUpcomingAnime();
    
    res.json({
      data,
      dbConnected: isDBConnected(),
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
