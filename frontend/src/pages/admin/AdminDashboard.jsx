import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaHotel, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

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
          </motion.div>
        );
      case 'bookings':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">Recent Bookings</h3>
            {/* Add a table or list of recent bookings here */}
          </motion.div>
        );
      case 'rooms':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">Room Management</h3>
            {/* Add room management functionality here */}
          </motion.div>
        );
      case 'users':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-2xl font-bold mb-4">User Management</h3>
            {/* Add user management functionality here */}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-emerald-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Serenity Suites Admin Dashboard</h1>
        </div>
      </nav>
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex mb-6">
            {['overview', 'bookings', 'rooms', 'users'].map((tab) => (
              <button
                key={tab}
                className={`mr-4 px-4 py-2 rounded-md ${
                  selectedTab === tab ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
