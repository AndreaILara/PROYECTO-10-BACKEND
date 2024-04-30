const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  image: { type: 'string', required: true },
  director: { type: 'string', required: true },
  title: { type: 'string', required: true },
  price: { type: 'number', required: true },
  category: { type: 'string', required: true, enum: ["Anime", "Clásico", "Comedia", "Drama", "Terror"] }
},
  {
    timestamps: true,
    collection: 'películas',
  }
);

const Película = mongoose.model('películas', peliculaSchema, 'películas');

module.exports = Película;
