const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

const app = express();

const adsRoutes = require('./routes/ads.routes');
// const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api', adsRoutes);
// app.use('/api', usersRoutes);
app.use('/auth', authRoutes);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

mongoose.connect('mongodb://127.0.0.1:27017/AdsAppDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', (err) => console.log('Error ' + err));


module.exports = server;