const mongoose = require('mongoose');
const categoriesExp = require('../data/categories');

const experienceSchema = new mongoose.Schema({
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User'
 },
 name: {
   type: String,
  //  required: true,
 },
 categories: {
   type: [String],
   enum: categoriesExp.map((c) => c.id),
   default: [],
   // required: true,
 },
 description: {
   type: String,
   // required: true,
 },
 anymore: {
   type: String,
 },
 location: {
   type: { type: String, default: "LineString" },
   coordinates: [[Number]]
 },
 price: {
   type: String,
   min: 0,
 },
 photos: {
  type: [String],
  default: []
},
 languages: {
   type: [String],
   enum:["Español", "Inglés", "Francés", "Alemán", "Chino"],
   // required: true,
 },
 duration: {
   type: Number,
   min: 0,
 },
 includes: {
   type: [String],
   enum: ["Bebidas", "Comida", "Aperitivo", "Equipo"]
 }

}, {
 timestamps: true
});

experienceSchema.index({ location: '2dsphere' });

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;