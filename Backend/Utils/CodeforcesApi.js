const Student = require('../Models/Student');
const syncStudent = require('../Services/CronJob');

const fetchAndStoreCFData = async () => {
  const students = await Student.find();

  for (const student of students) {
    await syncStudent(student);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Avoid rate limit
  }
};

module.exports = { fetchAndStoreCFData };
