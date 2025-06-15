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
  try {
    const problems = await ProblemStat.find({ student: req.params.studentId });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
