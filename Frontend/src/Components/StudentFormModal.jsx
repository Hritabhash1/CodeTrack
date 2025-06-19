import React, { useEffect, useState } from 'react';

export default function StudentFormModal({ isOpen, onClose, onSuccess, student }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    codeforcesHandle: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        codeforcesHandle: student.codeforcesHandle || '',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        codeforcesHandle: '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = student
        ? `http://localhost:5000/api/students/${student._id}`
        : 'http://localhost:5000/api/students';

      const method = student ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save student');
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {student ? 'Edit Student' : 'Add Student'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <input
            name="email"
            placeholder="Email"
            required
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <input
            name="phone"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
          <input
            name="codeforcesHandle"
            placeholder="Codeforces Handle"
            required
            value={formData.codeforcesHandle}
            onChange={handleChange}
            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {student ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
