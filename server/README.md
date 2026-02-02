# MalChart Server

Backend server for MalChart that caches and serves MyAnimeList data via Jikan API.

## Features

- **Caching**: In-memory caching to reduce API calls and improve performance
- **Scheduled Updates**: Automatic data refresh every 6 hours
- **Rate Limiting**: Respects Jikan API rate limits
- **RESTful API**: Clean API endpoints for seasonal and upcoming anime

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` to set your configuration.

3. Start the server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoints

### Get Current Season Anime
```
GET /api/anime/current
```
Returns anime for the current season.

### Get Seasonal Anime
```
GET /api/anime/seasonal/:year/:season
```
Returns anime for a specific season and year.

Parameters:
- `year`: Year (e.g., 2024)
- `season`: Season (winter, spring, summer, fall)

### Get Upcoming Anime
```
GET /api/anime/upcoming
```
Returns upcoming anime (TBA).

### Cache Status
```
GET /api/anime/cache-status
```
Returns information about cached data.

### Health Check
```
GET /health
```
Returns server health status.

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)
- `CACHE_DURATION`: Cache duration in hours (default: 24)

## Data Refresh

The server automatically refreshes data:
- On startup (after 5 seconds delay)
- Every 6 hours via cron job
- Includes current season, next season, and upcoming anime
