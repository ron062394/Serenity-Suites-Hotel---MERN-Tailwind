import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';

function BookingLog() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Fetch bookings from API
    const fetchBookings = async () => {
      // Replace with actual API call
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
      setFilteredBookings(data);
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const results = bookings.filter(booking =>
      (booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.roomNumber.toString().includes(searchTerm)) &&
      (filterStatus === 'all' || booking.status === filterStatus)
    );
    setFilteredBookings(results);
  }, [searchTerm, filterStatus, bookings]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="container mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <h2 className="text-3xl font-bold mb-6 text-emerald-800">Booking Log</h2>
      <div className="mb-6 flex items-center">
        <div className="relative mr-4">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by guest name or room number"
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="relative">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked-In</option>
            <option value="checked-out">Checked-Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Booking ID</th>
              <th className="py-3 px-4 text-left">Guest Name</th>
              <th className="py-3 px-4 text-left">Room Number</th>
              <th className="py-3 px-4 text-left">Check-In</th>
              <th className="py-3 px-4 text-left">Check-Out</th>
              <th className="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <motion.tr
                key={booking.id}
                className="border-b border-gray-200 hover:bg-gray-100"
                whileHover={{ scale: 1.01 }}
              >
                <td className="py-3 px-4">{booking.id}</td>
                <td className="py-3 px-4">{booking.guestName}</td>
                <td className="py-3 px-4">{booking.roomNumber}</td>
                <td className="py-3 px-4">{booking.checkIn}</td>
                <td className="py-3 px-4">{booking.checkOut}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${booking.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                      booking.status === 'checked-in' ? 'bg-blue-200 text-blue-800' :
                      booking.status === 'checked-out' ? 'bg-gray-200 text-gray-800' :
                      'bg-red-200 text-red-800'}`}>
                    {booking.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default BookingLog;
