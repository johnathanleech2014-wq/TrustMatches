# Setup Guide

## Prerequisites

- Node.js 18+
- MongoDB 5.0+
- Redis 6.0+
- npm or yarn

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/johnathanleech2014-wq/TrustMatches.git
cd TrustMatches
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API will be running at `http://localhost:5000`

### 3. Environment Configuration

Edit `backend/.env` with your settings:

```
MONGODB_URI=mongodb://localhost:27017/iptv_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key_here
API_PORT=5000
```

### 4. Database Setup

MongoDB and Redis need to be running:

```bash
# MongoDB
mongod

# Redis
redis-server
```

## Running Tests

```bash
cd backend
npm test
```

## API Documentation

Once the server is running, visit:
- API Health: `http://localhost:5000/health`
- API Docs: See [API.md](./api/API.md)

## Features Ready

- ✅ User Authentication (Register/Login)
- ✅ Channel Management with Filtering
- ✅ Movie Catalog with VOD
- ✅ Stream URL Delivery
- ✅ User Profiles & Watch History
- ✅ Global Search Functionality
- ✅ Subscription-based Access Control

## Next Steps

- Add admin panel for content management
- Implement frontend UI with React
- Setup CDN for video streaming
- Add payment integration
- Implement live transcoding with FFmpeg
