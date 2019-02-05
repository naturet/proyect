const createError = require('http-errors');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');


module.exports.profile = (req, res, next) => {
  res.render('users/profile')
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
    creator: true,
    logo: req.file ? req.file.url : ''
  }

  const categories = typeof(req.body.categories) === 'string' ? [req.body.categories] : req.body.categories;

  if (!categories || categories.length <= 3) {
    console.log(categories);
    res.render('users/create', {
      categories: categories,
      errors: {
        error: 'choose at least 4 categories'
      }
    })
  } else {
    if (req.body.creator === undefined) {
      req.body.creator = false;
    }

    User.findByIdAndUpdate(req.user.id, 
      { $set : bodyFields },
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
          console.log(req.body)
        }
      })
      .catch(error => next(error));
  }
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
    creator: req.body.creator,
    pictures: req.files ? req.files.map(file => file.secure_url) : ''
  }

  const categories = typeof(req.body.categories) === 'string' ? [req.body.categories] : req.body.categories;

  if (!categories || categories.length <= 3) {
    console.log(categories);
    res.render('users/edit', {
      categories: categories,
      errors: {
        error: 'choose at least 4 categories'
      }
    })
  } else {
    if (req.body.creator === undefined) {
      req.body.creator = false;
    }

    User.findByIdAndUpdate(req.user.id, 
      { $set : bodyFields },
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
          console.log(req.body)
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

module.exports.creator = (req, res, next) => {
  res.render('users/creator') 
}

module.exports.doCreator = (req, res, next) => {

  const bodyFields = {
    birth: req.body.birth,
    about: req.body.about,
    country: req.body.country,
    phone: req.body.phone,
    categories: req.body.categories,
    creator: req.body.creator,
    pictures: req.files ? req.files.map(file => file.secure_url) : ''
  }

  const categories = typeof(req.body.categories) === 'string' ? [req.body.categories] : req.body.categories;

  if (!categories || categories.length <= 3) {
    console.log(categories);
    res.render('users/create', {
      categories: categories,
      errors: {
        error: 'choose at least 4 categories'
      }
    })
  } else {
    if (req.body.creator === undefined) {
      req.body.creator = false;
    }

    User.findByIdAndUpdate(req.user.id, 
      { $set : bodyFields },
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
          console.log(req.body)
        }
      })
      .catch(error => next(error));
  }
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