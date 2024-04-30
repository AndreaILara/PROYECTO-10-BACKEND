const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userName: { type: 'string', required: true },
    password: { type: 'string', trim: true, required: true },
    rol: { type: 'string', required: true, enum: ['admin', 'user'], default: 'user' },
    favorites: [{ type: mongoose.Types.ObjectId, required: false, ref: "películas" }]
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;