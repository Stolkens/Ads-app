const Ad = require('../models/ad.model');
// const User = require('../models/user.model');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate("userId");
    if(!ads) res.status(404).json({ message: 'Not found' });
    res.json(ads);
    }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getAd = async (req, res) => {

  try {
    const ads = await Ad.findById(req.params.id);
    if(!ads) res.status(404).json({ message: 'Not found' });
    else res.json(ads);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.addAd = async (req, res) => {

  try {
    const { title, description, dateOfPub, image, price, location, userId } = req.body;
    const newAd = new Ad(
      { 
        title: title,
        description: description, 
        dateOfPub: dateOfPub, 
        image: image, 
        price: price, 
        location: location, 
        userId: userId 
      });
    await newAd.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.updateAd = async (req, res) => {
  
  
  try {
    const { title, description, dateOfPub, image, price, location, userId } = req.body;
    const dep = await Ad.findById(req.params.id);
    if(dep) {
      await Ad.updateOne({ _id: req.params.id }, { $set: { title: title, description: description, dateOfPub: dateOfPub, image: image, price: price, location: location, userId: userId }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteAd = async (req, res) => {
  try {
    const dep = await Ad.findById(req.params.id);
    if(dep) {
      await Ad.deleteOne({  _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.searchAd = async (req, res) => {
  try {
    const ad = await Ad.find({title: {$regex: `(?i)${req.params.searchPhrase}(?-i)`}});
    if(ad) {
      res.json(ad);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};