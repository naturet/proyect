const createError = require("http-errors");
const mongoose = require("mongoose");
const Experience = require("../models/experience.model");
const User = require("../models/user.model");
const passport = require("passport");

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Experience.findById(id)
    .populate('user')
    .then(experience => {
      res.render('experiences/detail', {
        experience,
        pointsJSON: encodeURIComponent(JSON.stringify(experience.location.coordinates))
      })
    })
    .catch(err => next(err));
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Experience.findByIdAndDelete(id)
    .populate("user")
    .then(experience => res.redirect('/profile'))
    .catch(err => next(err));
}

module.exports.create = (req, res, next) => {
  res.render("experiences/form");
};

module.exports.doCreate = (req, res, next) => {

  if (req.body.path) {
    req.body.path = req.body.path.map(x => x.split(",").map(n => Number(n)));
  } else {
    res.render('experiences/form')
  }

  const experienceData = {
    name: req.body.name,
    description: req.body.description,
    anymore: req.body.anymore,
    price: req.body.price,
    photo: req.body.photo,
    categories: req.body.categories,
    languages: req.body.languages,
    duration: req.body.duration,
    includes: req.body.includes,
    photos: req.files ? req.files.map(file => file.secure_url) : '',
    location : {
      type: "LineString",
      coordinates: req.body.path  
    }
  };


  const categories = typeof (req.body.categories) === 'string' ? [req.body.categories] : req.body.categories;
  
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  if ( !categories || categories.length <= 3 || !name || !price || !description)  {
    if(!categories || categories.length <= 3){
      res.render('experiences/form', {
        name,
        categories: categories,
        price,
        description,
        errors: {
          categories: 'choose at least 4 categories',
          name: name ? undefined : 'Select one name for your experience',
          description: description ? undefined : 'Add some awesome description to your experience',
          price: price ? undefined : 'Select some price to your experience from 0 to your choice',
        }
      });
    } else {
      res.render('experiences/form', {
        name,
        categories: categories,
        price,
        description,
        errors: {
          name: name ? undefined : 'Select one name for your experience',
          description: description ? undefined : 'Add some awesome description to your experience',
          price: price ? undefined : 'Select some price to your experience from 0 to your choice',
        }
      });
    }
 
  } else {
  
  const experience = new Experience(experienceData);
  experience.user = req.user._id;
  return experience
    .save()
    .then(experience => {
      res.redirect("/profile");
    })
    .catch(error => next(error));
}
};
