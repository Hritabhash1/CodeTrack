import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from '@/components/ui/Card';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/summary');
        const data = await res.json();
        console.log(' Dashboard API response:', data); 
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p className="text-center p-4">Loading dashboard...</p>;

  const { totalStudents, activeStudents, inactiveStudents, lastSyncedAt, ratingDistribution, submissionsPerDay } = stats;

  const barData = Object.entries(ratingDistribution).map(([bucket, count]) => ({ bucket, count }));
  const lineData = Object.entries(submissionsPerDay).map(([date, count]) => ({ date, count }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overall Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Total Students">{totalStudents}</Card>
<Card title="Active Students">{activeStudents}</Card>
<Card title="Inactive Students">{inactiveStudents}</Card>
    
      </div>
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Rating Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="bucket" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="mb-2 font-semibold text-gray-700 dark:text-gray-200">Submissions per Day</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
