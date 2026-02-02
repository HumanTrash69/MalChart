const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const { connectDB, isDBConnected } = require('./db');
const animeRoutes = require('./routes/anime');
const { refreshSeasonalData } = require('./services/dataRefresh');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for GitHub Pages
const allowedOrigins = [
  'http://localhost:3000',
  'https://malcharts.github.io',
  'https://humantrash69.github.io',
  // Add your custom domain here if applicable
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

// Routes
app.use('/api/anime', animeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    dbConnected: isDBConnected(),
    timestamp: new Date().toISOString() 
  });
});

// Initialize database connection
connectDB().then((connected) => {
  if (connected) {
    console.log('✅ Database connected - persistent storage enabled');
  } else {
    console.log('⚠️  Running without database - using cache only');
  }
  
  // Schedule data refresh every 6 hours
  cron.schedule('0 */6 * * *', () => {
    console.log('Running scheduled data refresh...');
    refreshSeasonalData();
  });

  // Initial data refresh on startup (in background)
  setTimeout(() => {
    console.log('Starting initial data refresh...');
    refreshSeasonalData();
  }, 5000);
});

app.listen(PORT, () => {
  console.log(`MalChart server running on port ${PORT}`);
});
