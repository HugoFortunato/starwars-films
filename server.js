const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const filmRoutes = require('./routes/film');
const reviewRoutes = require('./routes/reviews');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', filmRoutes);
app.use('/api', filmRoutes);
app.use('/api', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
