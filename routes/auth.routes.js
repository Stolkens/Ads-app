const express = require('express');
const router = express.Router();

AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.register);

// router.post('/login', AuthController.login);

// router.get('/user', AuthController.getLoggedUser);

module.exports = router;