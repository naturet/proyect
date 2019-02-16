const User = require('../models/user.model');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FBStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
  .populate('experiences')
  .populate('following')
    .then(user => {
      next(null, user);
    })
    .catch(error => next(error));
});



passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID || 'todo',
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || 'todo',
  callbackURL: process.env.GOOGLE_AUTH_CB || '/sessions/google/cb',
  profileFields: ["birthday", "email", "first_name", "last_name"]
}, authenticateOAuthUser));

passport.use('facebook-auth', new FBStrategy({
  clientID: process.env.FB_AUTH_CLIENT_ID || 'todo',
  clientSecret: process.env.FB_AUTH_CLIENT_SECRET || 'todo',
  callbackURL: process.env.FB_AUTH_CB || '/sessions/facebook/cb',
  profileFields: ['displayName', 'emails', 'picture']
}, authenticateOAuthUser));

function authenticateOAuthUser(accessToken, refreshToken, profile, next) {

  let socialID = `${profile.provider}Id`;  // Esto proporciona un provider para llegar a dentro de social ( que es un valor del modelo usuario ), que suma al nombre del provider (google o facebook) el string 'Id'
   User.findOne( { [`social.${socialID}`] : profile.id } ) // checkea si el profile id que da google o facebook coincide con el valor de google o facebook en social.
   .populate('experiences') 
   .then(user => {
      if (user){
        next(null, user);
      } else {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value,
          birth: profile.birthday,
          password: Math.random().toString(36).substring(7),
          social:{
            [socialID] : profile.id // para meter una clave de un objeto de una variable, se mete dentro de corchetes.
          }
        })
        return user.save()
          .then(user => {
            next(null, user);
          });
      }
      
    })
    .catch(error => next(error));
}



