import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWifi, FaTv, FaSnowflake, FaGlassMartiniAlt, FaParking, FaDumbbell, FaSwimmer, FaConciergeBell, FaUmbrellaBeach, FaHotTub, FaTree, FaLaptop } from 'react-icons/fa';

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/roomTypes/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch room details');
        }
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!room) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 relative min-h-screen pt-24"> {/* Added mt-16 for top margin */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.h1 
          className="text-5xl font-bold mb-8 text-white text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {room.roomName}
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="relative">
              <img 
                src={room.images[activeImage]} 
                alt={room.roomName} 
                className="w-full h-[500px] object-cover rounded-lg shadow-2xl transition-all duration-500 ease-in-out"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {room.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === activeImage ? 'bg-white' : 'bg-gray-400'}`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {room.images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`${room.name} ${index + 1}`} 
                  className={`w-full h-24 object-cover rounded-lg shadow-md cursor-pointer transition-all duration-300 ${index === activeImage ? 'ring-4 ring-emerald-500' : 'hover:opacity-75'}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-semibold mb-4 text-emerald-800">Room Overview</h2>
              <p className="text-lg text-emerald-700 mb-6">{room.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center text-emerald-700">
                  <FaGlassMartiniAlt className="text-2xl mr-2" />
                  <span>${room.price} per night</span>
                </div>
                <div className="flex items-center text-emerald-700">
                  <FaUmbrellaBeach className="text-2xl mr-2" />
                  <span>{room.capacity} guests</span>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-semibold mb-4 text-emerald-800">Amenities</h2>
              <ul className="grid grid-cols-2 gap-4">
                {room.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center text-emerald-700">
                    {getAmenityIcon(amenity)}
                    <span className="ml-2">{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link 
              to="/booking" 
              className="block w-full text-center px-8 py-4 text-xl font-semibold text-white bg-emerald-600 rounded-lg shadow-xl hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function getAmenityIcon(amenity) {
  switch (amenity.toLowerCase()) {
    case 'wi-fi':
      return <FaWifi className="text-2xl" />;
    case 'tv':
      return <FaTv className="text-2xl" />;
    case 'air conditioning':
      return <FaSnowflake className="text-2xl" />;
    case 'mini bar':
      return <FaGlassMartiniAlt className="text-2xl" />;
    case 'parking':
      return <FaParking className="text-2xl" />;
    case 'gym':
      return <FaDumbbell className="text-2xl" />;
    case 'swimming pool':
      return <FaSwimmer className="text-2xl" />;
    case 'room service':
      return <FaConciergeBell className="text-2xl" />;
    case 'private balcony':
      return <FaUmbrellaBeach className="text-2xl" />;
    case 'jacuzzi':
      return <FaHotTub className="text-2xl" />;
    case 'private garden':
      return <FaTree className="text-2xl" />;
    case 'workspace':
      return <FaLaptop className="text-2xl" />;
    default:
      return <FaConciergeBell className="text-2xl" />;
  }
}

export default RoomDetails;
