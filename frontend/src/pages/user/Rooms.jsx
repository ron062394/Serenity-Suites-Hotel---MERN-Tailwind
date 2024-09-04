import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Rooms() {
  const rooms = [
    { id: 1, name: 'Deluxe Suite', description: 'Spacious and luxurious suite with a stunning view.', image: 'https://source.unsplash.com/random/800x600?luxury,hotel,room1' },
    { id: 2, name: 'Executive Room', description: 'Modern and comfortable room perfect for business travelers.', image: 'https://source.unsplash.com/random/800x600?luxury,hotel,room2' },
    { id: 3, name: 'Standard Room', description: 'Cozy and affordable room for a pleasant stay.', image: 'https://source.unsplash.com/random/800x600?luxury,hotel,room3' },
    { id: 4, name: 'Family Suite', description: 'Spacious suite ideal for families or groups.', image: 'https://source.unsplash.com/random/800x600?luxury,hotel,room4' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center text-white"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Exquisite Accommodations
            </motion.h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {rooms.map((room) => (
                <motion.div 
                  key={room.id} 
                  className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={room.image} alt={room.name} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                  <div className="p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-emerald-800">{room.name}</h2>
                    <p className="text-sm sm:text-base text-emerald-700 mb-4">{room.description}</p>
                    <Link to={`/rooms/${room.id}`} className="inline-block px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                      Explore
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Rooms;
