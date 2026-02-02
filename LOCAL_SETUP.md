# 🚀 How to Run MalChart on Your Laptop

This is the **simplest guide** to get MalChart running locally on your computer.

> 💡 **Want step-by-step screenshots?** Check out the [Visual Setup Guide](VISUAL_GUIDE.md)!

## ✅ What You Need

Before starting, make sure you have:
- **Node.js** (version 14 or newer) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **terminal/command prompt**

To check if you have Node.js installed:
```bash
node --version
npm --version
```

If these commands work, you're good to go! 🎉

## 📦 Step 1: Download the Project

Open your terminal and run:
```bash
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart
```

Or download and extract the ZIP from GitHub, then open terminal in that folder.

## 🔧 Step 2: Automatic Setup (Easiest!)

Run this one command to set everything up automatically:

### On Mac/Linux:
```bash
chmod +x setup.sh
./setup.sh
```

### On Windows:
```bash
setup.bat
```

The script will:
- ✅ Install all dependencies
- ✅ Create configuration files
- ✅ Start both backend and frontend
- ✅ Open the app in your browser

**That's it!** The app should open automatically at http://localhost:3000

---

## 🔨 Manual Setup (If You Prefer)

If you want to run things manually:

### Step A: Install Dependencies

1. **Install frontend dependencies:**
```bash
npm install
```

2. **Install backend dependencies:**
```bash
cd server
npm install
cd ..
```

### Step B: Configure Settings

1. **Copy the example config files:**

In the main folder:
```bash
cp .env.example .env
```

In the server folder:
```bash
cp server/.env.example server/.env
```

These files already have the correct settings for local development!

### Step C: Start the Application

You need TWO terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```

You should see: `MalChart server running on port 5000`

**Terminal 2 - Frontend App:**
```bash
npm start
```

This will automatically open http://localhost:3000 in your browser!

---

## ✨ Verify It's Working

When everything is running, you should see:

1. **Terminal 1 (Backend):** 
   ```
   MalChart server running on port 5000
   ```

2. **Terminal 2 (Frontend):**
   ```
   Compiled successfully!
   ```

3. **Browser:** 
   - Opens automatically at http://localhost:3000
   - Shows MALCharts with seasonal anime

## 🎮 Using the Application

Once running:
- Click **season tabs** (Winter, Spring, Summer, Fall)
- Use **◄ ►** buttons to change years
- Try the **search bar** to find anime
- Click **Airing/Archive/TBA** to switch views
- Click any anime title to view on MyAnimeList

## 🛑 How to Stop

To stop the application:
1. Press `Ctrl + C` in both terminal windows
2. Or close the terminal windows

## ❓ Troubleshooting

### "Port 3000 is already in use"
Something else is using port 3000. Either:
- Stop other applications using that port
- Or the frontend is already running (check http://localhost:3000)

### "Port 5000 is already in use"
Something else is using port 5000. Either:
- Stop other applications using that port  
- Or the backend is already running

### "npm: command not found"
You need to install Node.js first: https://nodejs.org/

### "Cannot find module"
Run `npm install` again in the main folder and in the `server` folder

### No data showing
- Wait 10-20 seconds for data to load
- Check that the backend is running
- Try refreshing the page

### Still stuck?
1. Make sure both backend and frontend are running
2. Check http://localhost:5000/health - should show `{"status":"ok"}`
3. Check the browser console (F12) for errors
4. See [QUICKSTART.md](QUICKSTART.md) for more detailed troubleshooting

## 🎯 Quick Reference

```bash
# Clone project
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart

# Install everything
npm install
cd server && npm install && cd ..

# Start backend (terminal 1)
cd server && npm start

# Start frontend (terminal 2)
npm start
```

That's it! Enjoy MalChart! 🎉

## 📚 More Information

- [Quick Start Guide](QUICKSTART.md) - Alternative setup methods
- [README.md](README.md) - Full project documentation  
- [CONTRIBUTING.md](CONTRIBUTING.md) - Want to contribute?
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production
