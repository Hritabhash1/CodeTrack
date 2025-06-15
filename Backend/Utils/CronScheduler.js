const cron = require('node-cron');
const { syncStudentData } = require('../Services/CronJob');

// Runs every day at 2 AM
cron.schedule('0 2 * * *', () => {
  console.log('Running daily cron at 2 AM');
  syncStudentData();
});
