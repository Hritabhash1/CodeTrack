const express = require('express');
const router = express.Router();
const contestController = require('../Controllers/Contest');

router.get('/recent/:studentId', contestController.getContestsByStudent); 
router.post('/', contestController.addContest);
router.put('/:id', contestController.updateContest);
router.delete('/:id', contestController.deleteContest);

module.exports = router;
