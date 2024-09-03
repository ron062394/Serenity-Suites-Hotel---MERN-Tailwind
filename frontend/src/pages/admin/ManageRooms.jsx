import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function ManageRooms() {
  const [activeFloor, setActiveFloor] = useState(1);
  const [rooms, setRooms] = useState({
    1: [
      { id: 101, number: '101', type: 'Standard', capacity: 2, price: 100 },
      { id: 102, number: '102', type: 'Deluxe', capacity: 3, price: 150 },
    ],
    2: [
      { id: 201, number: '201', type: 'Suite', capacity: 4, price: 200 },
      { id: 202, number: '202', type: 'Standard', capacity: 2, price: 100 },
    ],
    3: [
      { id: 301, number: '301', type: 'Deluxe', capacity: 3, price: 150 },
      { id: 302, number: '302', type: 'Suite', capacity: 4, price: 200 },
    ],
  });

  const handleEdit = (id) => {
    console.log(`Edit room ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete room ${id}`);
  };

  const handleAddRoom = () => {
    console.log('Add new room');
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
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Capacity</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms[activeFloor].map((room) => (
              <motion.tr 
                key={room.id}
                className="border-b border-gray-200 hover:bg-gray-100"
                whileHover={{ scale: 1.01 }}
              >
                <td className="py-3 px-4">{room.number}</td>
                <td className="py-3 px-4">{room.type}</td>
                <td className="py-3 px-4">{room.capacity}</td>
                <td className="py-3 px-4">${room.price}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEdit(room.id)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
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
    </motion.div>
  );
}

export default ManageRooms;
