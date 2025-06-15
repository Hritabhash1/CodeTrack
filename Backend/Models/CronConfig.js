const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cronConfigSchema = new Schema({
  frequency: { type: String, default: 'daily' }, 
  time: { type: String, default: '02:00' }, 
  timezone: { type: String, default: 'Asia/Kolkata' },
  lastRunAt: Date,
  nextRunAt: Date
}, { timestamps: true });

module.exports = mongoose.model('CronConfig', cronConfigSchema);
