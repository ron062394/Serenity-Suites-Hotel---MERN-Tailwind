import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaUser, FaBed, FaExclamationTriangle, FaCalendarPlus } from 'react-icons/fa';

function ManageBookings() {
  const [activeFloor, setActiveFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState({
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
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  const handleStatusChange = (roomId, newStatus) => {
    setRooms(prevRooms => {
      const updatedRooms = { ...prevRooms };
      Object.keys(updatedRooms).forEach(floor => {
        updatedRooms[floor] = updatedRooms[floor].map(room => 
          room.id === roomId ? { ...room, status: newStatus, currentBooking: newStatus === 'Available' ? null : room.currentBooking } : room
        );
      });
      return updatedRooms;
    });
  };

  const handleMaintenanceRequest = (roomId) => {
    // Implement maintenance request logic here
    console.log(`Maintenance requested for room ${roomId}`);
  };

  const handleExtendBooking = (roomId) => {
    // Implement extend booking logic here
    console.log(`Extend booking requested for room ${roomId}`);
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
              className={`px-4 py-2 rounded-t-lg transition-colors duration-300 ${
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
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={fadeInUp}
      >
        <AnimatePresence>
          {rooms[activeFloor].map((room) => (
            <motion.div 
              key={room.id} 
              className={`bg-white shadow-md rounded-lg overflow-hidden cursor-pointer ${
                room.status === 'Available' ? 'hover:shadow-lg' : ''
              }`}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleRoomClick(room)}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
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
        </AnimatePresence>
      </motion.div>

      {selectedRoom && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <h3 className="text-2xl font-bold mb-4">Room {selectedRoom.id} Details</h3>
            <p className="mb-2"><FaBed className="inline mr-2" />{selectedRoom.type}</p>
            <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Status: {selectedRoom.status}</p>
            {selectedRoom.currentBooking && (
              <>
                <p className="mb-2"><FaUser className="inline mr-2" />Guest: {selectedRoom.currentBooking.guestName}</p>
                <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Check-in: {selectedRoom.currentBooking.checkIn}</p>
                <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Check-out: {selectedRoom.currentBooking.checkOut}</p>
              </>
            )}
            <div className="mt-6 flex flex-wrap justify-between">
              <button
                className="px-4 py-2 mb-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                onClick={() => handleStatusChange(selectedRoom.id, selectedRoom.status === 'Available' ? 'Occupied' : 'Available')}
              >
                {selectedRoom.status === 'Available' ? 'Mark as Occupied' : 'Mark as Available'}
              </button>
              <button
                className="px-4 py-2 mb-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                onClick={() => handleMaintenanceRequest(selectedRoom.id)}
              >
                <FaExclamationTriangle className="inline mr-2" />
                Maintenance
              </button>
              {selectedRoom.status === 'Occupied' && (
                <button
                  className="px-4 py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={() => handleExtendBooking(selectedRoom.id)}
                >
                  <FaCalendarPlus className="inline mr-2" />
                  Extend Booking
                </button>
              )}
              <button
                className="px-4 py-2 mb-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ManageBookings;
