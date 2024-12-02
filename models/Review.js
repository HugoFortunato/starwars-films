const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, maxlength: 500 },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
