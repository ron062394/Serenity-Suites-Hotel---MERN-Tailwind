import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

function ManageBookings() {
  const [activeFloor, setActiveFloor] = useState(1);
  const [rooms] = useState({
    1: [
      { id: 101, type: 'Deluxe Suite', status: 'Available', currentBooking: null },
      { id: 102, type: 'Royal Suite', status: 'Occupied', currentBooking: { guestName: 'Jane Smith', checkIn: '2023-06-10', checkOut: '2023-06-15' } },
      { id: 103, type: 'Zen Garden Room', status: 'Available', currentBooking: null },
      { id: 104, type: 'Skyline Penthouse', status: 'Occupied', currentBooking: { guestName: 'Bob Johnson', checkIn: '2023-06-20', checkOut: '2023-06-25' } },
    ],
    2: [
      { id: 201, type: 'Deluxe Suite', status: 'Available', currentBooking: null },
      { id: 202, type: 'Royal Suite', status: 'Available', currentBooking: null },
      { id: 203, type: 'Zen Garden Room', status: 'Occupied', currentBooking: { guestName: 'Alice Brown', checkIn: '2023-06-15', checkOut: '2023-06-18' } },
      { id: 204, type: 'Skyline Penthouse', status: 'Available', currentBooking: null },
    ],
    3: [
      { id: 301, type: 'Deluxe Suite', status: 'Occupied', currentBooking: { guestName: 'Charlie Davis', checkIn: '2023-06-12', checkOut: '2023-06-14' } },
      { id: 302, type: 'Royal Suite', status: 'Available', currentBooking: null },
      { id: 303, type: 'Zen Garden Room', status: 'Available', currentBooking: null },
      { id: 304, type: 'Skyline Penthouse', status: 'Occupied', currentBooking: { guestName: 'Eve Franklin', checkIn: '2023-06-18', checkOut: '2023-06-22' } },
    ],
  });

  const handleRoomClick = (room) => {
    if (room.status === 'Available') {
      console.log(`Book room ${room.id}`);
    } else {
      console.log(`View booking details for room ${room.id}`);
    }
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
      <h2 className="text-3xl font-bold mb-6 text-emerald-800">Manage Rooms</h2>
      <div className="mb-6">
        <div className="flex space-x-2">
          {Object.keys(rooms).map((floor) => (
            <button
              key={floor}
              className={`px-4 py-2 rounded-t-lg ${
                activeFloor === parseInt(floor)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveFloor(parseInt(floor))}
            >
              Floor {floor}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms[activeFloor].map((room) => (
          <motion.div 
            key={room.id} 
            className={`bg-white shadow-md rounded-lg overflow-hidden cursor-pointer ${
              room.status === 'Available' ? 'hover:shadow-lg' : ''
            }`}
            whileHover={{ scale: 1.03 }}
            onClick={() => handleRoomClick(room)}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Room {room.id}</h3>
              <p className="text-gray-600 mb-2">{room.type}</p>
              <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                room.status === 'Available' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}>
                {room.status}
              </div>
              {room.currentBooking && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Current Booking:</p>
                  <p className="text-sm">{room.currentBooking.guestName}</p>
                  <p className="text-sm">{room.currentBooking.checkIn} - {room.currentBooking.checkOut}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ManageBookings;
