import React, { useEffect, useState } from 'react';
import './Utils/Theme.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '@/Pages/Dashboard';
import Students from '@/pages/Students';
import StudentProfile from '@/pages/StudentProfile';
import Settings from '@/Pages/Settings';
import NotFound from '@/pages/NotFound';
import Layout from '@/Layouts/Layout';

export default function App() {
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <>
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          background: dark ? '#333' : '#ddd',
          color: dark ? '#fff' : '#000',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {dark ? '🌙 Dark' : '☀️ Light'}
      </button>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
