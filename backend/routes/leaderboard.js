const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const User = require('../models/User');

// Get leaderboard by category
router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!['physical', 'mental', 'financial'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Get all users who opted in to leaderboard
    const users = await User.find({ showOnLeaderboard: true });
    
    const leaderboardData = [];

    for (const user of users) {
      // Get user's latest progress
      const latestProgress = await Progress.findOne({ userId: user._id })
        .sort({ day: -1 })
        .limit(1);

      if (latestProgress) {
        let score = 0;

        // Calculate score based on category
        if (category === 'physical') {
          score = (latestProgress.physical.squat || 0) + 
                  (latestProgress.physical.bench || 0) + 
                  (latestProgress.physical.deadlift || 0);
        } else if (category === 'mental') {
          score = latestProgress.mental.booksRead || 0;
        } else if (category === 'financial') {
          score = latestProgress.financial.netWorth || 0;
        }

        leaderboardData.push({
          username: user.displayName || user.username,
          day: latestProgress.day,
          score: score
        });
      }
    }

    // Sort by score descending
    leaderboardData.sort((a, b) => b.score - a.score);

    // Return top 10
    res.json(leaderboardData.slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get most improved users
router.get('/stats/improvers', async (req, res) => {
  try {
    const users = await User.find({ showOnLeaderboard: true });
    const improversData = [];

    for (const user of users) {
      const allProgress = await Progress.find({ userId: user._id })
        .sort({ day: 1 });

      if (allProgress.length >= 2) {
        const first = allProgress[0];
        const latest = allProgress[allProgress.length - 1];

        const improvements = {
          pushups: (latest.physical.pushups || 0) - (first.physical.pushups || 0),
          squat: (latest.physical.squat || 0) - (first.physical.squat || 0),
          netWorth: (latest.financial.netWorth || 0) - (first.financial.netWorth || 0),
          booksRead: (latest.mental.booksRead || 0) - (first.mental.booksRead || 0)
        };

        improversData.push({
          username: user.displayName || user.username,
          days: allProgress.length,
          improvements
        });
      }
    }

    // Sort by total improvement (combined metric)
    improversData.sort((a, b) => {
      const scoreA = a.improvements.pushups + a.improvements.squat/10 + a.improvements.netWorth/1000 + a.improvements.booksRead * 10;
      const scoreB = b.improvements.pushups + b.improvements.squat/10 + b.improvements.netWorth/1000 + b.improvements.booksRead * 10;
      return scoreB - scoreA;
    });

    res.json(improversData.slice(0, 10));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
