const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  codeforcesHandle: String,
  currentRating: Number,
  maxRating: Number,
  contests: Array,
  problems: Array,
  lastSynced: Date,
  remindersSent: {
    type: Number,
    default: 0,
  },
  emailRemindersEnabled: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('Student', studentSchema);
