import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUser } from 'react-icons/fa';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to verify the admin credentials
    // For this example, we'll use a simple check
    if (username === 'admin' && password === 'password') {
      // Successful login
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-800">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-emerald-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-emerald-600" />
              <input
                className="appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-emerald-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-emerald-600" />
              <input
                className="appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-emerald-600 hover:text-emerald-800"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
