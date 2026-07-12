const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favoriteChannels', 'name logo category')
      .populate('favoriteMovies', 'title poster rating');

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

// Update profile
router.put('/profile', auth, async (req, res, next) => {
  try {
    const { firstName, lastName, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, avatar },
      { new: true }
    );

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

// Get watch history
router.get('/watch-history', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, data: user.watchHistory });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
