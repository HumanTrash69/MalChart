const NodeCache = require('node-cache');

// Cache with TTL (time to live) in seconds
// Default: 24 hours
const CACHE_TTL = (process.env.CACHE_DURATION || 24) * 60 * 60;

const cache = new NodeCache({ 
  stdTTL: CACHE_TTL,
  checkperiod: 600 // Check for expired keys every 10 minutes
});

module.exports = cache;
