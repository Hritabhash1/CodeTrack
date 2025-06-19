const Student = require('../Models/Student');
const ProblemStat = require('../Models/ProblemStat');

const getDashboardSummary = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const activeStudentIds = await ProblemStat.distinct('student', {
      solvedAt: { $gte: sevenDaysAgo }
    });
    const activeStudents = activeStudentIds.length;

    const inactiveStudents = totalStudents - activeStudents;

    const latestSyncStudent = await Student.findOne().sort({ lastSynced: -1 });
    const lastSyncedAt = latestSyncStudent?.lastSynced || null;

    const allStudents = await Student.find().select('maxRating');
    const ratingBuckets = {
      '900-1199': 0,
      '1200-1399': 0,
      '1400-1599': 0,
      '1600-1799': 0,
      '1800-1999': 0,
      '2000+': 0
    };

    allStudents.forEach(student => {
      const r = student.maxRating || 0;
      if (r < 1200) ratingBuckets['0-1199']++;
      else if (r < 1400) ratingBuckets['1200-1399']++;
      else if (r < 1600) ratingBuckets['1400-1599']++;
      else if (r < 1800) ratingBuckets['1600-1799']++;
      else if (r < 2000) ratingBuckets['1800-1999']++;
      else ratingBuckets['2000+']++;
    });

    const recentStats = await ProblemStat.aggregate([
      {
        $match: {
          solvedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$solvedAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const submissionsPerDay = {};
    recentStats.forEach(entry => {
      submissionsPerDay[entry._id] = entry.count;
    });

    res.json({
      totalStudents,
      activeStudents,
      inactiveStudents,
      lastSyncedAt,
      ratingDistribution: ratingBuckets,
      submissionsPerDay
    });
  } catch (err) {
    console.error('Error in dashboard summary:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getDashboardSummary };
