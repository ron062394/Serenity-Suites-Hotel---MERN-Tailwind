import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImage, FaBed, FaDollarSign, FaUsers, FaConciergeBell, FaHotel, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoomType() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState({ roomName: '', description: '', price: '', capacity: '', amenities: [], images: [] });
  const [editingId, setEditingId] = useState(null);
  const [newImage, setNewImage] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const suggestedAmenities = ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Swimming Pool', 'Gym', 'Parking'];

  useEffect(() => {
    fetchRoomTypes();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoomType({ ...newRoomType, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingId
        ? `https://serenity-suites-api.vercel.app/api/roomTypes/${editingId}`
        : 'https://serenity-suites-api.vercel.app/api/roomTypes';
      const method = editingId ? 'PATCH' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRoomType),
      });
      if (!response.ok) {
        throw new Error('Failed to save room type');
      }
      fetchRoomTypes();
      setNewRoomType({ roomName: '', description: '', price: '', capacity: '', amenities: [], images: [] });
      setEditingId(null);
      setIsModalOpen(false);
      toast.success(editingId ? 'Room type updated successfully' : 'Room type added successfully');
    } catch (error) {
      console.error('Error saving room type:', error);
      toast.error('Failed to save room type');
    }
  };

  const handleEdit = (roomType) => {
    setEditingId(roomType._id);
    setNewRoomType({ 
      roomName: roomType.roomName, 
      description: roomType.description, 
      price: roomType.price,
      capacity: roomType.capacity,
      amenities: roomType.amenities,
      images: roomType.images
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://serenity-suites-api.vercel.app/api/roomTypes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete room type');
      }
      fetchRoomTypes();
      toast.success('Room type deleted successfully');
    } catch (error) {
      console.error('Error deleting room type:', error);
      toast.error('Failed to delete room type');
    }
  };

  const handleAddImage = () => {
    if (newImage.trim() !== '') {
      setNewRoomType({ ...newRoomType, images: [...newRoomType.images, newImage.trim()] });
      setNewImage('');
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = newRoomType.images.filter((_, i) => i !== index);
    setNewRoomType({ ...newRoomType, images: updatedImages });
  };

  const handleAmenityChange = (amenity) => {
    const updatedAmenities = newRoomType.amenities.includes(amenity)
      ? newRoomType.amenities.filter(a => a !== amenity)
      : [...newRoomType.amenities, amenity];
    setNewRoomType({ ...newRoomType, amenities: updatedAmenities });
  };

  const handleAddCustomAmenity = () => {
    if (newAmenity.trim() !== '' && !newRoomType.amenities.includes(newAmenity.trim())) {
      setNewRoomType({ ...newRoomType, amenities: [...newRoomType.amenities, newAmenity.trim()] });
      setNewAmenity('');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setNewRoomType({ roomName: '', description: '', price: '', capacity: '', amenities: [], images: [] });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h2 className="text-4xl font-bold mb-8 text-emerald-800"><FaHotel className="inline-block mr-2" />Manage Room Types</h2>
      
      <div className="flex justify-start mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg"
        >
          <FaPlus className="mr-2" />
          <span>Add New Room Type</span>
        </motion.button>
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
              className="bg-white p-8 rounded-lg w-full max-w-2xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{editingId ? 'Edit Room Type' : 'Add New Room Type'}</h3>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomName">
                      <FaBed className="inline-block mr-2" />Room Type Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      id="roomName"
                      type="text"
                      name="roomName"
                      value={newRoomType.roomName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                      <FaDollarSign className="inline-block mr-2" />Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      id="price"
                      type="number"
                      name="price"
                      value={newRoomType.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      id="description"
                      name="description"
                      value={newRoomType.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                      <FaUsers className="inline-block mr-2" />Capacity
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      id="capacity"
                      type="number"
                      name="capacity"
                      value={newRoomType.capacity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                      <FaImage className="inline-block mr-2" />Images
                    </label>
                    <div className="flex items-center mb-2">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 mr-2"
                        type="text"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="Enter image URL"
                      />
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded flex items-center"
                      >
                        <FaPlus className="mr-2" /> Add
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                      {newRoomType.images.map((image, index) => (
                        <div key={index} className="relative group border border-gray-300 rounded">
                          <img src={image} alt={`Room ${index + 1}`} className="w-full h-32 object-cover rounded group-hover:opacity-75 transition-opacity duration-200" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4 md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amenities">
                      <FaConciergeBell className="inline-block mr-2" />Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {suggestedAmenities.map((amenity) => (
                        <label key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newRoomType.amenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                            className="mr-2"
                          />
                          {amenity}
                        </label>
                      ))}
                    </div>
                    <div className="flex mt-2">
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 mr-2"
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        placeholder="Enter custom amenity"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomAmenity}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded flex items-center"
                      >
                        <FaPlus className="mr-2" /> Add
                      </button>
                    </div>
                    <div className="flex flex-wrap mt-2">
                      {newRoomType.amenities.filter(amenity => !suggestedAmenities.includes(amenity)).map((amenity, index) => (
                        <span key={index} className="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {amenity}
                          <button
                            type="button"
                            onClick={() => handleAmenityChange(amenity)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  <FaCheck className="inline-block mr-2" />{editingId ? 'Update' : 'Add'} Room Type
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomTypes.map((roomType) => (
            <div key={roomType._id} className="bg-gray-100 rounded-lg p-4 shadow border border-gray-300 hover:bg-gray-200 transition-colors duration-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold"><FaBed className="inline-block mr-2" />{roomType.roomName}</h3>
                <div>
                  <button
                    onClick={() => handleEdit(roomType)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(roomType._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{roomType.description}</p>
              <p className="text-gray-800 font-bold mb-2">Price: ${roomType.price}</p>
              <p className="text-gray-800 mb-2">Capacity: {roomType.capacity}</p>
              <div className="mb-2">
                <strong>Amenities:</strong>
                <div className="flex flex-wrap mt-1">
                  {roomType.amenities.map((amenity, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {roomType.images.map((image, index) => (
                  <img key={index} src={image} alt={`${roomType.roomName} ${index + 1}`} className="w-full h-20 object-cover rounded border border-gray-300 hover:opacity-75 transition-opacity duration-200" />
                ))}
              </div>
            </div>
          ))}
        </div>
    </motion.div>
  );
}

export default RoomType;
