# GitHub Pages Deployment Guide

Complete guide to deploying MalChart to GitHub Pages (github.io).

## 🎯 Overview

MalChart can be deployed to GitHub Pages for free hosting. The architecture consists of:

- **Frontend:** React app on GitHub Pages (static hosting)
- **Backend:** Node.js/Express on separate hosting (Render/Railway/Fly.io)

## 📋 Prerequisites

- GitHub account
- Git installed
- Node.js 14+ installed
- Repository pushed to GitHub

## 🚀 Deployment Methods

### Method 1: Automatic Deployment (Recommended)

GitHub Actions automatically deploys on every push to main branch.

**Setup:**
1. The workflow file is already created at `.github/workflows/deploy.yml`
2. Just push to main branch and deployment happens automatically!

```bash
git push origin main
```

3. Check deployment status:
   - Go to your repository on GitHub
   - Click "Actions" tab
   - See build and deploy progress

### Method 2: Manual Deployment

Deploy manually from your local machine.

**Setup:**
1. Install dependencies:
```bash
npm install
```

2. Deploy:
```bash
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch.

## ⚙️ Configuration Steps

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** section (left sidebar)
4. Under "Source":
   - Select: **Deploy from a branch**
   - Branch: **gh-pages** (will be created after first deployment)
   - Folder: **/ (root)**
5. Click **Save**

### Step 2: Configure Homepage URL

The `package.json` already has:
```json
{
  "homepage": "https://MalCharts.github.io/MalChart"
}
```

**Change this to match your setup:**

- User repository: `https://username.github.io/repository-name`
- Organization: `https://MalCharts.github.io/MalChart`
- Custom domain: `https://your-domain.com`

### Step 3: Deploy Backend (Recommended)

For full functionality, deploy the backend separately.

#### Option A: Render (Recommended)

**Free tier available!**

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Connect your repository
5. Configure:
   - **Name:** malchart-backend
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add environment variables:
   - `MONGODB_URI`: (optional) Your MongoDB connection string
   - `PORT`: 5000 (or leave default)
7. Click **Create Web Service**
8. Copy your service URL (e.g., `https://malchart-backend.onrender.com`)

#### Option B: Railway

**Free tier available!**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Railway auto-detects Node.js
6. Add environment variables in Settings:
   - `MONGODB_URI`: (optional)
7. Copy your deployment URL

#### Option C: Fly.io

**Free tier available!**

