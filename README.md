# TrustMatches IPTV Service

🎬 A comprehensive IPTV streaming service with thousands of worldwide channels and VOD movies.

## Features

- 🌍 **Thousands of Worldwide Channels** - Live TV from 150+ countries
- 🎥 **Extensive VOD Library** - Movies and series
- 📱 **Cross-Platform Support** - Web, Mobile (iOS/Android), Smart TV
- 🔒 **Secure Authentication** - User accounts and subscriptions
- ⚡ **High-Performance Streaming** - Adaptive bitrate streaming
- 🎯 **Advanced Search & Categories** - Easy content discovery
- 📊 **Analytics & Recommendations** - Personalized content
- 🌐 **Multi-Language Support** - Global audience

## Project Structure

```
├── backend/              # Node.js/Express server
├── frontend/             # React web application
├── api/                  # API documentation
└── docs/                 # Project documentation
```

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React, Redux, Material-UI
- **Streaming**: HLS/DASH with FFmpeg
- **Cache**: Redis
- **Search**: Elasticsearch

## Getting Started

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API will be running at `http://localhost:5000`

## API Documentation

See [API.md](./api/API.md) for detailed endpoints

## Features Implemented

✅ User Authentication (Register/Login)  
✅ Channel Management (Browse by category, country, quality)  
✅ Movie VOD Catalog  
✅ Streaming URL Delivery  
✅ User Profiles & Watch History  
✅ Global Search  
✅ Subscription Plans (Free/Basic/Premium/Family)  
✅ JWT Token Authentication  
✅ MongoDB Database Integration  
✅ Redis Caching  

## License

MIT
