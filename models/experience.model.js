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
   type: Number,
   min: 0,
 },
 photos: {
  type: [String],
  // default: ['https://res.cloudinary.com/dwta0wgpp/image/upload/v1549223454/test/background-intro.jpg.jpg']
},
 languages: {
   type: [String],
   enum:["Spanish", "English","French","German","Chinese"]
   // required: true,
 },
 duration: {
   type: Number,
   min: 0,
 },
 includes: {
   type: [String],
   enum: ["Drinks", "Food", "Snack", "Equipment"]
 },
 rating: {
   type: Number,
 }
}, {
 timestamps: true,
 toObject: {
  virtuals: true
} 
});

experienceSchema.virtual('comments', {
  ref: 'Comment', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'experience', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
  options: { sort: { createdAt: -1 } } // Query options, see http://bit.ly/mongoose-query-options
 });

experienceSchema.index({ location: '2dsphere' });

const Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;