const jwt = require('jsonwebtoken');


const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '60d' });
}

const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  generateSign,
  verifyJwt
}