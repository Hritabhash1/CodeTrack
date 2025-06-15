const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contestSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  contestName: { type: String, required: true },
  contestId: { type: String, required: true }, 
  rank: { type: Number, required: true },
  ratingChange: Number,
  oldRating: Number,
  newRating: Number,
  date: { type: Date, required: true },
  problemsUnsolved: Number
}, { timestamps: true });

module.exports = mongoose.model('Contest', contestSchema);
