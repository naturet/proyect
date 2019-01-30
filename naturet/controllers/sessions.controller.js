const passport = require('passport');

module.exports.create = (req, res, next) => {
  res.render('sessions/create');
}

module.exports.doCreate = (req, res, next) => {

  function renderWithErrors(errors) {
    res.render('sessions/create', {
      user: req.body,
      errors: errors
    })
  }

    let { email, password } = req.body;

    if(!email || !password){
      renderWithErrors({
        email: email ? undefined : 'Email is required',
        password: password ? undefined :  'Password is required'
      });
    } else {
      passport.authenticate('local-auth', (error, user, validation) => {
        if (error){
          next(error)
        } else if (!user) {
            renderWithErrors(validation);
        } else {
            req.login(user, (error) => {
              if (error){
                next(error)
              } else {
                  res.redirect('users/categories')
              }
            });
        }
      })(req, res, next);
    }
}

module.exports.delete = (req, res, next) => {
  req.logout()
  res.redirect('/sessions/create')
}

module.exports.createWithIDPCallback = (req, res, next) => {
  passport.authenticate (`${req.params.provider}-auth`, (errors, user) => {
    if (errors) {
      next(errors);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.redirect('users/categories')
        }
      })
    }
  })(req, res, next);
}
