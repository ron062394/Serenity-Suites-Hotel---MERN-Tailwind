import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWifi, FaTv, FaCoffee, FaConciergeBell, FaBath } from 'react-icons/fa';

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // Simulating API call to fetch room details
    const fetchRoomDetails = async () => {
      // Replace this with actual API call
      const mockRoom = {
        id: id,
        name: 'Deluxe Ocean View Suite',
        description: 'Experience luxury with breathtaking ocean views in our spacious Deluxe Suite.',
        price: 450,
        capacity: 2,
        size: '50 sq m',
        amenities: ['Free Wi-Fi', 'Smart TV', 'Mini Bar', '24/7 Room Service', 'Luxury Bathroom'],
        images: [
          'https://source.unsplash.com/random/800x600?luxury,hotel,room1',
          'https://source.unsplash.com/random/800x600?luxury,hotel,room2',
          'https://source.unsplash.com/random/800x600?luxury,hotel,room3',
        ],
      };
      setRoom(mockRoom);
    };

    fetchRoomDetails();
  }, [id]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!room) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-emerald-800"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {room.name}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <img src={room.images[0]} alt={room.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
            <div className="grid grid-cols-3 gap-4">
              {room.images.slice(1).map((image, index) => (
                <img key={index} src={image} alt={`${room.name} ${index + 2}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <p className="text-xl text-emerald-700">{room.description}</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Room Details</h2>
              <ul className="space-y-2 text-emerald-700">
                <li>Price: ${room.price} per night</li>
                <li>Capacity: {room.capacity} guests</li>
                <li>Size: {room.size}</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Amenities</h2>
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
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105"
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
    case 'free wi-fi':
      return <FaWifi />;
    case 'smart tv':
      return <FaTv />;
    case 'mini bar':
      return <FaCoffee />;
    case '24/7 room service':
      return <FaConciergeBell />;
    case 'luxury bathroom':
      return <FaBath />;
    default:
      return null;
  }
}

export default RoomDetails;
