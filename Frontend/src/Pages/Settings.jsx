// File: src/pages/Settings.jsx

import React, { useEffect, useState } from 'react';

export default function Settings() {
  const [config, setConfig] = useState({
    frequency: 'daily',
    time: '02:00',
    timezone: 'Asia/Kolkata'
  });

  // Load existing cron configuration
 useEffect(() => {
  fetch('http://localhost:5000/api/cron-config')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load settings');
      return res.json();
    })
    .then(data => {
      if (data) {
        setConfig(data);
      } else {
        // fallback if no config exists in DB
        setConfig({
          frequency: 'daily',
          time: '02:00',
          timezone: 'Asia/Kolkata'
        });
      }
    })
    .catch(err => {
      console.error(err);
      alert('Could not load sync settings.');
    });
}, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  // Save updated configuration
  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cron-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (!res.ok) throw new Error('Save failed');
      alert('Settings saved successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Sync Configuration</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Frequency */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Frequency</label>
          <select
            name="frequency"
            value={config.frequency}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Time (HH:MM)</label>
          <input
            name="time"
            type="time"
            value={config.time}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Timezone */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Timezone</label>
          <input
            name="timezone"
            value={config.timezone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  );
}
