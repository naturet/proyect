const passport = require('passport');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  res.render('sessions/create')
}
module.exports.doEdit = (req, res, next) => {
  console.log('llego aqui');
  
  User.findByIdAndUpdate(req.params.id,
    {$push: {categories: req.body.categories}},
    {safe: true, upsert: true})
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'));
      } else {
        res.redirect('/users');
      }
    })
    .catch(error => next(error));
}


module.exports.createWithIDPCallback = (req, res, next) => {
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.render('sessions/categories')
        }
      })
    }
  })(req, res, next);
}

module.exports.profile = (req, res, next) => {
  res.render('sessions/home')
}