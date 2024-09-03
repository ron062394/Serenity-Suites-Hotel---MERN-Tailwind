import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaHotel, FaCalendarAlt, FaChartLine, FaBell, FaSearch, FaDownload, FaTachometerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch revenue data
    const fetchRevenueData = () => {
      const data = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5000 },
        { name: 'Apr', revenue: 4500 },
        { name: 'May', revenue: 6000 },
        { name: 'Jun', revenue: 5500 },
      ];
      setRevenueData(data);
    };

    fetchRevenueData();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Total Bookings', value: '1,234', icon: <FaCalendarAlt className="text-emerald-500" /> },
                { title: 'Revenue', value: '$123,456', icon: <FaChartLine className="text-emerald-500" /> },
                { title: 'Occupancy Rate', value: '85%', icon: <FaHotel className="text-emerald-500" /> },
                { title: 'Active Users', value: '5,678', icon: <FaUsers className="text-emerald-500" /> },
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-emerald-800">{item.title}</h4>
                    {item.icon}
                  </div>
                  <p className="text-2xl font-bold text-emerald-600">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Revenue Trend</h3>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#10B981" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4">Notifications</h3>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-emerald-800">Recent Notifications</h4>
                  <FaBell className="text-emerald-500" />
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    <p>New booking request for Room 101</p>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                    <p>Maintenance required in Room 205</p>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <p>Check-out completed for Room 302</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      case 'bookings':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">Recent Bookings</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                  <FaDownload className="mr-2" />
                  Export
                </button>
              </div>
              {/* Add a table or list of recent bookings here */}
            </div>
          </motion.div>
        );
      case 'rooms':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">Room Management</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Add room management functionality here */}
            </div>
          </motion.div>
        );
      case 'users':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">User Management</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Add user management functionality here */}
            </div>
          </motion.div>
        );
      case 'notifications':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">Notifications</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Add notifications functionality here */}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <nav className="bg-emerald-800 text-white w-64 min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-8">Serenity Suites</h1>
        <ul>
          {[
            { name: 'Overview', icon: <FaTachometerAlt />, tab: 'overview' },
            { name: 'Bookings', icon: <FaCalendarAlt />, tab: 'bookings' },
            { name: 'Rooms', icon: <FaHotel />, tab: 'rooms' },
            { name: 'Users', icon: <FaUsers />, tab: 'users' },
            { name: 'Notifications', icon: <FaBell />, tab: 'notifications' },
          ].map((item) => (
            <li key={item.tab} className="mb-4">
              <button
                className={`flex items-center w-full p-2 rounded-md ${
                  selectedTab === item.tab ? 'bg-emerald-600' : 'hover:bg-emerald-700'
                }`}
                onClick={() => setSelectedTab(item.tab)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
