const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: String,
  genre: [String],
  releaseDate: Date,
  duration: Number, // in minutes
  director: String,
  cast: [String],
  poster: String,
  backdrop: String,
  videoUrl: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    enum: ['480p', '720p', '1080p', '4K'],
    default: '1080p',
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
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

module.exports = mongoose.model('Movie', MovieSchema);
