const ProblemStat = require('../Models/ProblemStat');

exports.addProblemStat = async (req, res) => {
  try {
    const problem = new ProblemStat(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getProblemStatsByStudent = async (req, res) => {
  const studentId = req.params.studentId;
  const range = parseInt(req.query.range) || 30;

  try {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - range);

    const problems = await ProblemStat.find({
      student: studentId,
      solvedAt: { $gte: fromDate }
    }).sort({ solvedAt: -1 });

    res.json(problems);
  } catch (err) {
    console.error('Error fetching problems:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteProblemStat = async (req, res) => {
  try {
    const result = await ProblemStat.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'ProblemStat not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
