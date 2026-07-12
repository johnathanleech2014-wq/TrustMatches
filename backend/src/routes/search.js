const express = require('express');
const router = express.Router();
const Channel = require('../models/Channel');
const Movie = require('../models/Movie');

// Global search
router.get('/', async (req, res, next) => {
  try {
    const { q, type } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({ success: false, message: 'Query too short' });
    }

    const searchRegex = { $regex: q, $options: 'i' };
    const results = {};

    if (!type || type === 'channels') {
      results.channels = await Channel.find({
        $or: [{ name: searchRegex }, { description: searchRegex }],
        isActive: true,
      }).limit(10);
    }

    if (!type || type === 'movies') {
      results.movies = await Movie.find({
        $or: [{ title: searchRegex }, { description: searchRegex }],
      }).limit(10);
    }

    res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
