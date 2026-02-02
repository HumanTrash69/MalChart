# Quick Start Guide

Get MalChart up and running in minutes!

## Prerequisites

- **Node.js** 14 or higher
- **npm** 6 or higher
- (Optional) **Docker** for containerized deployment

## Installation

### Option 1: Standard Setup (Recommended for Development)

1. **Clone the repository:**
```bash
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd server
npm install
cd ..
```

4. **Configure environment variables:**

Create `.env` in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_USE_BACKEND=true
```

Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
CACHE_DURATION=24
```

5. **Start the backend server:**
```bash
cd server
npm start
```

The backend will start on http://localhost:5000

6. **In a new terminal, start the frontend:**
```bash
npm start
```

The frontend will start on http://localhost:3000 and automatically open in your browser.

### Option 2: Docker Setup (Recommended for Production)

1. **Clone the repository:**
```bash
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart
```

2. **Start with Docker Compose:**
```bash
docker-compose up -d
```

That's it! Access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

To stop:
```bash
docker-compose down
```

### Option 3: Frontend Only (Without Backend)

If you want to run without the backend server:

1. **Clone and install:**
```bash
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart
npm install
```

2. **Disable backend in `.env`:**
```env
REACT_APP_USE_BACKEND=false
```

3. **Start the app:**
```bash
npm start
```

Note: Without the backend, the app will make direct API calls to Jikan, which may be slower.

## Using the Application

### Navigation

- **Season Tabs**: Click Winter, Spring, Summer, or Fall to view that season
- **Year Buttons**: Use ◄ and ► to navigate between years
- **View Modes**:
  - **Airing**: Shows currently airing anime
  - **Archive**: Shows all anime from selected season
  - **TBA**: Shows upcoming/to-be-announced anime

### Features

- **Search**: Type in the search bar to filter anime by title
- **Sort**: Use the sort dropdown to order by Members, Score, Start Date, Title, or Studio
- **Click Titles**: Click any anime title to open its MyAnimeList page

### Tips

- The backend caches data for 24 hours for faster loading
- Data automatically refreshes every 6 hours
- Search works across English, Japanese, and romanized titles
- Anime are organized by type (TV, ONA, OVA, Movie, Special)

## Troubleshooting

### Backend won't start
- Check if port 5000 is available: `lsof -i :5000`
- Verify Node.js version: `node --version` (should be 14+)
- Check backend logs for errors

### Frontend shows no data
- Ensure backend is running on port 5000
- Check browser console for errors
- Wait a few seconds - data fetches on startup
- Try refreshing the page

### "Failed to fetch" errors
- Check if backend is running
- Verify `REACT_APP_API_URL` in `.env`
- Check CORS settings if using different domains
- Check Jikan API status at https://jikan.moe/

### Docker issues
- Ensure Docker is running: `docker --version`
- Check container status: `docker-compose ps`
- View logs: `docker-compose logs -f`
- Rebuild if needed: `docker-compose up --build`

## Next Steps

- Read the [full README](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Review the [Backend API documentation](server/README.md)

## Need Help?

- Check [GitHub Issues](https://github.com/HumanTrash69/MalChart/issues)
- Read the [Deployment Guide](DEPLOYMENT.md)
- Visit [Jikan API documentation](https://docs.api.jikan.moe/)

## What's Next?

Once you're up and running:

1. **Explore the UI**: Try different seasons and years
2. **Use Search**: Find your favorite anime
3. **Check Different Views**: Compare Airing vs Archive
4. **Look at the Code**: Learn how it works
5. **Contribute**: Make it even better!

Enjoy using MalChart! 🎉
