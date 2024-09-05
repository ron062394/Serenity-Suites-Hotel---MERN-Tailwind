import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaUser, FaBed, FaExclamationTriangle, FaCalendarPlus, FaDollarSign, FaUsers, FaConciergeBell } from 'react-icons/fa';

function Rooms() {
  const [activeFloor, setActiveFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://serenity-suites-api.vercel.app/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        
        const roomsByFloor = data.reduce((acc, room) => {
          const floor = room.floor;
          if (!acc[floor]) acc[floor] = [];
          acc[floor].push(room);
          return acc;
        }, {});

        setRooms(roomsByFloor);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch('https://serenity-suites-api.vercel.app/api/bookings/available');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchRooms();
    fetchBookings();
  }, []);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  const handleStatusChange = async (roomId, newStatus) => {
    try {
      const response = await fetch(`https://serenity-suites-api.vercel.app/api/rooms/${roomId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update room status');
      }

      const updatedRoom = await response.json();

      setRooms(prevRooms => {
        const updatedRooms = { ...prevRooms };
        Object.keys(updatedRooms).forEach(floor => {
          updatedRooms[floor] = updatedRooms[floor].map(room => 
            room._id === updatedRoom._id ? updatedRoom : room
          );
        });
        return updatedRooms;
      });
    } catch (error) {
      console.error('Error updating room status:', error);
    }
  };

  const handleMaintenanceRequest = (roomId) => {
    console.log(`Maintenance requested for room ${roomId}`);
  };

  const handleExtendBooking = (roomId) => {
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
          {rooms[activeFloor] && rooms[activeFloor].map((room) => (
            <motion.div 
              key={room._id} 
              className={`bg-white shadow-md rounded-lg overflow-hidden cursor-pointer border border-gray-200 ${
                room.status === 'available' ? 'hover:shadow-lg' : ''
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
                <h3 className="text-xl font-semibold mb-2">Room {room.roomNumber}</h3>
                <p className="text-gray-600 mb-2">{room.roomType.roomName}</p>
                <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                  room.status === 'available' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}>
                  {room.status}
                </div>

                {bookings.map((booking) => (
                  booking.roomNumber === room.roomNumber && (
                    <div key={booking._id} className="mt-4">
                      <p className="text-sm text-gray-600">Booked Guest:</p>
                      <p className="text-sm">{booking.firstName} {booking.lastName}</p>
                      <p className="text-sm">{new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                    </div>
                  )
                ))}
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
            <h3 className="text-2xl font-bold mb-4">Room {selectedRoom.roomNumber} Details</h3>
            <p className="mb-2"><FaBed className="inline mr-2" />{selectedRoom.roomType.roomName}</p>
            <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Status: {selectedRoom.status}</p>
            <p className="mb-2"><FaDollarSign className="inline mr-2" />Price: ${selectedRoom.roomType.price}/night</p>
            <p className="mb-2"><FaUsers className="inline mr-2" />Capacity: {selectedRoom.roomType.capacity} persons</p>
            <p className="mb-2"><FaConciergeBell className="inline mr-2" />Amenities: {selectedRoom.roomType.amenities.join(', ')}</p>
            
            {bookings.map((booking) => (
              booking.roomNumber === selectedRoom.roomNumber && (
                <div key={booking._id}>
                  <p className="mb-2"><FaUser className="inline mr-2" />Guest: {booking.firstName} {booking.lastName}</p>
                  <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                  <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                </div>
              )
            ))}
            <div className="mt-6 flex flex-wrap justify-between">
              <button
                className="px-4 py-2 mb-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                onClick={() => handleStatusChange(selectedRoom._id, selectedRoom.status === 'available' ? 'booked' : 'available')}
              >
                {selectedRoom.status === 'available' ? 'Mark as Booked' : 'Mark as Available'}
              </button>
              <button
                className="px-4 py-2 mb-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                onClick={() => handleMaintenanceRequest(selectedRoom._id)}
              >
                <FaExclamationTriangle className="inline mr-2" />
                Maintenance
              </button>
              {selectedRoom.status === 'booked' && (
                <button
                  className="px-4 py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  onClick={() => handleExtendBooking(selectedRoom._id)}
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

export default Rooms;
