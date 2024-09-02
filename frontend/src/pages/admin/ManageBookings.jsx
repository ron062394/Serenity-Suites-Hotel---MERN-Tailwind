import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

function ManageBookings() {
  const [bookings] = useState([
    { id: 1, guestName: 'John Doe', room: '101', checkIn: '2023-06-01', checkOut: '2023-06-05', status: 'Confirmed' },
    { id: 2, guestName: 'Jane Smith', room: '202', checkIn: '2023-06-10', checkOut: '2023-06-15', status: 'Pending' },
    { id: 3, guestName: 'Bob Johnson', room: '303', checkIn: '2023-06-20', checkOut: '2023-06-25', status: 'Cancelled' },
  ]);

  const handleEdit = (id) => {
    console.log(`Edit booking ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete booking ${id}`);
  };

  const handleApprove = (id) => {
    console.log(`Approve booking ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Reject booking ${id}`);
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
      <h2 className="text-3xl font-bold mb-6 text-emerald-800">Manage Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Guest Name</th>
              <th className="py-3 px-4 text-left">Room</th>
              <th className="py-3 px-4 text-left">Check-in</th>
              <th className="py-3 px-4 text-left">Check-out</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <motion.tr 
                key={booking.id} 
                className="border-b border-gray-200 hover:bg-gray-100"
                whileHover={{ scale: 1.01 }}
              >
                <td className="py-3 px-4">{booking.id}</td>
                <td className="py-3 px-4">{booking.guestName}</td>
                <td className="py-3 px-4">{booking.room}</td>
                <td className="py-3 px-4">{booking.checkIn}</td>
                <td className="py-3 px-4">{booking.checkOut}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === 'Confirmed' ? 'bg-green-200 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => handleEdit(booking.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(booking.id)} className="text-red-500 hover:text-red-700 mr-2">
                    <FaTrash />
                  </button>
                  <button onClick={() => handleApprove(booking.id)} className="text-green-500 hover:text-green-700 mr-2">
                    <FaCheck />
                  </button>
                  <button onClick={() => handleReject(booking.id)} className="text-red-500 hover:text-red-700">
                    <FaTimes />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ManageBookings;
