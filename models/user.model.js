const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  login: { type: String, required: true },
  avatar: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('User', userScheme);