# Setup Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│          HOW TO RUN MALCHART ON YOUR LAPTOP                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │  Do you have Node.js? │
                 └──────────────────────┘
                      │              │
                    YES              NO
                      │              │
                      │              └──────────────────────┐
                      │                                     ▼
                      │                        Install from nodejs.org
                      │                                     │
                      │◄────────────────────────────────────┘
                      │
                      ▼
         ┌────────────────────────────┐
         │ Choose Your Setup Method   │
         └────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
        ▼             ▼             ▼
   AUTOMATED      MANUAL        DOCKER
        │             │             │
        │             │             │
        ▼             ▼             ▼
┌──────────────┐ ┌──────────┐ ┌──────────────┐
│  ./setup.sh  │ │ npm      │ │ docker-      │
│     or       │ │ install  │ │ compose up   │
│  setup.bat   │ │ commands │ │              │
└──────────────┘ └──────────┘ └──────────────┘
        │             │             │
        └─────────────┼─────────────┘
                      │
                      ▼
           ┌────────────────────┐
           │  Backend starts    │
           │  Port 5000        │
           └────────────────────┘
                      │
                      ▼
           ┌────────────────────┐
           │  Frontend starts   │
           │  Port 3000        │
           └────────────────────┘
                      │
                      ▼
           ┌────────────────────┐
           │  Browser opens     │
           │  automatically     │
           └────────────────────┘
                      │
                      ▼
              ┌──────────────┐
              │   SUCCESS!   │
              │      🎉      │
              └──────────────┘
```

---

## Quick Decision Tree

**Are you comfortable with terminal commands?**

```
YES → Use QUICK_REFERENCE.md
  ├─ Copy 3 commands
  └─ Run them

NO → Use automated setup
  ├─ Download project
  ├─ Run ./setup.sh or setup.bat
  └─ Wait for browser to open
```

**Want to see what happens at each step?**

```
YES → Read VISUAL_GUIDE.md first
  └─ Then run setup

NO → Just run setup
  └─ It's self-explanatory!
```

**Want to use Docker?**

```
YES → See QUICKSTART.md
  ├─ docker-compose up
  └─ Done!

NO → Use setup scripts
  └─ Easier for beginners
```

---

## Time Estimates

| Method | Time Required | Difficulty |
|--------|---------------|------------|
| **Automated Setup** | 3-5 minutes | ⭐ Very Easy |
| **Manual Setup** | 5-10 minutes | ⭐⭐ Easy |
| **Docker Setup** | 2-3 minutes | ⭐⭐ Easy |

*Times include download and installation*

---

## What Gets Installed?

```
Your Computer
├── MalChart/
│   ├── Frontend (React App)
│   │   ├── node_modules/ (1470 packages ~300MB)
│   │   └── .env (config file)
│   │
│   ├── Backend (Express Server)
│   │   ├── node_modules/ (104 packages ~50MB)
│   │   └── .env (config file)
│   │
│   └── No Database Required! 
│       (Uses in-memory cache)
```

**Total Size:** ~350MB (mostly dependencies)

---

## Port Usage

| Port | Service | Purpose |
|------|---------|---------|
| **3000** | Frontend | Main app UI |
| **5000** | Backend | API server |

Make sure these ports are available!

---

## Troubleshooting Flow

```
Problem Occurred?
    │
    ▼
┌─────────────────────────┐
│ Check Terminal Messages │
└─────────────────────────┘
    │
    ├─ "Port in use" → Stop other apps or check if already running
    ├─ "npm not found" → Install Node.js
    ├─ "Cannot find module" → Run npm install again
    ├─ "No data showing" → Wait 10-20 seconds, refresh page
    │
    └─ Still stuck? → Check LOCAL_SETUP.md Troubleshooting section
```

---

## Success Indicators

### ✅ Everything Working:

**Terminal 1 (Backend):**
```
✅ MalChart server running on port 5000
```

**Terminal 2 (Frontend):**
```
✅ Compiled successfully!
✅ Local: http://localhost:3000
```

**Browser:**
```
✅ Shows MALCharts interface
✅ Anime cards load within 10 seconds
✅ Search and navigation work
```

---

## After Setup

```
         What's Next?
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
 Explore   Search    Browse
  UI        Anime    Seasons
    │         │         │
    └─────────┼─────────┘
              │
              ▼
       Enjoy MalChart! 🎉
```

---

## Quick Commands Reference

```bash
# Get the project
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart

# Setup (choose one):
./setup.sh              # Automated (Mac/Linux)
setup.bat               # Automated (Windows)
# or follow manual steps in LOCAL_SETUP.md

# Stop:
Ctrl + C                # In terminal(s)

# Restart:
cd server && npm start  # Terminal 1
npm start               # Terminal 2
```

---

## Documentation Map

```
Your Journey:
    1. Start → QUICK_REFERENCE.md (if experienced)
            → LOCAL_SETUP.md (if new)
            → VISUAL_GUIDE.md (want to see examples)
    
    2. Having issues? → LOCAL_SETUP.md (Troubleshooting)
    
    3. Want Docker? → QUICKSTART.md
    
    4. Going to production? → DEPLOYMENT.md
    
    5. Want to contribute? → CONTRIBUTING.md
```

---

**Print this diagram!** 📄 Keep it next to your computer for reference.
