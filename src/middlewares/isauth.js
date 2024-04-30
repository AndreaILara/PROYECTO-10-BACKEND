const User = require("../api/models/user");
const { verifyJwt } = require("../utils/jwt");


const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No has proporcionado el token" });
    }
    const parsedToken = token.replace("Bearer ", "");

    const { id } = verifyJwt(parsedToken);

    const user = await User.findById(id);
    user.password = null;
    req.user = user;
    next();
  } catch (error) {

    return res.status(400).json("No estás autorizado");
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "No has proporcionado el token" });
    }
    const parsedToken = token.replace("Bearer ", "").trim(); // Eliminar espacios en blanco
    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);
    if (!user || user.rol !== "admin") {
      return res.status(401).json({ message: "No estás autorizado como administrador" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "No estás autorizado" });
  }
};

module.exports = {
  isAuth,
  isAdmin,
};