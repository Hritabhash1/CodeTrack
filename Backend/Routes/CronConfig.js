const express = require('express');
const router = express.Router();
const CronConfigController = require('../Controllers/CronConfig');

router.get('/', CronConfigController.getCronConfig);
router.put('/', CronConfigController.updateCronConfig);

module.exports = router;
