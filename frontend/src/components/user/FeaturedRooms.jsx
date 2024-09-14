import React from 'react';
import { FaCocktail, FaConciergeBell, FaSpa } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedRooms = () => {
  const rooms = [
    { name: 'Royal Suite', description: 'Indulge in opulence with panoramic views', icon: <FaCocktail />, image: 'https://i.pinimg.com/originals/a4/33/f5/a433f556def0e5a4e81456dec117419c.jpg' },
    { name: 'Zen Garden Room', description: 'Find peace in nature-inspired luxury', icon: <FaSpa />, image: 'https://t3.ftcdn.net/jpg/08/14/47/24/360_F_814472486_Y7EFA18zcmyjmEidwodqFlHrEE4Ndnk7.jpg' },
    { name: 'Skyline Penthouse', description: 'Experience urban elegance at its finest', icon: <FaConciergeBell />, image: 'https://aluplex.com/wp-content/uploads/2020/11/Penthouse-Suite-Skylights-and-Why-Your-Hotel-Needs-Them-1024x576.jpg' },
  ];

  return (
    <section id="featured-rooms" className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-emerald-800">Exquisite Accommodations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
          {rooms.map((room, index) => (
            <motion.div 
              key={index} 
              className="bg-emerald-50 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={room.image} alt={room.name} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
              <div className="p-4 sm:p-6">
                <div className="flex items-center mb-2">
                  {room.icon}
                  <h3 className="text-xl sm:text-2xl font-semibold ml-2 text-emerald-800">{room.name}</h3>
                </div>
                <p className="text-emerald-700 mb-4">{room.description}</p>
                <Link to="/rooms" className="text-amber-600 hover:underline flex items-center">
                  Explore <span className="ml-1">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;