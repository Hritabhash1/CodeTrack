const Student = require('../Models/Student');
const { fetchCodeforcesData } = require('../Utils/CodeforcesApi');
const sendReminder = require('./emailServices');

const syncStudentData = async () => {
  const students = await Student.find();

  for (const student of students) {
    const data = await fetchCodeforcesData(student.codeforcesHandle);

    student.currentRating = data.currentRating;
    student.maxRating = data.maxRating;
    student.lastSynced = new Date();
    await student.save();

    const hasBeenInactive = data.lastSubmission > 7; // Example
    if (hasBeenInactive && student.emailRemindersEnabled) {
      await sendReminder(student.email);
      student.remindersSent += 1;
      await student.save();
    }
  }

  console.log('Cron sync complete');
};

module.exports = { syncStudentData };
