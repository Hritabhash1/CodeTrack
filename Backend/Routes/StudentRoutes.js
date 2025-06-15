const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

router.get('/', getAllStudents);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
