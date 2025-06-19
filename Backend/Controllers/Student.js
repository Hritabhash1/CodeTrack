const Student = require('../Models/Student');
const { fetchAndStoreCFData } = require('../Utils/CodeforcesApi');
const syncStudent = require('../Services/CronJob');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    console.log('Incoming student data:', req.body); 
    const student = new Student(req.body);
    await student.save();
     await syncStudent(student);
    res.status(201).json(student);
  } catch (err) {
    console.error('Create student error:', err.message);
    res.status(400).json({ message: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
     await syncStudent(student);
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.syncStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await fetchAndStoreCFData(student);
    res.status(200).json({ message: 'Synced successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.disableEmailReminders = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { emailRemindersEnabled: false },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Email reminders disabled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};