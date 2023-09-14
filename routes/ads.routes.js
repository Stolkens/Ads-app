const express = require('express');
const router = express.Router();
AdsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');

router.get('/ads', AdsController.getAll);

router.get('/ads/:id', AdsController.getAd);

router.post('/ads', authMiddleware, AdsController.addAd);

router.put('/ads/:id', authMiddleware, AdsController.updateAd);

router.delete('/ads/:id', authMiddleware, AdsController.deleteAd);

router.get('/ads/search/:searchPhrase', AdsController.searchAd)

module.exports = router;