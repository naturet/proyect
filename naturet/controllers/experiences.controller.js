const createError = require("http-errors");
const mongoose = require("mongoose");
const Experience = require("../models/experience.model");
const User = require("../models/user.model");
const passport = require("passport");


// module.exports.list = (req, res, next) => {
//   User.findById(req.user.id)
//     .populate('experiences')
//     .then(user => {
//       console.log(user);
//       res.render("users/profile", { user });
//     })
//     .catch(next);
// }

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
    location : {
      type: "LineString",
      coordinates: req.body.path  
    }
  };
  


  const experience = new Experience(experienceData);
  experience.user = req.user._id;
  return experience
    .save()
    .then(experience => {
      res.redirect("/profile");
    })
    .catch(error => next(error));
};

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  Experience.findById(id)
    .populate("user")
    .then(experience => {
      if (experience) {
        res.render("experiences/form", {
          experience,
          pointsJSON: encodeURIComponent(
            JSON.stringify(experience.location.coordinates)
          )
        });
      } else {
        next(createError(404, `Experience with id ${id} not found`));
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.CastError) {
        next(createError(404, `Experience with id ${id} not found`));
      } else {
        next(error);
      }
    });
};


module.exports.doEdit = (req, res, next) => {
  if (req.body.path) {
    req.body.path = req.body.path.map(x => x.split(",").map(n => Number(n)));
  }

  const id = req.params.id;
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
    location: {
      type: "LineString",
      coordinates: req.body.path
    }
  };

  Experience.findByIdAndUpdate(id, {
      $set: experienceData
    }, {
      new: true
    })
    .then(experience => {
      return User.findByIdAndUpdate(req.user.id, {
        $addToSet: {
          experiences: [experience.id]
        }
      }).then(() => res.redirect("/profile/"));
    })
    .catch(error => next(error));
};