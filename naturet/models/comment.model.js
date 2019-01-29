const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  experienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience'
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  likes: {
    type: String,
  },
  assessment: {
    type: String,
  }
 
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', schema);