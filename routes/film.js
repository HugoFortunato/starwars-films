const express = require('express');
const router = express.Router();

const { Readable } = require('stream');
const Film = require('../models/Film');

router.get('/films', async (req, res) => {
  try {
    const films = await Film.find({});

    if (!films) {
      return res.status(400).json({ message: 'The films were not found' });
    }

    // const filmStream = new Readable({
    //   async read() {
    //     for (const film of films) {
    //       this.push(JSON.stringify(film) + '\n');
    //     }
    //     this.push(null);
    //   },
    // });
    // filmStream.pipe(res);

    res.setHeader('Content-Type', 'application/json');

    return res.status(200).json(films);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error listing films' });
  }
});

router.post('/add', async (req, res) => {
  const { title, description, image, trailer_url } = req.body;

  const films = new Film({ title, description, image, trailer_url });

  if (!films) {
    return res.status(400).json({ message: 'Filme não adicionado' });
  }

  await films.save();

  res.status(201).json({ message: 'Filme adicionado com sucesso' });
});

module.exports = router;
