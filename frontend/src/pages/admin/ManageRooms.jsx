import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaTimes as FaCross, FaHotel, FaBuilding, FaKey, FaBed, FaCalendarAlt, FaUser, FaExclamationTriangle, FaCalendarPlus, FaDollarSign, FaUsers, FaConciergeBell, FaBroom, FaTools, FaBan } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageRooms() {
  const [activeFloor, setActiveFloor] = useState(1);
  const [rooms, setRooms] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingRoomNumbers, setExistingRoomNumbers] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRoomId, setEditRoomId] = useState(null);

  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    roomType: '',
    status: 'available',
    floor: '',
  });

  const [isRoomNumberValid, setIsRoomNumberValid] = useState(null);

  const floorOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetchRooms();
    fetchRoomTypes();
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
      
      // Organize rooms by floor
      const roomsByFloor = data.reduce((acc, room) => {
        const floor = room.floor;
        if (!acc[floor]) {
          acc[floor] = [];
        }
        acc[floor].push(room);
        return acc;
      }, {});

      setRooms(roomsByFloor);
      setExistingRoomNumbers(data.map(room => room.roomNumber));
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to fetch rooms');
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://serenity-suites-api.vercel.app/api/roomTypes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch room types');
      }
      const data = await response.json();
      setRoomTypes(data);
    } catch (error) {
      console.error('Error fetching room types:', error);
      toast.error('Failed to fetch room types');
    }
  };

  const handleEdit = (room) => {
    setIsEditMode(true);
    setEditRoomId(room._id);
    setNewRoom({
      roomNumber: room.roomNumber,
      roomType: room.roomType._id,
      status: room.status,
      floor: room.floor,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://serenity-suites-api.vercel.app/api/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete room');
      }
      fetchRooms(); // Refresh the rooms list
      toast.success('Room deleted successfully');
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Failed to delete room');
    }
  };

  const handleAddRoom = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewRoom({
      roomNumber: '',
      roomType: '',
      status: 'available',
      floor: '',
    });
    setIsRoomNumberValid(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prev => ({ ...prev, [name]: value }));
    if (name === 'roomNumber') {
      setIsRoomNumberValid(!existingRoomNumbers.includes(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingRoomNumbers.includes(newRoom.roomNumber) && !isEditMode) {
      toast.error('Room number already exists. Please choose a different room number.');
      return;
    }
    console.log('New room:', newRoom);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://serenity-suites-api.vercel.app/api/rooms${isEditMode ? `/${editRoomId}` : ''}`, {
        method: isEditMode ? 'PATCH' : 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRoom),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} room`);
      }
      handleCloseModal();
      fetchRooms(); // Refresh the rooms list
      toast.success(`Room ${isEditMode ? 'updated' : 'added'} successfully`);
      
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} room:`, error.message);
      toast.error(`Failed to ${isEditMode ? 'update' : 'add'} room`);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h2 className="text-4xl font-bold mb-8 text-emerald-800"><FaHotel className="inline-block mr-2" />Manage Rooms</h2>
      <div className="mb-6">
        <div className="flex space-x-2">
          {Object.keys(rooms).map((floor) => (
            <button
              key={floor}
              className={`px-4 py-2 rounded-md ${
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
      <motion.button
        className="mb-4 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors shadow-lg flex items-center"
        onClick={handleAddRoom}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus className="mr-2" /> Add New Room
      </motion.button>
      <div className="overflow-x-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-emerald-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left"><FaKey className="inline-block mr-2" />Room Number</th>
                <th className="py-3 px-4 text-left"><FaBuilding className="inline-block mr-2" />Floor</th>
                <th className="py-3 px-4 text-left"><FaBed className="inline-block mr-2" />Type</th>
                <th className="py-3 px-4 text-left"><FaTools className="inline-block mr-2" />Actions</th>
              </tr>
            </thead>
            <tbody className="text-left">
              <AnimatePresence>
                {rooms[activeFloor] && rooms[activeFloor].map((room) => (
                  <motion.tr 
                    key={room._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-200 hover:bg-emerald-50"
                  >
                    <td className="py-3 px-4"><FaKey className="inline-block mr-2" />{room.roomNumber}</td>
                    <td className="py-3 px-4"><FaBuilding className="inline-block mr-2" />{room.floor}</td>
                    <td className="py-3 px-4"><FaBed className="inline-block mr-2" />{room.roomType && room.roomType.roomName}</td>
                    <td className="py-3 px-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(room)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <FaEdit className="inline-block" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(room._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash className="inline-block" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg w-96 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-emerald-800">{isEditMode ? 'Edit Room' : 'Add New Room'}</h3>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNumber">
                    <FaKey className="inline-block mr-2" />Room Number
                  </label>
                  <div className="relative">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      id="roomNumber"
                      type="text"
                      name="roomNumber"
                      value={newRoom.roomNumber}
                      onChange={handleInputChange}
                      required
                    />
                    {isRoomNumberValid !== null && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {isRoomNumberValid ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCross className="text-red-500" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="floor">
                    <FaBuilding className="inline-block mr-2" />Floor
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    id="floor"
                    name="floor"
                    value={newRoom.floor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a floor</option>
                    {floorOptions.map((floor) => (
                      <option key={floor} value={floor}>{floor}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomType">
                    <FaBed className="inline-block mr-2" />Room Type
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    id="roomType"
                    name="roomType"
                    value={newRoom.roomType}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a room type</option>
                    {roomTypes.map((type) => (
                      <option key={type._id} value={type._id}>{type.roomName}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {isEditMode ? 'Update Room' : 'Add Room'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ManageRooms;
