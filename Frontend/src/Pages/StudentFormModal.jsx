import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

export default function StudentFormModal({ isOpen, onClose, onSuccess, student }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    codeforcesHandle: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        codeforcesHandle: student.codeforcesHandle || ''
      });
    } else {
      setFormData({ name: '', email: '', phone: '', codeforcesHandle: '' });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = student?._id
        ? `http://localhost:5000/api/students/${student._id}`
        : 'http://localhost:5000/api/students';
      const method = student?._id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Save failed');

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Error saving student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Dialog.Title className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {student ? 'Edit Student' : 'Add New Student'}
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['name', 'email', 'phone', 'codeforcesHandle'].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field === 'codeforcesHandle'
                    ? 'CF Handle'
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== 'phone'}
                  className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                />
              </div>
            ))}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                disabled={loading}
              >
                {loading ? 'Saving...' : student ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
