const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Channel = require('../models/Channel');
const Movie = require('../models/Movie');

// Get stream URL for channel
router.get('/channel/:id', auth, async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ success: false, message: 'Channel not found' });
    }

    // Check subscription if premium
    if (channel.isPremium && req.user.subscription.plan === 'free') {
      return res.status(403).json({ success: false, message: 'Premium subscription required' });
    }

    res.json({
      success: true,
      streamUrl: channel.streamUrl,
      quality: channel.quality,
      title: channel.name,
    });
  } catch (error) {
    next(error);
  }
});

// Get stream URL for movie
router.get('/movie/:id', auth, async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    // Check subscription if premium
    if (movie.isPremium && req.user.subscription.plan === 'free') {
      return res.status(403).json({ success: false, message: 'Premium subscription required' });
    }

    res.json({
      success: true,
      streamUrl: movie.videoUrl,
      quality: movie.quality,
      title: movie.title,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
