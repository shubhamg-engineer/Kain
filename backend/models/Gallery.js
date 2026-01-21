const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        maxlength: 200
    },
    category: {
        type: String,
        enum: ['before', 'progress', 'after'],
        default: 'progress'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Gallery', GallerySchema);
