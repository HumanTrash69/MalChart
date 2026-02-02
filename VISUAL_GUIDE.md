# Visual Setup Guide

This guide shows you exactly what to expect when running MalChart locally.

## Step-by-Step Visual Guide

### 1️⃣ Check Prerequisites

Open your terminal and run:
```bash
node --version
npm --version
```

**Expected Output:**
```
v18.x.x  (or v14+)
8.x.x    (or v6+)
```

✅ If you see version numbers, you're ready!  
❌ If you see "command not found", install Node.js from https://nodejs.org/

---

### 2️⃣ Clone the Project

```bash
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart
```

**Expected Output:**
```
Cloning into 'MalChart'...
remote: Enumerating objects: ...
remote: Counting objects: 100% ...
Receiving objects: 100% ...
```

---

### 3️⃣ Run Automated Setup

**On Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**On Windows:**
```bash
setup.bat
```

**Expected Output:**
```
🚀 MalChart - Automated Setup
==============================

✅ Node.js version: v18.x.x
✅ npm version: 8.x.x

📦 Step 1/4: Installing frontend dependencies...
added 1470 packages in 40s
✅ Frontend dependencies installed!

📦 Step 2/4: Installing backend dependencies...
added 104 packages in 4s
✅ Backend dependencies installed!

🔧 Step 3/4: Setting up configuration files...
✅ Created .env file
✅ Created server/.env file

🚀 Step 4/4: Starting MalChart...

==============================
✅ Setup Complete!
==============================

Starting servers...
- Backend will run on http://localhost:5000
- Frontend will run on http://localhost:3000

✅ Backend server started
✅ Frontend started

==============================
🎉 MalChart is running!
==============================

Open in browser: http://localhost:3000
```

---

### 4️⃣ Verify Backend is Running

Open http://localhost:5000/health in your browser or run:
```bash
curl http://localhost:5000/health
```

**Expected Output:**
```json
{
  "status": "ok",
  "timestamp": "2024-02-02T12:00:00.000Z"
}
```

✅ Backend is working!

---

### 5️⃣ Verify Frontend is Running

Your browser should automatically open to http://localhost:3000

**What You Should See:**

```
┌─────────────────────────────────────────────────────┐
│  MALCharts     [2024]     ☰ Winter Spring Summer Fall│
│                                  Airing Archive TBA  │
├─────────────────────────────────────────────────────┤
│           Currently Airing                           │
│                                                      │
│  [Search anime by title...]                         │
│                                                      │
│  150 titles     Sort by: [Members ▼]                │
│                                                      │
│  ┌────────┐  ┌────────┐  ┌────────┐                │
│  │ Anime  │  │ Anime  │  │ Anime  │                │
│  │ Poster │  │ Poster │  │ Poster │                │
│  │        │  │        │  │        │                │
│  └────────┘  └────────┘  └────────┘                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Key Elements:**
- ✅ MALCharts branding at top left
- ✅ Year navigation (◄ 2024 ►)
- ✅ Season tabs (Winter, Spring, Summer, Fall)
- ✅ View buttons (Airing, Archive, TBA)
- ✅ Search bar
- ✅ Sort dropdown
- ✅ Anime cards with posters

---

### 6️⃣ Test the Features

Try these to confirm everything works:

1. **Search:** Type "demon slayer" in the search bar
   - Should filter results instantly

2. **Change Season:** Click "Spring" 
   - Should load different anime

3. **Change Year:** Click ◄ or ►
   - Should navigate to previous/next year

4. **Sort:** Change dropdown to "Score"
   - Should reorder anime by rating

5. **Click Anime:** Click any anime title
   - Should open MyAnimeList page in new tab

---

## Terminal Output Reference

### Normal Backend Output:
```
MalChart server running on port 5000
Starting initial data refresh...
Fetching seasonal anime for winter 2024...
Fetched 150 anime for winter 2024
```

### Normal Frontend Output:
```
Compiled successfully!

You can now view malcharts in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.x:3000
```

---

## Common Visual Indicators

### ✅ Everything Working:
- Green terminal messages
- "Compiled successfully!"
- Browser opens automatically
- Anime cards load within 5-10 seconds

### ⚠️ Loading Data:
- Spinning loader icon
- "Fetching anime data..." message
- Wait 10-20 seconds for first load

### ❌ Something Wrong:
- Red error messages in terminal
- "Failed to fetch" in browser console
- Empty page or no anime cards

See [LOCAL_SETUP.md](LOCAL_SETUP.md#-troubleshooting) for solutions!

---

## File Structure After Setup

```
MalChart/
├── .env                    ← Created by setup
├── server/
│   ├── .env               ← Created by setup
│   └── node_modules/      ← Created by npm install
├── node_modules/          ← Created by npm install
├── setup.sh               ← Setup script
├── setup.bat              ← Windows setup script
└── LOCAL_SETUP.md         ← This guide!
```

---

## How to Stop

**If using automated setup:**
- Press `Ctrl + C` in the terminal (Mac/Linux)
- Close the command windows (Windows)

**If running manually:**
- Press `Ctrl + C` in both terminal windows

---

## Next Steps

Once running successfully:

1. ✅ **Explore the UI** - Try different seasons and years
2. ✅ **Use Search** - Find your favorite anime  
3. ✅ **Test Features** - Try all the buttons and filters
4. ✅ **Check the Code** - Browse src/ to see how it works
5. ✅ **Contribute** - See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Need Help?

- 📖 [LOCAL_SETUP.md](LOCAL_SETUP.md) - Full setup guide
- 🚀 [QUICKSTART.md](QUICKSTART.md) - Alternative methods
- 📚 [README.md](README.md) - Complete documentation
- 🐛 [GitHub Issues](https://github.com/HumanTrash69/MalChart/issues)

Enjoy MalChart! 🎉
