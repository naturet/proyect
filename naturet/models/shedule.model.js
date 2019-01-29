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
}, {
  timestamps: true
});

module.exports = mongoose.model('Schedule', schema);