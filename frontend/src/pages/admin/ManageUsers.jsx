import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      // Replace with actual API call
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Implement delete user logic
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Replace with actual API call
      await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-emerald-800">Manage Users</h1>
      <Link to="/admin/users/new" className="inline-block mb-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
        <FaUserPlus className="inline-block mr-2" />
        Add New User
      </Link>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-emerald-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <motion.tr 
                key={user.id}
                whileHover={{ backgroundColor: '#f0fdf4' }}
                className="border-b border-gray-200"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <Link to={`/admin/users/${user.id}/edit`} className="text-blue-600 hover:text-blue-800 mr-3">
                    <FaEdit className="inline-block" />
                  </Link>
                  <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800">
                    <FaTrash className="inline-block" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

export default ManageUsers;
