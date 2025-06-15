const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  codeforcesHandle: { type: String, required: true, unique: true },
  currentRating: Number,
  maxRating: Number,
  lastSynced: Date,
  remindersSent: { type: Number, default: 0 },
  emailRemindersEnabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
