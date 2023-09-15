const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/AdsAppDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', (err) => console.log('Error ' + err));

if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'xyz567',
  cookie: {
    secure: process.env.NODE_ENV == 'production',
  },
  store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false
}));

app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

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


module.exports = server;