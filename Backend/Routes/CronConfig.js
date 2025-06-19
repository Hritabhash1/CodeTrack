const express = require('express');
const router = express.Router();
const CronConfig = require('../Models/CronConfig');
const scheduleCronJob = require('../Utils/CronScheduler');

router.get('/', async (req, res) => {
  try {
    const config = await CronConfig.findOne();
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const updated = await CronConfig.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    await scheduleCronJob(); 
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