1. Install flyctl: [fly.io/docs/hands-on/install-flyctl](https://fly.io/docs/hands-on/install-flyctl/)
2. Sign up: `fly auth signup`
3. In your `server` directory:
```bash
cd server
fly launch
```
4. Follow prompts, deploy:
```bash
fly deploy
```

### Step 4: Configure Frontend to Use Backend

Update `.env.production` with your backend URL:

```bash
REACT_APP_API_URL=https://your-backend-url.com
```

**Examples:**
- Render: `https://malchart-backend.onrender.com`
- Railway: `https://malchart-backend.up.railway.app`
- Fly.io: `https://malchart-backend.fly.dev`

### Step 5: Update Backend CORS

The backend `server.js` already includes:

```javascript
const allowedOrigins = [
  'https://malcharts.github.io',
  'https://humantrash69.github.io',
  // Add your domain here
];
```

**Add your GitHub Pages URL** to the allowed origins if different.

### Step 6: Deploy!

**Automatic:**
```bash
git add .
git commit -m "Configure for GitHub Pages"
git push origin main
```

**Manual:**
```bash
npm run deploy
```

### Step 7: Access Your Site

After deployment completes (1-2 minutes):

```
https://MalCharts.github.io/MalChart
```

Or your configured URL!

## 🌐 Custom Domain Setup (Optional)

Want `malcharts.github.io` or `malcharts.com`?

### Option 1: Organization Repository

For `malcharts.github.io` (no repo name in URL):

1. Create GitHub organization: "MalCharts"
2. Create repository: `malcharts.github.io`
3. Push code to this repository
4. Result: `https://malcharts.github.io`

### Option 2: Custom Domain

For your own domain like `malcharts.com`:

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. Add `CNAME` file to your repository root:
```
malcharts.com
```

3. Configure DNS with your provider:
   - Type: `CNAME`
   - Name: `@` (or `www`)
   - Value: `username.github.io`
   - TTL: 3600

4. In GitHub Settings → Pages:
   - Custom domain: `malcharts.com`
   - Check "Enforce HTTPS"

5. Wait for DNS propagation (can take up to 24 hours)

## 🔧 Environment Variables

### Frontend (.env.production)

```bash
# Backend API URL
REACT_APP_API_URL=https://your-backend-url.com
```

### Backend (Render/Railway/Fly.io)

```bash
# MongoDB connection (optional)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/malchart

# Port (usually auto-configured)
PORT=5000
```

### GitHub Secrets (for Actions)

Add in Settings → Secrets and variables → Actions:

1. **REACT_APP_API_URL** (optional)
   - Your backend URL
   - Used during build

2. **CUSTOM_DOMAIN** (optional)
   - Your custom domain
   - Only if using custom domain

## 🧪 Testing

### Test Locally First

```bash
# Build production version
npm run build

# Serve locally
npx serve -s build
```

Visit `http://localhost:3000` to test.

### Test Deployment

After deployment:

1. Visit your GitHub Pages URL
2. Check:
   - ✅ Site loads
   - ✅ Navigation works
   - ✅ Data loads (if backend configured)
   - ✅ Filters work
   - ✅ Search works
   - ✅ Theme toggle works

## 🐛 Troubleshooting

### Issue: 404 Error on Refresh

**Problem:** SPA routing doesn't work on refresh.

**Solution:** GitHub Pages doesn't support SPA routing. Options:
1. Use HashRouter instead of BrowserRouter (not recommended)
2. Add 404.html redirect (see: [GitHub Pages SPA guide](https://github.com/rafgraph/spa-github-pages))

### Issue: Blank Page

**Problem:** App shows blank page.

**Solutions:**
1. Check browser console for errors
2. Verify `homepage` in `package.json` matches your URL
3. Clear browser cache
4. Check GitHub Actions build succeeded

### Issue: API Calls Fail

**Problem:** Data doesn't load.

**Solutions:**
1. Check backend is deployed and running
2. Verify `REACT_APP_API_URL` is set correctly
3. Check backend CORS allows your frontend URL
4. Check browser network tab for errors

### Issue: Environment Variables Not Working

**Problem:** `REACT_APP_API_URL` not recognized.

**Solutions:**
1. Must start with `REACT_APP_` prefix
2. Set in `.env.production` file
3. Rebuild after changing
4. In GitHub Actions, add to secrets

### Issue: Build Fails

**Problem:** GitHub Actions build fails.

**Solutions:**
1. Check Actions tab for error details
2. Ensure `package.json` scripts are correct
3. Test build locally: `npm run build`
4. Check Node.js version compatibility

## 📊 Deployment Architecture

```
┌─────────────────────────────────────────┐
│          GitHub Pages (Frontend)         │
│    https://malcharts.github.io/MalChart │
└────────────────┬────────────────────────┘
                 │ API Calls
                 ▼
┌─────────────────────────────────────────┐
│    Backend (Render/Railway/Fly.io)      │
│   https://malchart-backend.onrender.com │
└────────────────┬────────────────────────┘
                 │ Requests
                 ▼
┌─────────────────────────────────────────┐
│          Jikan API (MAL Data)           │
│        https://api.jikan.moe/v4         │
└────────────────┬────────────────────────┘
                 │ Stores (optional)
                 ▼
┌─────────────────────────────────────────┐
│      MongoDB (Persistent Storage)       │
│   mongodb+srv://cluster.mongodb.net     │
└─────────────────────────────────────────┘
```

## 📝 Checklist

Before deploying, ensure:

- [ ] Repository on GitHub
- [ ] `package.json` homepage URL set correctly
- [ ] GitHub Pages enabled in Settings
- [ ] Backend deployed (Render/Railway/Fly.io)
- [ ] `.env.production` configured with backend URL
- [ ] Backend CORS allows frontend URL
- [ ] Code pushed to main branch
- [ ] GitHub Actions workflow exists
- [ ] Build succeeds locally

## 🎉 Success!

Your MalChart site should now be live on GitHub Pages!

**Next Steps:**
1. Share your URL!
2. Set up custom domain (optional)
3. Monitor usage
4. Update content regularly

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/#github-pages)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Fly.io Documentation](https://fly.io/docs)

## 🆘 Need Help?

- Check GitHub Actions logs for build errors
- Test locally with `npm run build && npx serve -s build`
- Verify all environment variables are set
- Check browser console for runtime errors

Happy Deploying! 🚀
