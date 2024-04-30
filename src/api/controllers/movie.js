const Película = require("../models/movie")


const getMovies = async (req, res, next) => {
  try {
    const movies = await Película.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Película.findById(id);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postMovies = async (req, res, next) => {
  try {
    const newMovie = new Película(req.body);
    if (req.file) {
      newMovie.image = req.file.path;
    }
    const movieSaved = await newMovie.save();
    return res.status(201).json(movieSaved);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newMovie = new Película(req.body);
    newMovie._id = id;
    const movieUpdated = await Película.findByIdAndUpdate(id, newMovie, { new: true });
    return res.status(200).json(movieUpdated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDeleted = await Película.findByIdAndDelete(id);
    return res.status(200).json(movieDeleted);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getMovies, getMovieById, postMovies, updateMovie, deleteMovie };