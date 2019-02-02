const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');


module.exports.profile = (req, res, next) => {
  res.render('users/profile')
}

// module.exports.profile = (req, res, next) => {
//   User.findById(req.params.id)
//     .then( user => res.render('users/profile', { user }))

// }

module.exports.doProfile = (req, res, next) => {
  console.log(req.body)

  const categories = typeof(req.body.categories) === 'string' ? [req.body.categories] : req.body.categories;

  if (!categories || categories.length <= 3) {
    console.log(categories);
    res.render('users/profile', {
      categories: categories,
      errors: {
        error: 'at least 3 categories'
      }
    })
  } else {
    if (req.body.creator === undefined) {
      req.body.creator = false;
    }

    User.findByIdAndUpdate(req.user.id, 
      { $set : req.body },
      {
        safe: true,
        upsert: true,
        new: true
      }).then(user => {
        console.log(user)
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
    .then(user => {

      res.render('users/list', {
        user: req.user
      });
    })
    .catch(error => next(error));
}


module.exports.create = (req, res, next) => {
  res.render('users/create');
}

module.exports.doCreate = (req, res, next) => {
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        res.render('users/create', {
          user: req.body,
          errors: {
            email: 'Email already registered'
          }
        });
      } else {
        user = new User(req.body);
        return user.save()
          .then(user => {
            res.redirect('/sessions/create');
          });
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('users/create', {
          user: req.body,
          errors: error.errors
        });
      } else {
        next(error);
      }
    })
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