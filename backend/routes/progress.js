const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const auth = require('../middleware/auth');

// Get Kain's progress (public)
router.get('/kain', async (req, res) => {
  try {
    const fs = require('fs').promises;
    const path = require('path');
    const dataPath = path.join(__dirname, '../data/kain-progress.json');
    const data = await fs.readFile(dataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's progress (protected)
router.get('/user', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId })
      .sort({ day: 1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Save daily progress (protected)
router.post('/save', auth, async (req, res) => {
  try {
    const { day, physical, mental, financial, notes } = req.body;

    // Update or create
    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId, day },
      { physical, mental, financial, notes, date: new Date() },
      { upsert: true, new: true }
    );

    res.json({
      message: 'Progress saved',
      progress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;