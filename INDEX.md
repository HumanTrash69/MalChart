# 📖 MalChart Documentation Index

**Welcome!** This index helps you find the right documentation for your needs.

---

## 🚀 I Want to Run This Locally

### Choose Your Path:

**🎯 Absolute Beginner** (Never used terminal before)
1. Read: [SETUP_FLOW.md](SETUP_FLOW.md) - Visual diagrams
2. Read: [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - What to expect
3. Follow: [LOCAL_SETUP.md](LOCAL_SETUP.md) - Step-by-step
4. Use: Automated setup script

**⚡ Quick Start** (Comfortable with terminal)
1. Open: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
2. Copy commands
3. Run them
4. Done!

**🐳 Docker User**
1. Read: [QUICKSTART.md](QUICKSTART.md)
2. Run: `docker-compose up`
3. Done!

---

## 📚 Documentation by Purpose

### Setup & Installation
| Document | Best For | Time |
|----------|----------|------|
| [LOCAL_SETUP.md](LOCAL_SETUP.md) | Complete setup guide | 10 min read |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Experienced users | 1 min read |
| [VISUAL_GUIDE.md](VISUAL_GUIDE.md) | First-time users | 5 min read |
| [SETUP_FLOW.md](SETUP_FLOW.md) | Understanding process | 3 min read |
| [QUICKSTART.md](QUICKSTART.md) | Docker & alternatives | 8 min read |

### Development & Contributing
| Document | Purpose |
|----------|---------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute code |
| [README.md](README.md) | Project overview & architecture |

### Deployment
| Document | Purpose |
|----------|---------|
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide |

---

## 🎯 Quick Answers

### "How do I run this locally?"
→ [LOCAL_SETUP.md](LOCAL_SETUP.md) or run `./setup.sh`

### "What commands do I need?"
→ [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

### "What will happen when I run setup?"
→ [VISUAL_GUIDE.md](VISUAL_GUIDE.md)

### "I'm stuck, help!"
→ [LOCAL_SETUP.md#troubleshooting](LOCAL_SETUP.md#-troubleshooting)

### "How do I deploy to production?"
→ [DEPLOYMENT.md](DEPLOYMENT.md)

### "I want to contribute"
→ [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📖 Reading Order

### For Users (Run Locally)
```
1. QUICK_REFERENCE.md  (1 min)  ← Start here if experienced
   OR
   SETUP_FLOW.md       (3 min)  ← Start here if beginner
   ↓
2. LOCAL_SETUP.md      (10 min) ← Detailed setup
   ↓
3. VISUAL_GUIDE.md     (5 min)  ← See what to expect
   ↓
4. Run setup script!
```

### For Developers (Contributing)
```
1. README.md           (15 min) ← Understand project
   ↓
2. LOCAL_SETUP.md      (10 min) ← Get it running
   ↓
3. CONTRIBUTING.md     (10 min) ← Learn guidelines
   ↓
4. Start coding!
```

### For DevOps (Deployment)
```
1. README.md           (15 min) ← Understand architecture
   ↓
2. DEPLOYMENT.md       (20 min) ← Deployment options
   ↓
3. Choose method (Docker, Heroku, AWS, etc.)
```

---

## 🔍 Find by Topic

### Prerequisites
- Node.js requirements → [LOCAL_SETUP.md](LOCAL_SETUP.md#-what-you-need)
- System requirements → [README.md](README.md#prerequisites)

### Installation
- Automated setup → [LOCAL_SETUP.md](LOCAL_SETUP.md#-step-2-automatic-setup-easiest)
- Manual setup → [LOCAL_SETUP.md](LOCAL_SETUP.md#-manual-setup-if-you-prefer)
- Docker setup → [QUICKSTART.md](QUICKSTART.md#option-2-docker-setup-recommended-for-production)

### Configuration
- Environment variables → [LOCAL_SETUP.md](LOCAL_SETUP.md#step-b-configure-settings)
- Backend config → [server/README.md](server/README.md)

### Troubleshooting
- Common issues → [LOCAL_SETUP.md](LOCAL_SETUP.md#-troubleshooting)
- Port conflicts → [VISUAL_GUIDE.md](VISUAL_GUIDE.md#common-visual-indicators)

### Features
- Using the app → [LOCAL_SETUP.md](LOCAL_SETUP.md#-using-the-application)
- Feature list → [README.md](README.md#features)

### Architecture
- Tech stack → [README.md](README.md#tech-stack)
- Project structure → [README.md](README.md#architecture)
- API endpoints → [server/README.md](server/README.md)

---

## 📱 Quick Commands

```bash
# Setup (choose one)
./setup.sh              # Mac/Linux automated
setup.bat               # Windows automated

# Manual start
cd server && npm start  # Backend
npm start               # Frontend

# Docker
docker-compose up       # Start with Docker

# Stop
Ctrl + C                # Stop servers
docker-compose down     # Stop Docker
```

---

## 🆘 Need Help?

1. **Check documentation** → Use this index to find relevant guide
2. **Common issues** → [LOCAL_SETUP.md#troubleshooting](LOCAL_SETUP.md#-troubleshooting)
3. **GitHub Issues** → https://github.com/HumanTrash69/MalChart/issues
4. **Jikan API status** → https://jikan.moe/

---

## 📄 Document Sizes

Quick overview of how long each document is:

| Document | Lines | Reading Time |
|----------|-------|--------------|
| QUICK_REFERENCE.md | ~80 | 1 min |
| SETUP_FLOW.md | ~250 | 3 min |
| LOCAL_SETUP.md | ~200 | 10 min |
| VISUAL_GUIDE.md | ~300 | 5 min |
| QUICKSTART.md | ~180 | 8 min |
| CONTRIBUTING.md | ~250 | 10 min |
| DEPLOYMENT.md | ~350 | 20 min |
| README.md | ~400 | 15 min |

---

**Last Updated:** 2024-02-02

*This index is maintained to help you navigate MalChart documentation efficiently.*
