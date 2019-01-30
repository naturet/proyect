const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');


module.exports.edit = (req, res, next) => {
  User.findById(req.params.id)
    .then( user => res.render('users/categories'))
}

// module.exports.profile = (req, res, next) => {
//   User.findById(req.params.id)
//     .then( user => res.render('users/profile', { user }))
    
// }

module.exports.doEdit = (req, res, next) => {
  const { categories } = req.body;
  let finalCategories = categories;

  if (typeof finalCategories === 'string') {
    finalCategories = [finalCategories];
  } 
  
  if (finalCategories === undefined || finalCategories.length < 3  ) {
    res.render('users/categories', {
      finalCategories,
      errors: { error: 'at least 3 categories' }
    })
  } else {

    User.findByIdAndUpdate(req.params.id,
      {$push: {categories: req.body.categories}},
      {safe: true, upsert: true})
      .then(user => {
        if (!user ) {
          next(createError(404, 'User not found'));
        } else {
          res.redirect('/users/profile');
        }
      })
      .catch(error => next(error));   
  }
  }


module.exports.list = (req, res, next) => {
  User.find({id: req.user.id})
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
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        res.render('users/create', {
          user: req.body,
          errors: { email: 'Email already registered' }
        });
      } else {
        user = new User (req.body);
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