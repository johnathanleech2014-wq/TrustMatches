# TrustMatches IPTV TV Player Setup Guide

## Quick Start

You now have a complete IPTV streaming solution with:

✅ **Backend API** - Parses M3U playlists and serves channels  
✅ **React TV Player** - Beautiful web UI to watch channels  
✅ **Channel Management** - Browse by category, search channels  

---

## Installation & Running Locally

### 1. Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file** (optional):
```
PORT=5000
M3U_URL=https://iptv-org.github.io/iptv/countries/us.m3u
NODE_ENV=development
```

**Start the API**:
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

Backend will run on: **http://localhost:5000**

API Endpoints:
- `GET /api/health` - Health check
- `GET /api/channels` - All channels
- `GET /api/groups` - Channel categories
- `GET /api/groups/:name` - Channels in category

### 2. Frontend Setup

```bash
cd frontend
npm install
```

**Create `.env` file**:
```
REACT_APP_API_URL=http://localhost:5000
```

**Start the React app**:
```bash
npm start
```

Frontend will run on: **http://localhost:3000**

---

## Deployment (Free/Cheap Options)

### Option 1: Railway.app (Easiest - Free Tier)

Backend Deployment:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

Railway will give you a live URL like: `https://trustmatches-api.railway.app`

### Option 2: Vercel (Frontend Only)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel

# Add API URL to .env.local in Vercel dashboard
```

### Option 3: Heroku (Alternative)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create trustmatches-iptv

# Deploy
git push heroku main
```

### Option 4: Docker + Cloud Run

Create `Dockerfile` in backend:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Deploy to Google Cloud Run (free tier available).

---

## Environment Variables

### Backend (.env)
```
# Server
PORT=5000
NODE_ENV=production

# M3U Playlist URL (change for different countries)
M3U_URL=https://iptv-org.github.io/iptv/countries/us.m3u

# Alternative playlists:
# Canada: https://iptv-org.github.io/iptv/countries/ca.m3u
# UK: https://iptv-org.github.io/iptv/countries/gb.m3u
# All: https://iptv-org.github.io/iptv/index.m3u
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000  # Local
# or
REACT_APP_API_URL=https://trustmatches-api.railway.app  # Deployed
```

---

## How It Works

### Architecture

```
User Browser
    ↓
React TV Player (Frontend)
    ↓
Express API (Backend) http://localhost:5000
    ↓
M3U Playlist Parser
    ↓
IPTV-Org Playlists (https://iptv-org.github.io/iptv/)
    ↓
Channel Streams (HLS/DASH)
```

### Features Included

✅ Browse 100+ channels  
✅ Organize by category (News, Sports, Entertainment, etc.)  
✅ Search channels  
✅ Channel logos and metadata  
✅ Responsive design (mobile, tablet, desktop)  
✅ Video player with playback controls  
✅ 1-hour playlist caching for performance  

---

## Troubleshooting

### Issue: API returns 404 or "Cannot GET"
- Make sure backend is running on correct port
- Check `REACT_APP_API_URL` in frontend .env
- Verify CORS is enabled in backend

### Issue: Channels won't play
- HLS streams require browser support
- Try Chrome, Firefox, Safari (all support HLS)
- Check browser console for errors
- Verify M3U_URL is valid and accessible

### Issue: Too many API requests / Rate limiting
- Backend caches playlists for 1 hour (see `iptv-api.js`)
- IPTV-Org servers are rate-limited
- Cache is automatically renewed after timeout

### Issue: Blank player
- Open browser console (F12)
- Check for CORS errors
- Verify backend API is running
- Check that `REACT_APP_API_URL` is correct

---

## Customization

### Change Country/Playlist

In `backend/.env` or `backend/iptv-api.js`:

```javascript
// Available countries:
US: https://iptv-org.github.io/iptv/countries/us.m3u
Canada: https://iptv-org.github.io/iptv/countries/ca.m3u
UK: https://iptv-org.github.io/iptv/countries/gb.m3u
Spain: https://iptv-org.github.io/iptv/countries/es.m3u
Brazil: https://iptv-org.github.io/iptv/countries/br.m3u
Mexico: https://iptv-org.github.io/iptv/countries/mx.m3u
// ... and 150+ more countries!
```

### Modify UI Colors

Edit `frontend/src/components/TVPlayer.css`:
```css
/* Change primary color from #00d4ff (cyan) to your color */
--primary-color: #00d4ff;  /* Change this */
```

### Add More Features

Ideas to extend:
- Favorites / Bookmarks
- Watch history
- Channel recommendations
- Multi-language support
- Subtitles
- Recording functionality

---

## Performance Tips

1. **Enable CORS caching** - Backend caches M3U for 1 hour
2. **Use CDN** - Deploy frontend to Vercel/Netlify for edge caching
3. **Optimize images** - Channel logos are cached by browser
4. **Lazy load** - Channels list only renders visible items

---

## Legal & Credits

- IPTV channels from **iptv-org/iptv** (open-source project)
- Uses **HLS.js** for video playback
- Built with **React** and **Express.js**
- Completely free and legal

---

## Support

For issues with:
- **TV Player (Frontend)** - Check `frontend/src/components/TVPlayer.js`
- **API (Backend)** - Check `backend/iptv-api.js`
- **M3U Playlists** - Visit https://iptv-org.github.io/iptv/

---

## Next Steps

1. **Run locally** - Start backend + frontend
2. **Test channels** - Browse and play some channels
3. **Deploy** - Use Railway, Vercel, or Heroku
4. **Share** - Get your unique URL and share!

Enjoy streaming! 📺🍿
