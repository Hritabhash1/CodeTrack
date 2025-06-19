const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../Controllers/Dashboard');

router.get('/summary', getDashboardSummary);

module.exports = router;
