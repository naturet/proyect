const constants = require('../constants');
const mongoose = require('mongoose');
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;
const SECOND_ADMIN_EMAIL = process.env.SECOND_ADMIN_EMAIL;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  social: {
    googleId: String,
  },
  address: {
    type: String
  },
  photo: {
    path: String
  },
  categories: {
    type: Array,
  },
  role: {
    type: String,
    enum: [constants.ROLE_ADMIN, constants.ROLE_GUEST],
    default: constants.ROLE_GUEST
  }
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

// userSchema.pre('save', function(next) {
//   if (this.email === FIRST_ADMIN_EMAIL || SECOND_ADMIN_EMAIL) {
//     this.role = constants.ROLE_ADMIN;
//   } else {
//     next();
//   }
// });

const User = mongoose.model('User', userSchema);
module.exports = User;

