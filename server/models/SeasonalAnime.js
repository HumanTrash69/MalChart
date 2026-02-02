const mongoose = require('mongoose');

const seasonalAnimeSchema = new mongoose.Schema({
  season: {
    type: String,
    required: true,
    enum: ['winter', 'spring', 'summer', 'fall']
  },
  year: {
    type: Number,
    required: true
  },
  data: {
    type: Array,
    required: true,
    default: []
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  totalCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create compound index for efficient queries
seasonalAnimeSchema.index({ season: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('SeasonalAnime', seasonalAnimeSchema);
