import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import SubmissionHeatmap from '@/components/SubmissionHeatmap';

export default function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [contests, setContests] = useState([]);
  const [problems, setProblems] = useState([]);
  const [contestRange, setContestRange] = useState(30);
  const [problemRange, setProblemRange] = useState(7);

  useEffect(() => {
    fetch(`http://localhost:5000/api/students/${id}`)
      .then(res => res.json())
      .then(setStudent)
      .catch(console.error);

    fetchContests(contestRange);
    fetchProblems(problemRange);
  }, [id]);

  const fetchContests = (days) => {
    fetch(`http://localhost:5000/api/contests/recent/${id}?range=${days}`)
      .then(res => res.json())
      .then(setContests)
      .catch(console.error);
  };

  const fetchProblems = (days) => {
    fetch(`http://localhost:5000/api/problems/${id}?range=${days}`)
      .then(res => res.json())
      .then(setProblems)
      .catch(console.error);
  };

  if (!student) return <p className="p-4">Loading profile…</p>;

  const ratingData = contests.map(c => ({
    date: c.ratingUpdateTime ? new Date(c.ratingUpdateTime).toLocaleDateString() : '',
    rating: c.newRating
  }));

  const buckets = {};
  problems.forEach(p => {
    const r = p.rating || 0;
     if (r >= 800) {
       const lower = Math.floor((r - 800) / 200) * 200 + 800;
       const upper = lower + 199;
   const key = `${lower}-${upper}`;
    buckets[key] = (buckets[key] || 0) + 1;
     }
  });
  const bucketData = Object.entries(buckets).map(([bucket, count]) => ({ bucket, count }));

  const totalSolved = problems.length;
  const mostDifficult = problems.reduce((max, p) => (p.rating > (max.rating || 0) ? p : max), {}).rating || 'N/A';
  const avgRating = totalSolved
    ? Math.round(problems.reduce((sum, p) => sum + (p.rating || 0), 0) / totalSolved)
    : 'N/A';
  const avgPerDay = problemRange ? (totalSolved / problemRange).toFixed(2) : 'N/A';

  return (
    <div className="space-y-6">
      <Link to="/students" className="inline-flex items-center text-blue-600">
        <ArrowLeft size={16} className="mr-1" /> Back to Students
      </Link>

      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{student.name}</h1>
        <div className="text-sm text-gray-600">
          Last Synced: {new Date(student.lastSynced).toLocaleString()}
        </div>
      </header>

      {/* Contest History */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Contest History</h2>
        <select
          value={contestRange}
          onChange={e => {
            const d = +e.target.value;
            setContestRange(d);
            fetchContests(d);
          }}
          className="border px-2 py-1 rounded-md"
        >
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
          <option value={365}>Last 365 days</option>
        </select>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ratingData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Contest</th>
              <th className="p-2">Rank</th>
              <th className="p-2">ΔRating</th>
              <th className="p-2">Unsolved</th>
            </tr>
          </thead>
          <tbody>
            {contests.map(c => (
              <tr key={c.contestId} className="border-t">
                <td className="p-2">{c.ratingUpdateTime ? new Date(c.ratingUpdateTime).toLocaleDateString() : '—'}</td>
                <td className="p-2">{c.contestName}</td>
                <td className="p-2">{c.rank}</td>
                <td className={`p-2 ${c.newRating - c.oldRating >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {c.newRating - c.oldRating}
                </td>
                <td className="p-2">{c.problemsUnsolved ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Problem Solving Data */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Problem Solving</h2>
        <select
          value={problemRange}
          onChange={e => {
            const d = +e.target.value;
            setProblemRange(d);
            fetchProblems(d);
          }}
          className="border px-2 py-1 rounded-md"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="text-sm">Total Solved</div>
            <div className="text-2xl font-bold">{totalSolved}</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="text-sm">Most Difficult</div>
            <div className="text-2xl font-bold">{mostDifficult}</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="text-sm">Avg. Rating</div>
            <div className="text-2xl font-bold">{avgRating}</div>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <div className="text-sm">Avg/day</div>
            <div className="text-2xl font-bold">{avgPerDay}</div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bucketData}>
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Submission Heatmap</h3>
          <SubmissionHeatmap submissions={(problems || []).map(p => p.solvedAt)} />
        </div>
      </section>
    </div>
  );
}
