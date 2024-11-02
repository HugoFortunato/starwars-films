const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  trailer_url: String,
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
