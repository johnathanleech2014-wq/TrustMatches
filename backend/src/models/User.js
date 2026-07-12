const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  avatar: String,
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium', 'family'],
      default: 'free',
    },
    expiresAt: Date,
    isActive: Boolean,
  },
  favoriteChannels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },
  ],
  favoriteMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ],
  watchHistory: [
    {
      contentId: mongoose.Schema.Types.ObjectId,
      contentType: String,
      watchedAt: Date,
      duration: Number,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
