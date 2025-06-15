const express = require('express');
const router = express.Router();
const exportController = require('../Controllers/Export');

router.get('/', exportController.exportCSV);

module.exports = router;
