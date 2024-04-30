const { isAuth } = require("../../middlewares/isauth");
const { getUsers, getUserById, register, login, updateUser, removeFromFavorites } = require("../controllers/user");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUserById);

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.put("/:id", [isAuth], updateUser);

usersRouter.post("/remove/:id", [isAuth], removeFromFavorites);

module.exports = usersRouter;