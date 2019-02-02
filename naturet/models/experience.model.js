const mongoose = require('mongoose');
const categories = require('../data/categories');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: [String],
    enum: categories.map((c) => c.id),
    default: [],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  anymore: {
    type: String,
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
    type: [String],
    default:["Español", "Inglés", "Francés", "Alemán", "Chino"],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  includes: {
    type: String,
    enum: ["Bebidas", "Comida", "Aperitivo", "Equipo"]
  }
 
}, {
  timestamps: true
});

module.exports = mongoose.model('Experience', schema);