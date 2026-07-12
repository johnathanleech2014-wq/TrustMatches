const express = require('express');
const router = express.Router();
const Channel = require('../models/Channel');
const auth = require('../middleware/auth');

router.get('/', async (req, res, next) => {
  try {
    const { category, country, quality, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (country) filter.country = country;
    if (quality) filter.quality = quality;
    filter.isActive = true;

    const skip = (page - 1) * limit;
    const channels = await Channel.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ viewers: -1 });

    const total = await Channel.countDocuments(filter);

    res.json({
      success: true,
      data: channels,
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
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ success: false, message: 'Channel not found' });
    }
    res.json({ success: true, data: channel });
  } catch (error) {
    next(error);
  }
});

router.get('/category/:category', async (req, res, next) => {
  try {
    const channels = await Channel.find({
      category: req.params.category,
      isActive: true,
    }).sort({ viewers: -1 });

    res.json({ success: true, data: channels });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
