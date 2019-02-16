const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { // req.isAuthenticated lo da passport de manera que si se cumple, es decir si es true, pasará al siguiente middleware, haciendo que solo sea posible la ruta del rouert.js si se cumple esta condicion
    next()
  } else {
    res.status(401)
      .redirect('/sessions/create');
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
    res.status(401)
    next();
  }
}

module.exports.isCreator = (req, res, next) => {
  if (req.user.creator) {
    res.redirect('/creator/edit');
  } else {
    res.status(401)
    next();
  }
}

module.exports.userIsCreator = (req, res, next) => {
  if (req.user.creator) {
    next();
    res.status(401)
  } else {
    res.redirect('/profile');
  }
}


module.exports.isProfileCompleted = (req, res, next) => {
  if (req.user.categories && req.user.categories.length > 3) {
    next();
  } else {
    res.redirect('/profile/create');
  }
}

module.exports.isProfileUncompleted = (req, res, next) => {
  if (req.user.categories && req.user.categories.length > 3) {
    res.redirect('/profile/edit');
  } else {
    next();
  }
}

module.exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      next();
    } else {
      next(createError(403, 'Insufficient privileges'))
    }
  }
}