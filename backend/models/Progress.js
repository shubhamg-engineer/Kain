const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  physical: {
    weight: Number,
    pushups: Number,
    pullups: Number,
    plank: Number,
    squat: Number,
    bench: Number,
    deadlift: Number,
    run5k: Number // time in minutes
  },
  mental: {
    readingSpeed: Number, // words per minute
    booksRead: Number,
    skills: [String],
    coursesCompleted: [String]
  },
  financial: {
    netWorth: Number,
    monthlyIncome: Number,
    savings: Number
  },
  notes: {
    type: String,
    maxlength: 500
  }
});

// Compound index for efficient queries
ProgressSchema.index({ userId: 1, day: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);