const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const animeRoutes = require('./routes/anime');
const { refreshSeasonalData } = require('./services/dataRefresh');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/anime', animeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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

app.listen(PORT, () => {
  console.log(`MalChart server running on port ${PORT}`);
});
