const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
    required: true,
  },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  price: {
    type: String,
  },
  photo: {
    path: String,
  },
  languages: {
    type: String,
  }
 
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', schema);