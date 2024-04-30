const upload = require("../../middlewares/file");
const { isAdmin } = require("../../middlewares/isauth");
const { getMovies, getMovieById, postMovies, updateMovie, deleteMovie } = require("../controllers/movie");


const movieRouter = require("express").Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", [isAdmin], upload.single("image"), postMovies);
movieRouter.put("/:id", [isAdmin], updateMovie);
movieRouter.delete("/:id", [isAdmin], deleteMovie);

module.exports = movieRouter;