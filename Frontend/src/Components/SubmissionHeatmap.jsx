// src/components/SubmissionHeatmap.jsx

import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './heatmap.css'; // You can add optional custom styling

export default function SubmissionHeatmap({ submissions = [] }) {
  if (!Array.isArray(submissions)) {
    console.warn("Invalid submissions passed to SubmissionHeatmap:", submissions);
    submissions = [];
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 180); // Show past 6 months

  // Count submissions per day
  const dateCount = {};
  submissions.forEach(dateStr => {
    const date = new Date(dateStr).toISOString().split('T')[0]; // 'YYYY-MM-DD'
    dateCount[date] = (dateCount[date] || 0) + 1;
  });

  const heatmapData = Object.keys(dateCount).map(date => ({
    date,
    count: dateCount[date],
  }));
  console.log("Heatmap data:", heatmapData);


  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded shadow">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          if (value.count >= 10) return 'color-scale-4';
          if (value.count >= 5) return 'color-scale-3';
          if (value.count >= 3) return 'color-scale-2';
          return 'color-scale-1';
        }}
        tooltipDataAttrs={value =>
          value && value.date
            ? { 'data-tip': `${value.date}: ${value.count} submissions` }
            : {}
        }
        showWeekdayLabels={true}
      />
    </div>
  );
}
