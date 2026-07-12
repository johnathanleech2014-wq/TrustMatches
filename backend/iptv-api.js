const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Cache for parsed playlists
let playlistCache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 3600000 // 1 hour in milliseconds
};

/**
 * Parse M3U playlist format
 */
function parseM3U(content) {
  const lines = content.split('\n');
  const items = [];
  let currentItem = null;

  for (const line of lines) {
    if (line.startsWith('#EXTINF:')) {
      // Parse metadata line
      const metaMatch = line.match(/#EXTINF:.*,(.+)$/);
      const name = metaMatch ? metaMatch[1].trim() : 'Unknown';
      
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const logo = logoMatch ? logoMatch[1] : '';
      
      const groupMatch = line.match(/group-title="([^"]+)"/);
      const group = groupMatch ? groupMatch[1] : 'Uncategorized';

      currentItem = {
        name: name,
        logo: logo,
        group: group,
        url: null
      };
    } else if (line.trim() && !line.startsWith('#') && currentItem) {
      currentItem.url = line.trim();
      items.push(currentItem);
      currentItem = null;
    }
  }

  return { items };
}

/**
 * Fetch and parse M3U playlist
 */
async function fetchPlaylist(url) {
  try {
    // Check cache
    const now = Date.now();
    if (playlistCache.data && (now - playlistCache.timestamp) < playlistCache.CACHE_DURATION) {
      console.log('Using cached playlist');
      return playlistCache.data;
    }

    console.log('Fetching fresh playlist from:', url);
    const response = await axios.get(url, { timeout: 30000 });
    const parsed = parseM3U(response.data);
    
    // Update cache
    playlistCache.data = parsed;
    playlistCache.timestamp = now;
    
    return parsed;
  } catch (error) {
    console.error('Error fetching playlist:', error.message);
    throw error;
  }
}

/**
 * GET /api/channels
 * Returns list of all channels from M3U playlist
 */
app.get('/api/channels', async (req, res) => {
  try {
    const m3uUrl = process.env.M3U_URL || 'https://iptv-org.github.io/iptv/countries/us.m3u';
    const playlist = await fetchPlaylist(m3uUrl);
    
    // Format channels with additional metadata
    const channels = playlist.items
      .filter(item => item.url) // Only valid channels
      .map((item, index) => ({
        id: index,
        name: item.name,
        logo: item.logo,
        url: item.url,
        group: item.group
      }));

    res.json({
      success: true,
      count: channels.length,
      channels: channels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/channels/:id
 * Returns a specific channel
 */
app.get('/api/channels/:id', async (req, res) => {
  try {
    const m3uUrl = process.env.M3U_URL || 'https://iptv-org.github.io/iptv/countries/us.m3u';
    const playlist = await fetchPlaylist(m3uUrl);
    const id = parseInt(req.params.id);
    
    const validChannels = playlist.items.filter(item => item.url);
    
    if (id < 0 || id >= validChannels.length) {
      return res.status(404).json({
        success: false,
        error: 'Channel not found'
      });
    }

    const item = validChannels[id];
    const channel = {
      id: id,
      name: item.name,
      logo: item.logo,
      url: item.url,
      group: item.group
    };

    res.json({
      success: true,
      channel: channel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/groups
 * Returns list of channel groups/categories
 */
app.get('/api/groups', async (req, res) => {
  try {
    const m3uUrl = process.env.M3U_URL || 'https://iptv-org.github.io/iptv/countries/us.m3u';
    const playlist = await fetchPlaylist(m3uUrl);
    
    // Extract unique groups
    const groups = [...new Set(
      playlist.items
        .filter(item => item.url)
        .map(item => item.group || 'Uncategorized')
        .filter(Boolean)
    )].sort();

    res.json({
      success: true,
      count: groups.length,
      groups: groups
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/groups/:name
 * Returns channels in a specific group
 */
app.get('/api/groups/:name', async (req, res) => {
  try {
    const m3uUrl = process.env.M3U_URL || 'https://iptv-org.github.io/iptv/countries/us.m3u';
    const playlist = await fetchPlaylist(m3uUrl);
    const groupName = decodeURIComponent(req.params.name);
    
    const channels = playlist.items
      .filter(item => item.url && item.group === groupName)
      .map((item, index) => ({
        id: index,
        name: item.name,
        logo: item.logo,
        url: item.url,
        group: item.group
      }));

    res.json({
      success: true,
      group: groupName,
      count: channels.length,
      channels: channels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'IPTV API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({
    name: 'TrustMatches IPTV API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      channels: 'GET /api/channels',
      channel: 'GET /api/channels/:id',
      groups: 'GET /api/groups',
      groupChannels: 'GET /api/groups/:name'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🎬 TrustMatches IPTV API running on port ${PORT}`);
  console.log(`📺 M3U URL: ${process.env.M3U_URL || 'https://iptv-org.github.io/iptv/countries/us.m3u'}`);
  console.log(`🌐 API Base: http://localhost:${PORT}`);
});
