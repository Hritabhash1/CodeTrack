import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Settings } from 'lucide-react';

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${
      isActive ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : 'text-gray-600 dark:text-gray-300'
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-4 space-y-4">
      <h1 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">CodeTrack</h1>

      <nav className="flex flex-col space-y-2">
        <NavLink to="/" className={linkClass}>
          <BarChart3 size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/students" className={linkClass}>
          <Users size={20} />
          Students
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
