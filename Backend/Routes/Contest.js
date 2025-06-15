const express = require('express');
const router = express.Router();
const contestController = require('../Controllers/Contest');

router.post('/', contestController.addContest);
router.get('/:studentId', contestController.getContestsByStudent);
router.put('/:id', contestController.updateContest);
router.delete('/:id', contestController.deleteContest);

module.exports = router;
