const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all gallery photos (public)
router.get('/', async (req, res) => {
    try {
        const photos = await Gallery.find()
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Upload new photo (protected)
router.post('/', auth, async (req, res) => {
    try {
        const { imageUrl, caption, day, category } = req.body;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const photo = new Gallery({
            userId: req.userId,
            username: user.displayName || user.username,
            imageUrl,
            caption,
            day,
            category
        });

        await photo.save();
        res.status(201).json({
            message: 'Photo uploaded successfully',
            photo
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete photo (protected - only own photos)
router.delete('/:id', auth, async (req, res) => {
    try {
        const photo = await Gallery.findById(req.params.id);

        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        if (photo.userId.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not authorized to delete this photo' });
        }

        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
