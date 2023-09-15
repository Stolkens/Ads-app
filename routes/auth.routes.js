const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

AuthController = require('../controllers/auth.controller');

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/user', authMiddleware, AuthController.getUser);

module.exports = router;