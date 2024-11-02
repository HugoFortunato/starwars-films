const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const filmRoutes = require('./routes/film');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/film', filmRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
