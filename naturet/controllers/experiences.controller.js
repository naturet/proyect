const createError = require('http-errors');
const mongoose = require('mongoose');
const Experience = require('../models/experience.model');
const passport = require('passport');


module.exports.experience = (req, res, next) => {
  res.render('experiences/form')
}

