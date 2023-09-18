const Ad = require('../models/ad.model');
const User = require('../models/user.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate('user');
    if (!ads) res.status(404).json({ message: 'Not found' });
    res.json(ads);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAd = async (req, res) => {

  try {
    const ads = await Ad.findById(req.params.id).populate('user');
    if (!ads) res.status(404).json({ message: 'Not found' });
    else res.json(ads);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.addAd = async (req, res) => {

  try {
    const { title, description, dateOfPub, price, location } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';


    if (title &&
      typeof title === 'string' &&
      description &&
      typeof description === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
      dateOfPub &&
      typeof dateOfPub === 'string' &&
      location &&
      typeof location === 'string' &&
      price &&
      typeof price === 'string'
    ) {
      const newAd = new Ad(
        {
          title: title,
          description: description,
          dateOfPub: dateOfPub,
          image: req.file.filename,
          price: price,
          location: location,
          user: req.session.user.userId
        });
      await newAd.save();
      res.json({ message: 'OK' });
    } else {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      res.status(400).json({ message: 'Bad request' });
    }


  } catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.updateAd = async (req, res) => {


  try {
    const { title, description, dateOfPub, price, location } = req.body;
    const ad = await Ad.findById(req.params.id);

    if (ad.user === req.session.user.userId) {
      if (title &&
        typeof title === 'string' &&
        description &&
        typeof description === 'string' &&
        dateOfPub &&
        typeof dateOfPub === 'string' &&
        location &&
        typeof location === 'string' &&
        price &&
        typeof price === 'string'
      ) {
        if (req.file)  {
          const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
          if (['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
            await Ad.updateOne({ _id: req.params.id }, {
              $set:
              {
                title: title,
                description: description,
                dateOfPub: dateOfPub,
                image: req.file.filename,
                price: price,
                location: location,
              }
            });
            fs.unlinkSync(`./public/uploads/${ad.image}`);
            res.json({ message: 'OK' });
          } 
          else res.status(404).json({ message: 'Not found...' }); 
          
        }
        else {
          if (ad) {
            const updatedAd = {
              title,
              description,
              dateOfPub,
              location,
              price,
            };
          
            const updatedAdDocument = await Ad.findByIdAndUpdate(
              req.params.id,
              updatedAd,
              { new: true }
            );
            res.status(200).json(updatedAdDocument);
          } 
          else res.status(404).json({ message: 'Not found...' }); 
        }
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    else res.json({ message: 'You are not authorized' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      await Ad.deleteOne({ _id: req.params.id });
      fs.unlinkSync(`./public/uploads/${ad.image}`);
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.searchAd = async (req, res) => {
  try {
    const ad = await Ad.find({ title: { $regex: `(?i)${req.params.searchPhrase}(?-i)` } });
    if (ad) {
      res.json(ad);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};