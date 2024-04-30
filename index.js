require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/config/db');
const usersRouter = require('./src/api/routes/user');
const movieRouter = require('./src/api/routes/movie');
const cloudinary = require('cloudinary').v2;

const app = express();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
app.use(cors());

app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/movies", movieRouter);

app.use('*', (req, res, next) => {
  return res.status(404).json("Ruta no encontrada");
})

app.listen(3000, () => {
  console.log("Servidor activo en http://localhost:3000");
})