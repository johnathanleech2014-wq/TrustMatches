const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: String,
  streamUrl: {
    type: String,
    required: true,
  },
  logo: String,
  category: {
    type: String,
    enum: ['Sports', 'News', 'Entertainment', 'Movies', 'Music', 'Kids', 'Documentary', 'Other'],
    default: 'Other',
  },
  country: String,
  language: [String],
  quality: {
    type: String,
    enum: ['360p', '480p', '720p', '1080p', '4K'],
    default: '720p',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  viewers: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Channel', ChannelSchema);
