const express = require('express');
const router = express.Router();
const problemStatController = require('../Controllers/ProblemStat');

router.post('/', problemStatController.addProblemStat);

router.get('/:studentId', problemStatController.getProblemStatsByStudent);

router.delete('/:id', problemStatController.deleteProblemStat);

module.exports = router;
