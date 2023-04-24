const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  saldo: {
    type: Number,
    required: true,
    default: 0
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
