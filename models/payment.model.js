const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience'
  },
  pay: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Payments', paymentSchema);