const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { // req.isAuthenticated lo da passport de manera que si se cumple, es decir si es true, pasará al siguiente middleware, haciendo que solo sea posible la ruta del rouert.js si se cumple esta condicion
    next()
  } else {
    res.status(401)
      .redirect('/sessions/create');
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
