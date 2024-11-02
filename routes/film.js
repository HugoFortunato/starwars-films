const express = require('express');
const router = express.Router();

const Film = require('../models/Film');

router.post('/add', async (req, res) => {
  const { title, description, image, trailer_url } = req.body;

  const film = new Film({ title, description, image, trailer_url });

  if (!film) {
    return res.status(400).json({ message: 'Filme não adicionado' });
  }

  await film.save();

  res.status(201).json({ message: 'Filme adicionado com sucesso' });
});

module.exports = router;
