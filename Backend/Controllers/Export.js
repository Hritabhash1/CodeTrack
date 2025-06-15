const Student = require('../Models/Student');
const { Parser } = require('json2csv');

exports.exportCSV = async (req, res) => {
  try {
    const students = await Student.find();
    const fields = ['name', 'email', 'codeforcesHandle', 'lastSynced', 'remindersSent'];
    const parser = new Parser({ fields });
    const csv = parser.parse(students);

    res.header('Content-Type', 'text/csv');
    res.attachment('students.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Failed to export data' });
  }
};
