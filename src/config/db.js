const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Conectado a la base de datos 💘');
  } catch (error) {
    console.log("Error de conexión con la base de datos 💥");
  }
}

module.exports = { connectDB };