import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaCalendarAlt, FaTools, FaDoorOpen, FaUserPlus } from 'react-icons/fa';

function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', category: 'booking', message: 'New booking request for Room 101', timestamp: '2023-06-25 10:30 AM' },
    { id: 2, type: 'warning', category: 'maintenance', message: 'Maintenance required in Room 205', timestamp: '2023-06-25 11:45 AM' },
    { id: 3, type: 'success', category: 'checkout', message: 'Check-out completed for Room 302', timestamp: '2023-06-25 12:15 PM' },
    { id: 4, type: 'info', category: 'user', message: 'New user registration: John Doe', timestamp: '2023-06-25 02:00 PM' },
    { id: 5, type: 'warning', category: 'maintenance', message: 'Low inventory alert: Towels', timestamp: '2023-06-25 03:30 PM' },
    { id: 6, type: 'success', category: 'user', message: 'User verified: Jane Smith', timestamp: '2023-06-25 04:45 PM' },
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const getIcon = (type) => {
    switch (type) {
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      case 'warning':
        return <FaExclamationCircle className="text-yellow-500" />;
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'booking':
        return <FaCalendarAlt className="text-purple-500" />;
      case 'maintenance':
        return <FaTools className="text-orange-500" />;
      case 'checkout':
        return <FaDoorOpen className="text-green-500" />;
      case 'user':
        return <FaUserPlus className="text-blue-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const filteredNotifications = activeTab === 'all'
    ? notifications
    : notifications.filter(notification => notification.category === activeTab);

  return (
    <motion.div
      className="container mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <h2 className="text-3xl font-bold mb-6 text-emerald-800">Notifications</h2>
      <div className="mb-6">
        <div className="flex space-x-2">
          {['all', 'booking', 'maintenance', 'checkout', 'user'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center"
            variants={fadeInUp}
          >
            <div className="mr-4">
              {getIcon(notification.type)}
            </div>
            <div className="mr-4">
              {getCategoryIcon(notification.category)}
            </div>
            <div className="flex-grow">
              <p className="text-gray-800">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Notifications;
