const Student = require('../Models/Student');

exports.getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

exports.addStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
};

exports.updateStudent = async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};
