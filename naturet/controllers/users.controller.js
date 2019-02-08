const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const Experience = require("../models/experience.model");



// First Create of user profile



module.exports.getHome = (req, res, next) => {
  Experience.find()
  .populate('user')
  .then(experiences => 
    res.render('users/index', {
          experiences
   } )
 )
  .catch(error => next(error))
}


module.exports.create = (req, res, next) => {
  res.render('users/create')
}

module.exports.doCreate = (req, res, next) => {

  const bodyFields = {
    birth: req.body.birth,
    about: req.body.about,
    country: req.body.country,
    phone: req.body.phone,
    categories: req.body.categories,
    pictures: req.files ? req.files.map(file => file.secure_url) : ''
  }


  const categories = typeof (req.body.categories) === 'string' ? [req.body.categories] : req.body.categories;

  if (!categories || categories.length <= 3) {
    res.render('users/create', {
      categories: categories,
      errors: {
        error: 'choose at least 4 categories'
      }
    })
  } else {

    User.findByIdAndUpdate(req.user.id, {
        $set: bodyFields
      }, {
        safe: true,
        upsert: true,
        new: true
      }).then(user => {

        if (!user) {
          next(createError(404, 'User not found'));
        } else {
          res.redirect('/profile')
        }
      })
      .catch(error => next(error));
  }
}


// Edition of user profile

module.exports.profile = (req, res, next) => {
  User.findById(req.user.id)
  .populate('experiences')
  .then(user => {

    res.render("users/profile", { user });
  })
  .catch(next);

}

module.exports.edit = (req, res, next) => {
  res.render('users/edit')
}

module.exports.doEdit = (req, res, next) => {

  const bodyFields = {
    birth: req.body.birth,
    about: req.body.about,
    country: req.body.country,
    phone: req.body.phone,
    categories: req.body.categories,
    pictures: req.files ? req.files.map(file => file.secure_url) : ''
  }

  const categories = typeof (req.body.categories) === 'string' ? [req.body.categories] : req.body.categories;

  if (!categories || categories.length <= 3) {
    res.render('users/edit', {
      categories: categories,
      errors: {
        error: 'choose at least 4 categories'
      }
    })
  } else {
    User.findByIdAndUpdate(req.user.id, {
        $set: bodyFields
      }, {
        safe: true,
        upsert: true,
        new: true
      })
      .populate('experience')
      .then(user => {
        if (!user) {
          next(createError(404, 'User not found'));
        } else {
          res.redirect('/profile')
        }
      })
      .catch(error => next(error));
  }
}


module.exports.list = (req, res, next) => {
  User.find({
      id: req.user.id
    })
    .populate("experience")
    .then(user => {

      res.render('users/list', {
        user: req.user
      });
    })
    .catch(error => next(error));
}


// Create of user creator profile

module.exports.creator = (req, res, next) => {
  res.render('users/creator/create')
}

module.exports.doCreator = (req, res, next) => {


  const bodyFields = {
    expertise: req.body.expertise,
    politic: req.body.politic,
    enterpriseDescription: req.body.enterpriseDescription,
    enterpriseEmail: req.body.enterpriseEmail,
    acreditation: req.body.acreditation,
    creator: true,
    enterprise_picture: req.file ? req.file.secure_url : ''
  }
  const enterpriseDescription = req.body.enterpriseDescription;
  const expertise = req.body.expertise;
  const enterpriseEmail = req.body.enterpriseEmail;
  const acreditation = req.body.acreditation;

  const politics = typeof (req.body.politic) === 'string' ? [req.body.politic] : req.body.politic;


  if (!expertise || !politics || !enterpriseEmail || !acreditation) {
    res.render('users/creator/create', {
      enterpriseDescription,
      acreditation,
      enterpriseEmail,
      expertise,
      politics: politics,
      errors: {
        expertise: expertise ? undefined : 'Select one expertise field',
        politic: politics ? undefined : 'Select one privacy politic field',
        enterpriseEmail: enterpriseEmail ? undefined : 'Enterprise email is required',
        acreditation: acreditation ? undefined : 'Write something in your acreditation field'
      }
    });
  } else {

    User.findByIdAndUpdate(req.user.id, {
        $set: bodyFields
      }, {
        safe: true,
        upsert: true,
        new: true
      }).then(user => {
        if (!user) {
          next(createError(404, 'User not found'));
        } else {
          res.redirect('/profile')
        }
      })
      .catch(error => next(error));
  }
}

// Edit os user creator profile

module.exports.editCreator = (req, res, next) => {
  res.render('users/creator/edit')
}

module.exports.doEditCreator = (req, res, next) => {

  const bodyFields = {
    expertise: req.body.expertise,
    politic: req.body.politic,
    enterpriseDescription: req.body.enterpriseDescription,
    enterpriseEmail: req.body.enterpriseEmail,
    acreditation: req.body.acreditation,
    creator: true,
    enterprise_picture: req.file ? req.file.secure_url : ''
  }
  const enterpriseDescription = req.body.enterpriseDescription;
  const expertise = req.body.expertise;
  const enterpriseEmail = req.body.enterpriseEmail;
  const acreditation = req.body.acreditation;

  const politics = typeof (req.body.politic) === 'string' ? [req.body.politic] : req.body.politic;


  if (!expertise || !politics || !enterpriseEmail || !acreditation) {
    res.render('users/creator/edit', {
      enterpriseDescription,
      acreditation,
      enterpriseEmail,
      expertise,
      politics: politics,
      errors: {
        expertise: expertise ? undefined : 'Select one expertise field',
        politic: politics ? undefined : 'Select one privacy politic field',
        enterpriseEmail: enterpriseEmail ? undefined : 'Enterprise email is required',
        acreditation: acreditation ? undefined : 'Write something in your acreditation field'
      }
    });
  } else {

    User.findByIdAndUpdate(req.user.id, {
        $set: bodyFields
      }, {
        safe: true,
        upsert: true,
        new: true
      }).then(user => {
        if (!user) {
          next(createError(404, 'User not found'));
        } else {
          res.redirect('/profile')
        }
      })
      .catch(error => next(error));
  }
}



module.exports.get = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'));
      } else {
        res.render('users/detail', {
          user
        });
      }
    })
    .catch(error => next(error));
}


module.exports.doDelete = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'));
      } else {
        res.redirect('users/categories');
      }
    })
    .catch(error => next(error));
}