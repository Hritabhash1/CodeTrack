const Contest = require('../Models/Contest');
const ProblemStat = require('../Models/ProblemStat');

exports.addContest = async (req, res) => {
  try {
    const contest = new Contest(req.body);
    await contest.save();
    res.status(201).json(contest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



exports.updateContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    res.json(contest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteContest = async (req, res) => {
  try {
    const contest = await Contest.findByIdAndDelete(req.params.id);
    if (!contest) return res.status(404).json({ message: 'Contest not found' });
    res.json({ message: 'Contest deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getContestsByStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const range = parseInt(req.query.range) || 30; 

  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - range);

    const contests = await Contest.find({
      student: studentId,
      ratingUpdateTime: { $gte: fromDate }
    }).sort({ ratingUpdateTime: -1 }).lean();

    const solvedProblems = await ProblemStat.find({ student: studentId }).select('problemId');
    const solvedSet = new Set(solvedProblems.map(p => p.problemId));

    const enrichedContests = contests.map(c => {
      const unsolved = (c.problems || []).filter(p => !solvedSet.has(p));
      return {
        ...c,
        problemsUnsolved: unsolved.length
      };
    });

    res.json(enrichedContests);
  } catch (err) {
    console.error('Error fetching contests:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
