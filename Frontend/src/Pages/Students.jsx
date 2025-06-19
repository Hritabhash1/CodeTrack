import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Plus } from 'lucide-react';
import StudentFormModal from '@/components/StudentFormModal';
import axios from 'axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
const handleToggleReminder = async (id, currentValue) => {
  const newValue = !currentValue;

  try {
    await axios.put(`http://localhost:5000/api/students/${id}`, {
      emailRemindersEnabled: newValue,
    });

    setStudents(prev =>
      prev.map(s => s._id === id ? { ...s, emailRemindersEnabled: newValue } : s)
    );
  } catch (err) {
    console.error('Error updating emailRemindersEnabled:', err.message);
  }
};


  const handleExportCSV = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/export');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export CSV.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Delete failed');
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Failed to delete student.');
    }
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Student Management
        </h1>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-sm"
          >
            <Plus size={16} /> Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow ring-1 ring-gray-200 dark:ring-gray-700 rounded-lg">
        <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">CF Handle</th>
              <th className="px-4 py-3 text-left">Current</th>
              <th className="px-4 py-3 text-left">Max</th>
              <th className="px-4 py-3 text-left">Last Synced</th>
              <th className="px-4 py-3 text-left">ReminderSent</th>
              <th className="px-4 py-3 text-left">Turn on/off Reminder</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">
                    {s.name}
                  </td>
                  <td className="px-4 py-2">
                    {s.email}
                  </td>
                  <td className="px-4 py-2">{s.phone}</td>
                  <td className="px-4 py-2 text-blue-600 dark:text-blue-400">
                    {s.codeforcesHandle}
                  </td>
                  <td className="px-4 py-2">{s.currentRating ?? '—'}</td>

                  <td className="px-4 py-2">{s.maxRating ?? '—'}</td>
                  
                 <td className="px-4 py-2">
  {s.lastSynced ? new Date(s.lastSynced).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  }) : '—'}
</td>
 <td className="px-4 py-2">{s.remindersSent ?? '—'}</td>

<td className="px-4 py-2">
  <button
    onClick={() => handleToggleReminder(s._id, s. emailRemindersEnabled)}
    className={`px-3 py-1 rounded-full text-white text-sm transition-colors duration-200 ${
      s.emailRemindersEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 hover:bg-gray-500'
    }`}
  >
    {s.emailRemindersEnabled? 'On' : 'Off'}
  </button>
</td>

                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/students/${s._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => openEditModal(s)}
                      className="text-yellow-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStudents}
        student={editingStudent}
      />
    </div>
  );
}


