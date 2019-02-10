const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User'
 },
 experience: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'Experience'
 },
 message: {
   type: String,
   required: true,
   required: 'Comment is required'
 },
 date : {
   type:Date, 
   default: Date.now
 },
 owner: {
   type: Object,
 }
}, {
 timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);