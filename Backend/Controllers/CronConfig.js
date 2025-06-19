// controllers/CronConfigController.js
const CronConfig = require('../Models/CronConfig');

const getCronConfig = async (req, res) => {
  try {
    const config = await CronConfig.findOne(); 
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCronConfig = async (req, res) => {
  try {
    let config = await CronConfig.findOne();

    if (!config) {
      config = new CronConfig(req.body);
    } else {
      Object.assign(config, req.body);
    }

    await config.save();
    res.json(config);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getCronConfig,
  updateCronConfig,
};
