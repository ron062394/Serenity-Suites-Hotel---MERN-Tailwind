import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaBed, FaClock, FaCheckCircle, FaSignOutAlt, FaTimes } from 'react-icons/fa';

function BookingLog() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [rooms, setRooms] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFloor, setActiveFloor] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Fetch bookings from API
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/bookings');
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        // Sort bookings by createdAt timestamp, latest first
        const sortedBookings = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(sortedBookings);
        setFilteredBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    // Fetch rooms from API
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchBookings();
    fetchRooms();
  }, []);

  useEffect(() => {
    const results = bookings.filter(booking =>
      (booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       booking.roomNumber?.toString().includes(searchTerm)) &&
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

  const handleAssignRoom = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
    setConfirmationMessage('');
    setIsConfirmDisabled(true);
    setSelectedRoom(null);
  };

  const handleRoomSelection = (room) => {
    if (room.status !== 'available') {
      setConfirmationMessage(`Room ${room.roomNumber} is not available.`);
      setIsConfirmDisabled(true);
      setSelectedRoom(null);
      return;
    }

    setSelectedRoom(room);
    if (selectedBooking.roomType && room.roomType.roomType !== selectedBooking.roomType) {
      setConfirmationMessage(`Warning: The selected room type (${room.roomType.roomType}) does not match the requested room type (${selectedBooking.roomType}).`);
    } else {
      setConfirmationMessage(`You are about to assign Room ${room.roomNumber} to ${selectedBooking.name}.`);
    }
    setIsConfirmDisabled(true);
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          setIsConfirmDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const handleRoomAssignment = async () => {
    if (!selectedRoom) return;

    try {
      const response = await fetch(`http://localhost:3001/api/bookings/confirm/${selectedBooking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room: selectedRoom._id, roomType: selectedRoom.roomType }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign room and confirm booking');
      }

      const updatedBooking = await response.json();
      setBookings(bookings.map(booking => 
        booking._id === updatedBooking._id ? updatedBooking : booking
      ));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error assigning room and confirming booking:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bookings/checkin/${bookingId}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to check in guest');
      }

      const updatedBooking = await response.json();
      setBookings(bookings.map(booking => 
        booking._id === updatedBooking.booking._id ? updatedBooking.booking : booking
      ));
    } catch (error) {
      console.error('Error checking in guest:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleCheckOut = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bookings/checkout/${bookingId}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to check out guest');
      }

      const updatedBooking = await response.json();
      setBookings(bookings.map(booking => 
        booking._id === updatedBooking.booking._id ? updatedBooking.booking : booking
      ));
    } catch (error) {
      console.error('Error checking out guest:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bookings/cancel/${bookingId}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      const updatedBooking = await response.json();
      setBookings(bookings.map(booking => 
        booking._id === updatedBooking.booking._id ? updatedBooking.booking : booking
      ));
    } catch (error) {
      console.error('Error canceling booking:', error);
      // Handle error (e.g., show error message to user)
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
      <h2 className="text-3xl font-bold mb-6 text-emerald-800">Booking Log</h2>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by guest name or room number"
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked-in">Checked-In</option>
            <option value="checked-out">Checked-Out</option>
            <option value="canceled">Canceled</option>
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
              <th className="py-3 px-4 text-left">Room Type</th>
              <th className="py-3 px-4 text-left">Check-In</th>
              <th className="py-3 px-4 text-left">Check-Out</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Created At</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <motion.tr
                key={booking._id}
                className="border-b border-gray-200 hover:bg-gray-100"
                whileHover={{ scale: 1.01 }}
              >
                <td className="py-3 px-4">{booking._id}</td>
                <td className="py-3 px-4">{booking.name}</td>
                <td className="py-3 px-4">{booking.roomNumber || 'Not assigned'}</td>
                <td className="py-3 px-4">{booking.roomType || 'Not specified'}</td>
                <td className="py-3 px-4">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${booking.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                      booking.status === 'checked-in' ? 'bg-blue-200 text-blue-800' :
                      booking.status === 'checked-out' ? 'bg-gray-200 text-gray-800' :
                      booking.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="flex items-center">
                    <FaClock className="mr-2" />
                    {new Date(booking.createdAt).toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    {!booking.roomNumber && (
                      <button
                        onClick={() => handleAssignRoom(booking)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded w-full"
                      >
                        <FaBed className="inline-block mr-2" />
                        Assign Room
                      </button>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleCheckIn(booking._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                      >
                        <FaCheckCircle className="inline-block mr-2" />
                        Check In
                      </button>
                    )}
                    {booking.status === 'checked-in' && (
                      <button
                        onClick={() => handleCheckOut(booking._id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full"
                      >
                        <FaSignOutAlt className="inline-block mr-2" />
                        Check Out
                      </button>
                    )}
                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
                      >
                        <FaTimes className="inline-block mr-2" />
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-lg font-bold mb-4">Assign Room to {selectedBooking.name}</h3>
            <p className="mb-4">Requested Room Type: {selectedBooking.roomType || 'Not specified'}</p>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((floor) => (
                  <button
                    key={floor}
                    className={`px-4 py-2 rounded-md ${
                      activeFloor === floor
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => setActiveFloor(floor)}
                  >
                    Floor {floor}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {rooms
                .filter(room => Math.floor(room.roomNumber / 100) === activeFloor)
                .map(room => (
                  <button
                    key={room._id}
                    onClick={() => handleRoomSelection(room)}
                    className={`
                      ${room.status === 'available'
                        ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                      ${selectedRoom && selectedRoom._id === room._id ? 'ring-2 ring-emerald-500' : ''}
                      font-bold py-2 px-4 rounded
                    `}
                  >
                    Room {room.roomNumber}
                  </button>
                ))
              }
            </div>
            {confirmationMessage && (
              <p className={`mt-4 p-2 rounded ${confirmationMessage.includes('Warning') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {confirmationMessage}
              </p>
            )}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleRoomAssignment}
                disabled={isConfirmDisabled}
                className={`bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded ${
                  isConfirmDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </motion.div>
    );
}

export default BookingLog;
