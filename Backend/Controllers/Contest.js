const Contest = require('../Models/Contest');

exports.addContest = async (req, res) => {
  try {
    const contest = new Contest(req.body);
    await contest.save();
    res.status(201).json(contest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getContestsByStudent = async (req, res) => {
  try {
    const contests = await Contest.find({ student: req.params.studentId });
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
