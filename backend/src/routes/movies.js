const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const { genre, year, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (genre) filter.genre = { $in: [genre] };
    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      filter.releaseDate = { $gte: startDate, $lte: endDate };
    }

    const skip = (page - 1) * limit;
    const movies = await Movie.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ rating: -1 });

    const total = await Movie.countDocuments(filter);

    res.json({
      success: true,
      data: movies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    res.json({ success: true, data: movie });
  } catch (error) {
    next(error);
  }
});

router.get('/trending/all', async (req, res, next) => {
  try {
    const movies = await Movie.find()
      .sort({ views: -1 })
      .limit(20);

    res.json({ success: true, data: movies });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
