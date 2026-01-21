const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all blog posts (public)
router.get('/', async (req, res) => {
    try {
        const posts = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single blog post (public)
router.get('/:id', async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new blog post (protected)
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, day, tags } = req.body;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const post = new Blog({
            userId: req.userId,
            username: user.displayName || user.username,
            title,
            content,
            day,
            tags: tags || []
        });

        await post.save();
        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update blog post (protected - only own posts)
router.put('/:id', auth, async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.userId.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not authorized to edit this post' });
        }

        const { title, content, tags } = req.body;

        post.title = title || post.title;
        post.content = content || post.content;
        post.tags = tags || post.tags;
        post.updatedAt = Date.now();

        await post.save();
        res.json({
            message: 'Post updated successfully',
            post
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete blog post (protected - only own posts)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Blog.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.userId.toString() !== req.userId) {
            return res.status(403).json({ error: 'Not authorized to delete this post' });
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
