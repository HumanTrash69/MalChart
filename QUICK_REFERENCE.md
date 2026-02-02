# MalChart - Quick Reference Card

## 🚀 Get Started (3 Commands)

```bash
git clone https://github.com/HumanTrash69/MalChart.git
cd MalChart
./setup.sh      # Mac/Linux  OR  setup.bat  # Windows
```

**Done!** Opens at http://localhost:3000

---

## 📋 Manual Commands

```bash
# Install
npm install && cd server && npm install && cd ..

# Run (2 terminals)
cd server && npm start    # Terminal 1: Backend
npm start                 # Terminal 2: Frontend
```

---

## ✅ Prerequisites

- Node.js 14+ (check: `node --version`)
- npm 6+ (check: `npm --version`)

**Don't have Node?** → https://nodejs.org/

---

## 🔗 URLs

| Service | URL | What to see |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main app |
| **Backend** | http://localhost:5000 | API server |
| **Health** | http://localhost:5000/health | `{"status":"ok"}` |

---

## 🎮 Features

| Action | How |
|--------|-----|
| **Search** | Type in search bar |
| **Change season** | Click Winter/Spring/Summer/Fall |
| **Change year** | Click ◄ or ► buttons |
| **Switch view** | Click Airing/Archive/TBA |
| **Sort** | Use Sort dropdown |
| **View details** | Click any anime title |

---

## 🛑 Stop

Press **Ctrl + C** in terminal(s)

---

## ❓ Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | Already running or stop other app |
| Port 5000 in use | Backend already running |
| npm not found | Install Node.js |
| No data showing | Wait 10-20 seconds, refresh page |

---

## 📚 Full Guides

- **[LOCAL_SETUP.md](LOCAL_SETUP.md)** - Detailed setup guide
- **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - What to expect (screenshots)
- **[QUICKSTART.md](QUICKSTART.md)** - Docker & alternatives
- **[README.md](README.md)** - Complete documentation

---

**Print this card!** Keep it handy for future reference. 📄✂️
