import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</h2>

      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Sun className="w-5 h-5 dark:hidden" />
        <Moon className="w-5 h-5 hidden dark:inline" />
      </button>
    </header>
  );
}
