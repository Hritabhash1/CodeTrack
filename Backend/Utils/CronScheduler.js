const cron = require('node-cron');
const CronConfig = require('../Models/CronConfig');
const { fetchAndStoreCFData } = require('./CodeforcesApi');

let currentTask = null;

const scheduleCronJob = async () => {
  try {
    const config = await CronConfig.findOne();

    if (!config) {
      console.warn('No cron config found. Using default schedule: 2 AM daily');
      return;
    }

    const { frequency, time = '02:00', timezone = 'Asia/Kolkata' } = config;
    const [hour, minute] = time.split(':').map(Number);

    let cronExpression;

    switch (frequency) {
      case 'hourly':
        cronExpression = `${minute} * * * *`; 
        break;
      case 'daily':
        cronExpression = `${minute} ${hour} * * *`;
        break;
      case 'weekly':
        cronExpression = `${minute} ${hour} * * 0`; // Sunday
        break;
      default:
        cronExpression = '0 2 * * *';
        console.warn(`Unsupported frequency "${frequency}", defaulting to 2 AM daily`);
    }

    if (currentTask) {
      currentTask.stop();
      console.log('Previous cron task stopped');
    }

    currentTask = cron.schedule(
      cronExpression,
      async () => {
        console.log(' Cron triggered at', new Date().toLocaleString('en-IN', { timeZone: timezone }));
        try {
          await fetchAndStoreCFData();
          await CronConfig.updateOne({}, { $set: { lastRunAt: new Date() } });
          console.log(' Cron sync complete');
        } catch (err) {
          console.error(' Cron job failed:', err.message);
        }
      },
      { timezone }
    );

    console.log(` Scheduled cron job with expression "${cronExpression}" (${frequency}) in timezone "${timezone}"`);
  } catch (err) {
    console.error(' Failed to schedule cron job:', err.message);
  }
};

scheduleCronJob();

setInterval(scheduleCronJob, 5 * 60 * 1000);

module.exports = scheduleCronJob;
