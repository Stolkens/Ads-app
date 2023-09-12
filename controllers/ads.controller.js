const Ad = require('../models/ad.model');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ad.find().populate("user");
   
    res.json(ads);
    }
  catch(err) {
    res.status(500).json({ message: err });
  }
};