import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaUser, FaBed, FaExclamationTriangle, FaCalendarPlus, FaDollarSign, FaUsers, FaConciergeBell, FaBroom, FaTools, FaBan, FaHotel, FaBuilding, FaKey } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Rooms() {
  const [activeFloor, setActiveFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://serenity-suites-api.vercel.app/api/rooms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
      toast.error('Failed to fetch rooms');
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://serenity-suites-api.vercel.app/api/bookings/available', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  const handleStatusChange = async (roomId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://serenity-suites-api.vercel.app/api/rooms/${roomId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
      toast.success('Room status updated successfully');
    } catch (error) {
      console.error('Error updating room status:', error);
      toast.error('Failed to update room status');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-200 text-green-800';
      case 'booked':
        return 'bg-blue-200 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-200 text-yellow-800';
      case 'cleaning':
        return 'bg-purple-200 text-purple-800';
      case 'out of service':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <FaCheck className="inline-block mr-1" />;
      case 'booked':
        return <FaUser className="inline-block mr-1" />;
      case 'maintenance':
        return <FaTools className="inline-block mr-1" />;
      case 'cleaning':
        return <FaBroom className="inline-block mr-1" />;
      case 'out of service':
        return <FaBan className="inline-block mr-1" />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="container mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h2 className="text-3xl font-bold mb-6 text-emerald-800"><FaHotel className="inline-block mr-2" />Manage Rooms</h2>
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
              <FaBuilding className="inline-block mr-1" />
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
              className={`shadow-md rounded-lg overflow-hidden cursor-pointer border border-gray-200 ${
                room.status === 'available' ? 'hover:shadow-lg' : ''
              } ${getStatusColor(room.status)} flex flex-col h-[210px] relative`}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleRoomClick(room)}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2"><FaKey className="inline-block mr-2" />Room {room.roomNumber}</h3>
                <p className="mb-2"><FaBed className="inline-block mr-2" />{room.roomType.roomName}</p>

                {bookings.map((booking) => (
                  booking.roomNumber === room.roomNumber && (
                    <div key={booking._id} className="mt-2">
                      <p className="text-sm"><FaUser className="inline-block mr-2" />Booked Guest:</p>
                      <p className="text-sm truncate">{booking.firstName} {booking.lastName}</p>
                      <p className="text-sm"><FaCalendarAlt className="inline-block mr-2" />{new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                    </div>
                  )
                ))}
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className={`inline-block px-2 py-1 rounded-full text-sm font-bold bg-white`}>
                  {getStatusIcon(room.status)}
                  {room.status.toUpperCase()}
                </div>
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
            <h3 className="text-2xl font-bold mb-4"><FaKey className="inline-block mr-2" />Room {selectedRoom.roomNumber} Details</h3>
            <p className="mb-2"><FaBed className="inline mr-2" />{selectedRoom.roomType.roomName}</p>
            <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Status: {selectedRoom.status.toUpperCase()}</p>
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
              {selectedRoom.status !== 'booked' && (
                <>
                  <button
                    className="px-4 py-2 mb-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                    onClick={() => handleStatusChange(selectedRoom._id, 'maintenance')}
                  >
                    <FaTools className="inline mr-2" />
                    Maintenance
                  </button>
                  <button
                    className="px-4 py-2 mb-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                    onClick={() => handleStatusChange(selectedRoom._id, 'cleaning')}
                  >
                    <FaBroom className="inline mr-2" />
                    Cleaning
                  </button>
                  <button
                    className="px-4 py-2 mb-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleStatusChange(selectedRoom._id, 'out of service')}
                  >
                    <FaBan className="inline mr-2" />
                    Out of Service
                  </button>
                  <button
                    className="px-4 py-2 mb-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => handleStatusChange(selectedRoom._id, 'available')}
                  >
                    <FaCheck className="inline mr-2" />
                    Available
                  </button>
                </>
              )}
              <button
                className="px-4 py-2 mb-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                onClick={handleCloseModal}
              >
                <FaTimes className="inline mr-2" />
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
