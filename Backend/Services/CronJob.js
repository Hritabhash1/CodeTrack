const axios = require('axios');
const Contest = require('../Models/Contest');
const ProblemStat = require('../Models/ProblemStat');
const { sendReminderEmail } = require('./emailServices');

const syncStudent = async (student) => {
  const handle = student.codeforcesHandle;
  if (!handle) return;
 const subRes = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
    const submissions = subRes.data.result;

    const accepted = new Map();
    let latestSubmission = 0;

    for (const sub of submissions) {
      if (sub.verdict === 'OK') {
        const problem = sub.problem;
        const id = `${problem.contestId}-${problem.index}`;

        if (!accepted.has(id)) {
          accepted.set(id, {
            problemId: id,
            name: problem.name,
            rating: problem.rating || null,
            tags: problem.tags || [],
            solvedAt: new Date(sub.creationTimeSeconds * 1000),
          });
        }

        latestSubmission = Math.max(latestSubmission, sub.creationTimeSeconds);
      }
    }
  try {
    const contestRes = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const contests = contestRes.data.result;

    for (const c of contests) {
      const existing = await Contest.findOne({ student: student._id, contestId: c.contestId });

      if (!existing) {
        let problemIds = [];
        try {
          const standingsRes = await axios.get(
            `https://codeforces.com/api/contest.standings?contestId=${c.contestId}&from=1&count=1`
          );
          problemIds = standingsRes.data.result.problems.map(p => `${c.contestId}-${p.index}`);
        } catch (err) {
          console.warn(` Could not fetch problems for contest ${c.contestId}: ${err.message}`);
        }
    const solvedProblemsInContest = problemIds.filter(id => accepted.has(id));
    const problemsUnsolved = problemIds.length - solvedProblemsInContest.length;

        await Contest.create({
          student: student._id,
          contestId: c.contestId,
          contestName: c.contestName,
          rank: c.rank,
          ratingUpdateTime: new Date(c.ratingUpdateTimeSeconds * 1000),
          oldRating: c.oldRating,
          newRating: c.newRating,
          ratingChange: c.newRating - c.oldRating,
          problems: problemIds,
          problemsUnsolved: problemsUnsolved
        });
      }
    }

   

    for (const [id, data] of accepted.entries()) {
      const exists = await ProblemStat.findOne({ student: student._id, problemId: id });
      if (!exists) {
        await ProblemStat.create({ student: student._id, ...data });
      }
    }

    const currentRating = contests.length ? contests.at(-1).newRating : null;
    const maxRating = contests.reduce((max, c) => Math.max(max, c.newRating), 0);
    const lastSubmission = latestSubmission ? new Date(latestSubmission * 1000) : null;

    student.currentRating = currentRating;
    student.maxRating = maxRating;
    student.lastSynced = new Date();

    const inactiveDays = lastSubmission
      ? (Date.now() - lastSubmission.getTime()) / (1000 * 60 * 60 * 24)
      : Infinity;

    if (inactiveDays > 7 && student.emailRemindersEnabled) {
      await sendReminderEmail(student.email, student.name);
      student.remindersSent += 1;
      console.log(` Reminder sent to ${student.email}`);
    }

    await student.save();
    console.log(`Synced ${student.name} (${handle})`);
  } catch (err) {
    console.error(` Failed to sync ${student.name}:`, err.message);
  }
};

module.exports = syncStudent;
