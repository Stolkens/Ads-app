const mongoose = require('mongoose');

const adScheme = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  dateOfPub: { type: String, required: true },
  user: { type: String, required: true, ref: 'User' },
});

module.exports = mongoose.model('Ad', adScheme);