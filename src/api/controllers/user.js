const { json } = require("express");
const { generateSign } = require("../../utils/jwt");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("favorites")
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("favorites");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ userName: req.body.userName });
    if (userDuplicated) {
      return res.status(400).json({ message: "Ese nombre de usuario ya existe" });
    }
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: "user"
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ token, user });
    }
    return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user._id.toString() !== id) {
      return res.status(400).json({ message: "No tienes permisos para editar este usuario" });
    }
    const oldUser = await User.findById(id);

    const { rol } = req.body;
    if (rol && req.user.rol === 'admin') {
      oldUser.rol = rol;
    }


    const newUser = new User(req.body);
    newUser._id = id;
    newUser.favorites = [...oldUser.favorites, ...newUser.favorites];
    const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true });
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const removeFromFavorites = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorites } = req.body;

    if (req.user._id.toString() !== id) {
      return res.status(400).json("No tienes permisos para editar este usuario")
    }
    if (!favorites) {
      return res.status(400).json({ message: "Debes proporcionar el id de la película que deseas eliminar de tu lista" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });

    }
    const updatedFavorites = user.favorites.filter(favorites => favorites.toString() !== favorites.toString());
    const result = await User.updateOne({ _id: id }, { $set: { favorites: updatedFavorites } });
    console.log(result);
    if (result.matchedCount > 0) {
      return res.status(200).json("Película eliminada de tus favoritos");
    } else {
      return res.status(400).json({ message: "Película no encontrada" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = { getUsers, getUserById, register, login, updateUser, removeFromFavorites };