const mongoose = require('mongoose');

const upcomingAnimeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: 'upcoming'
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

module.exports = mongoose.model('UpcomingAnime', upcomingAnimeSchema);
