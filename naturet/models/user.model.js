
const constants = require('../constants');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const categories = require('../data/categories');
const politics = require('../data/politics')
const SALT_WORK_FACTOR = 10;
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  social: {
    googleId: String,
    facebookId: String
  },
  birth: {
    type: String
  },
  about: {
    type: String
  },
  country: {
    type: String
  },
  phone: {
    type: String
  },
  pictures: {
    type: [String],
    default: []
  },
  photo: {
    type: String
  },
  categories: {
    type: [String],
    enum: categories.map((c) => c.id),
    default: []
  },
  creator: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: [constants.ROLE_ADMIN, constants.ROLE_GUEST],
    default: constants.ROLE_GUEST
  },
  expertise: {
    type: String
  },
  politic: {
    type: String,
    enum: politics.map((c) => c.name),
    default: []
  },
  enterpriseDescription: {
    type: String,
  },
  enterpriseEmail: {
    type: String
  },
  acreditation: {
    type: String
  },
  enterprise_picture: {
    type: String
  }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if (this.email === FIRST_ADMIN_EMAIL) {
    this.role = constants.ROLE_ADMIN;
  }

  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(this.password, salt)
      })
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
