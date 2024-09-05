import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaHotel, FaCalendarAlt, FaChartLine, FaBell, FaSearch, FaDownload, FaTachometerAlt, FaSignOutAlt, FaBook, FaDoorOpen, FaUserCheck, FaBed } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ManageBookings from './Rooms';
import ManageRooms from './ManageRooms';
import ManageUsers from './ManageUsers';
import Notifications from './Notifications';
import BookingLog from './BookingLog';
import RoomType from './RoomType';

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [revenueData, setRevenueData] = useState([]);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [checkedInGuests, setCheckedInGuests] = useState(0);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const navigate = useNavigate();

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

    // Simulating API call to fetch available rooms
    const fetchAvailableRooms = () => {
      // Replace this with actual API call
      setAvailableRooms(15);
    };

    // Simulating API call to fetch checked-in guests
    const fetchCheckedInGuests = () => {
      // Replace this with actual API call
      setCheckedInGuests(42);
    };

    // Simulating API call to fetch recent notifications
    const fetchRecentNotifications = () => {
      // Replace this with actual API call
      const notifications = [
        { id: 1, message: 'New booking for Room 101', timestamp: '2 minutes ago' },
        { id: 2, message: 'Checkout completed for Room 205', timestamp: '15 minutes ago' },
        { id: 3, message: 'Maintenance request for Room 302', timestamp: '1 hour ago' },
        { id: 4, message: 'New user registration', timestamp: '3 hours ago' },
        { id: 5, message: 'Payment received for booking #1234', timestamp: '5 hours ago' },
      ];
      setRecentNotifications(notifications);
    };

    fetchRevenueData();
    fetchAvailableRooms();
    fetchCheckedInGuests();
    fetchRecentNotifications();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For example, clear local storage, reset auth state, etc.
    navigate('/admin/login'); // Redirect to admin login page
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { title: 'Total Bookings', value: '1,234', icon: <FaCalendarAlt className="text-emerald-500" /> },
                { title: 'Revenue', value: '$123,456', icon: <FaChartLine className="text-emerald-500" /> },
                { title: 'Occupancy Rate', value: '85%', icon: <FaHotel className="text-emerald-500" /> },
                { title: 'Checked-In Guests', value: checkedInGuests, icon: <FaUserCheck className="text-emerald-500" /> },
                { title: 'Available Rooms', value: availableRooms, icon: <FaDoorOpen className="text-emerald-500" /> },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-gray-700">{item.title}</h4>
                    {item.icon}
                  </div>
                  <p className="text-3xl font-bold text-emerald-600">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Revenue Trend</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
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
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Recent Notifications</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className="mb-4 pb-4 border-b last:border-b-0 text-left">
                    <p className="text-base text-gray-700 mb-1">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      case 'bookings':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <ManageBookings />
          </motion.div>
        );
      case 'rooms':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <ManageRooms />
          </motion.div>
        );
      case 'users':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <ManageUsers />
          </motion.div>
        );
      case 'notifications':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <Notifications />
          </motion.div>
        );
      case 'bookinglog':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <BookingLog />
          </motion.div>
        );
      case 'roomtype':
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <RoomType />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <nav className="bg-emerald-800 text-white w-64 min-h-screen p-6">
            <motion.div 
              className="font-serif text-3xl text-white mb-10"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <span className="italic">Serenity</span>
              <span className="text-amber-500 italic">Suites</span>
            </motion.div>
        
        <ul className="space-y-4">
          {[
            { name: 'Overview', icon: <FaTachometerAlt />, tab: 'overview' },
            { name: 'Rooms', icon: <FaCalendarAlt />, tab: 'bookings' },
            { name: 'Manage Rooms', icon: <FaHotel />, tab: 'rooms' },
            { name: 'Room Types', icon: <FaBed />, tab: 'roomtype' },
            { name: 'Users', icon: <FaUsers />, tab: 'users' },
            { name: 'Notifications', icon: <FaBell />, tab: 'notifications' },
            { name: 'Booking Log', icon: <FaBook />, tab: 'bookinglog' },
          ].map((item) => (
            <li key={item.tab}>
              <button
                className={`flex items-center w-full p-3 rounded-md text-lg ${
                  selectedTab === item.tab ? 'bg-emerald-600' : 'hover:bg-emerald-700'
                }`}
                onClick={() => setSelectedTab(item.tab)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          className="flex items-center w-full p-3 rounded-md hover:bg-emerald-700 mt-auto text-lg"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span className="ml-3">Logout</span>
        </button>
      </nav>
      <div className="flex-1 p-10">
        <div className="bg-white rounded-lg shadow-md p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
