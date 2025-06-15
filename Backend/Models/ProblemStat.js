const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const problemStatSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  problemId: String,
  name: String,
  rating: Number,
  tags: [String],
  solvedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('ProblemStat', problemStatSchema);
