import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('admin');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://serenity-suites-api.vercel.app/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://serenity-suites-api.vercel.app/api/admin/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://serenity-suites-api.vercel.app/api/admin/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingUser)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      setUsers(users.map(user => user._id === editingUser._id ? editingUser : user));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const filteredUsers = users.filter(user => user.role.toLowerCase() === activeTab);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-emerald-800">Manage Users</h1>
      <div className="mb-6">
        <button
          className={`px-4 py-2 rounded-l-md ${activeTab === 'admin' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('admin')}
        >
          Admins
        </button>
        <button
          className={`px-4 py-2 rounded-r-md ${activeTab === 'customer' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('customer')}
        >
          Customers
        </button>
      </div>
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
            {filteredUsers.map((user) => (
              <motion.tr 
                key={user._id}
                whileHover={{ backgroundColor: '#f0fdf4' }}
                className="border-b border-gray-200"
              >
                <td className="py-3 px-4">{editingUser && editingUser._id === user._id ? <input value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} /> : user.name}</td>
                <td className="py-3 px-4">{editingUser && editingUser._id === user._id ? <input value={editingUser.email} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} /> : user.email}</td>
                <td className="py-3 px-4">{editingUser && editingUser._id === user._id ? 
                  <select value={editingUser.role} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select> : user.role}
                </td>
                <td className="py-3 px-4">
                  {editingUser && editingUser._id === user._id ? (
                    <>
                      <button onClick={handleUpdateUser} className="text-green-600 hover:text-green-800 mr-3">Save</button>
                      <button onClick={() => setEditingUser(null)} className="text-gray-600 hover:text-gray-800">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <FaEdit className="inline-block" />
                      </button>
                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-600 hover:text-red-800">
                        <FaTrash className="inline-block" />
                      </button>
                    </>
                  )}
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
