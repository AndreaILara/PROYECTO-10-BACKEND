const mongoose = require('mongoose');
const Película = require('../api/models/movie');
require('dotenv').config();

const removeAllMovies = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    const result = await Película.deleteMany({});
    console.log(`${result.deletedCount} películas eliminadas de la base de datos`);
    await mongoose.disconnect();

  } catch (error) {
    console.error('Error al eliminar las películas', error.message);
  }
}

removeAllMovies();