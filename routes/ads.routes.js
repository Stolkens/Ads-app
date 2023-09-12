const express = require('express');
const router = express.Router();
AdsController = require('../controllers/ads.controller');

router.get('/ads', AdsController.getAll);

// router.get('/ads/:id', AdsController.getAd);

// router.post('/ads', AdsController.addAd);

// router.put('/ads/:id', AdsController.updateAd);

// router.delete('/ads/:id', AdsController.deleteAd);

module.exports = router;