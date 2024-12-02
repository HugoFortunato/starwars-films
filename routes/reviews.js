const express = require('express');
const router = express.Router();

const Review = require('../models/Review');

router.post('/reviews', async (req, res) => {
  const { filmId, userId, rating, comment, createdAt } = req.body;

  const reviews = new Review({ filmId, userId, rating, comment, createdAt });

  if (!reviews) {
    return res.status(400).json({ message: 'Review not added' });
  }

  await reviews.save();

  res.status(201).json({ message: 'Review added successfully' });
});

module.exports = router;

router.get('/reviews/top-rated', async (req, res) => {
  try {
    const topRatedFilms = await Review.aggregate([
      {
        $group: {
          _id: '$filmId',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
      { $sort: { averageRating: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'films',
          localField: '_id',
          foreignField: '_id',
          as: 'filmDetails',
        },
      },
      { $unwind: '$filmDetails' },
      {
        $project: {
          _id: 0,
          filmId: '$_id',
          averageRating: 1,
          totalReviews: 1,
          'filmDetails.title': 1,
          'filmDetails.releaseYear': 1,
        },
      },
    ]);

    res.status(200).json({ topRatedFilms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching top-rated films' });
  }
});
