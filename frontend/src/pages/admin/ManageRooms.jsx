import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaTimes as FaCross } from 'react-icons/fa';

function ManageRooms() {
  const [activeFloor, setActiveFloor] = useState(1);
  const [rooms, setRooms] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingRoomNumbers, setExistingRoomNumbers] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  
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
      const response = await fetch('http://localhost:3001/api/rooms');
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
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/roomTypes');
      if (!response.ok) {
        throw new Error('Failed to fetch room types');
      }
      const data = await response.json();
      setRoomTypes(data);
    } catch (error) {
      console.error('Error fetching room types:', error);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit room ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete room ${id}`);
  };

  const handleAddRoom = () => {
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
    if (existingRoomNumbers.includes(newRoom.roomNumber)) {
      alert('Room number already exists. Please choose a different room number.');
      return;
    }
    console.log('New room:', newRoom);

    try {
      const response = await fetch("http://localhost:3001/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      })

      if (!response.ok) {
        throw new Error("Failed to add room");
      }
      handleCloseModal();
      fetchRooms(); // Refresh the rooms list
      
    } catch (error) {
      console.error("Error adding room:", error.message);
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
              className={`px-4 py-2 rounded-md ${
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
      <motion.button
        className="mb-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors duration-300 flex items-center"
        onClick={handleAddRoom}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus className="mr-2" /> Add New Room
      </motion.button>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Room Number</th>
              <th className="py-3 px-4 text-left">Floor</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms[activeFloor] && rooms[activeFloor].map((room) => (
              <motion.tr 
                key={room._id}
                className="border-b border-gray-200 hover:bg-gray-100"
                whileHover={{ scale: 1.01 }}
              >
                <td className="py-3 px-4">{room.roomNumber}</td>
                <td className="py-3 px-4">{room.floor}</td>
                <td className="py-3 px-4">{room.roomType && room.roomType.roomName}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEdit(room._id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
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
              className="bg-white p-8 rounded-lg w-96"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Add New Room</h3>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNumber">
                    Room Number
                  </label>
                  <div className="relative">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    Floor
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    Room Type
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  <button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Add Room
                  </button>
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
