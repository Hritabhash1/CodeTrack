const Student = require('../Models/Student');
const axios = require('axios');
const Contest = require('../Models/Contest');
const ProblemStat = require('../Models/ProblemStat');

const fetchAndStoreCFData = async () => {
  const students = await Student.find({});

  for (const student of students) {
    const handle = student.codeforcesHandle;

    try {
      // 1. Fetch contest history
      const contestRes = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
      const contests = contestRes.data.result;

      for (const c of contests) {
        const existing = await Contest.findOne({ student: student._id, contestId: c.contestId });
        if (!existing) {
          await Contest.create({
            student: student._id,
            contestId: c.contestId,
            contestName: c.contestName,
            rank: c.rank,
            ratingUpdateTime: new Date(c.ratingUpdateTimeSeconds * 1000),
            oldRating: c.oldRating,
            newRating: c.newRating
          });
        }
      }

      // 2. Fetch submissions
      const submissionRes = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
      const submissions = submissionRes.data.result;

      const acceptedProblems = new Map(); // to store unique accepted problems

      for (const sub of submissions) {
        if (sub.verdict === 'OK') {
          const problem = sub.problem;
          const problemId = `${problem.contestId}-${problem.index}`;

          // Use earliest submission time
          if (!acceptedProblems.has(problemId)) {
            acceptedProblems.set(problemId, {
              problemId,
              name: problem.name,
              rating: problem.rating || null,
              tags: problem.tags || [],
              solvedAt: new Date(sub.creationTimeSeconds * 1000)
            });
          }
        }
      }

      // Store accepted problems
      for (const [id, data] of acceptedProblems.entries()) {
        const exists = await ProblemStat.findOne({ student: student._id, problemId: id });
        if (!exists) {
          await ProblemStat.create({
            student: student._id,
            ...data
          });
        }
      }

      student.lastSynced = new Date();
      await student.save();
    } catch (err) {
      console.error(`Failed for ${handle}:`, err.message);
    }

    await new Promise(resolve => setTimeout(resolve, 1000)); // Avoid rate-limit

    // Inactivity detection
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const recent = await ProblemStat.findOne({
  student: student._id,
  solvedAt: { $gte: sevenDaysAgo }
});

if (!recent && student.emailRemindersEnabled) {
  try {
    const { sendReminderEmail } = require('../Utils/EmailService');
    await sendReminderEmail(student.email, student.name);
    student.remindersSent += 1;
    await student.save();
    console.log(`Reminder sent to ${student.name}`);
  } catch (e) {
    console.error(`Failed to send email to ${student.email}:`, e.message);
  }
}

  }
};

module.exports = { fetchAndStoreCFData };
