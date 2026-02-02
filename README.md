# MalChart

An AniChart-like clone which takes data from MyAnimeList instead. View seasonal anime with a beautiful, responsive interface powered by real-time MAL data.

## Features

- 📊 **Seasonal Anime Charts** - Browse anime by season and year
- 🔄 **Backend Caching** - Fast data loading with server-side caching
- 📅 **Multiple Views**:
  - **Airing** - Currently airing shows
  - **Archive** - Full seasonal archive
  - **TBA** - Upcoming anime to be announced
- 🎯 **Smart Sorting** - Sort by members, score, start date, title, or studio
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Categorized Display** - Organized by TV, ONA, OVA, Movie, and Special

## Tech Stack

### Frontend
- React 18
- CSS3 with custom theming
- Responsive design

### Backend
- Node.js + Express
- In-memory caching with node-cache
- Scheduled data refresh (every 6 hours)
- Rate-limited API requests

## Getting Started

### Prerequisites
- Node.js 14+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Configure environment variables:

**Frontend** (root directory):
```bash
cp .env.example .env
```

**Backend** (server directory):
```bash
cp .env.example .env
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

2. In a new terminal, start the frontend:
```bash
cd ..
npm start
```

The frontend will run on `http://localhost:3000`

### Using Without Backend

The app can also run without the backend server - it will automatically fall back to direct Jikan API calls (though this will be slower). To disable backend:

Edit `.env`:
```
REACT_APP_USE_BACKEND=false
```

## Architecture

### Frontend Structure
```
src/
├── components/
│   ├── AnimeCard/         # Individual anime card display
│   ├── CategorizedAnimeList/  # Categorized anime grid
│   ├── Navbar/            # Navigation with season/year selection
│   ├── SeasonalChart/     # Main chart component
│   └── SortSection/       # Sort controls
├── services/
│   ├── animeService.js    # API layer with backend fallback
│   └── api.js             # Original API utilities
└── utils/
    └── helpers.js         # Utility functions
```

### Backend Structure
```
server/
├── routes/
│   └── anime.js           # API endpoints
├── services/
│   ├── jikanApi.js        # Jikan API wrapper
│   └── dataRefresh.js     # Scheduled data refresh
├── cache.js               # Cache configuration
└── server.js              # Express server
```

## API Endpoints

### Backend API

- `GET /api/anime/current` - Get current season anime
- `GET /api/anime/seasonal/:year/:season` - Get specific season
- `GET /api/anime/upcoming` - Get upcoming anime (TBA)
- `GET /api/anime/cache-status` - View cache statistics
- `GET /health` - Health check

## Configuration

### Frontend Environment Variables
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)
- `REACT_APP_USE_BACKEND` - Enable/disable backend (default: true)

### Backend Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `CACHE_DURATION` - Cache duration in hours (default: 24)

## Data Source

All anime data is sourced from [Jikan API](https://jikan.moe/), an unofficial MyAnimeList API.

## Performance Features

- **Server-side Caching**: Backend caches data for 24 hours (configurable)
- **Scheduled Refresh**: Automatic data updates every 6 hours
- **Rate Limiting**: Respects Jikan API rate limits
- **Progressive Loading**: Shows first 20 results immediately, then loads rest
- **Fallback Support**: Works without backend using direct API calls

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [MyAnimeList](https://myanimelist.net/) for anime data
- [Jikan API](https://jikan.moe/) for providing the unofficial MAL API
- [AniChart](https://anichart.net/) for design inspiration
