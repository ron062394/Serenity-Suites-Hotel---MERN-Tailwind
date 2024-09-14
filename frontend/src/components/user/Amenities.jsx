import React from 'react';
import { FaSwimmingPool, FaWifi, FaDumbbell } from 'react-icons/fa';
import { MdSpa } from 'react-icons/md';
import { motion } from 'framer-motion';

const Amenities = () => {
  return (
    <section id="amenities" className="py-16 sm:py-20 md:py-24 bg-emerald-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-emerald-800">World-Class Amenities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="col-span-1 sm:col-span-2 row-span-2 bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <img src="https://cdn.boatinternational.com/files/2021/01/37a84f40-51c0-11eb-a5c0-7f6de4783497-grace-hotel-santorini-infinity-pool.jpg" alt="Infinity Pool" className="w-full h-48 sm:h-64 md:h-auto object-cover" />
            <div className="p-4 sm:p-6">
              <FaSwimmingPool className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-amber-500" />
              <h3 className="text-xl sm:text-2xl font-semibold text-emerald-800">Infinity Pool</h3>
              <p className="mt-2 text-emerald-600">Swim in luxury with breathtaking views</p>
            </div>
          </motion.div>
          <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between" whileHover={{ scale: 1.05 }}>
            <FaWifi className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-amber-500" />
            <h3 className="text-lg sm:text-xl font-semibold text-emerald-800">High-Speed Wi-Fi</h3>
            <p className="mt-2 text-emerald-600">Stay connected everywhere</p>
          </motion.div>
          <motion.div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col justify-between" whileHover={{ scale: 1.05 }}>
            <FaDumbbell className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-amber-500" />
            <h3 className="text-lg sm:text-xl font-semibold text-emerald-800">State-of-the-Art Gym</h3>
            <p className="mt-2 text-emerald-600">Maintain your fitness routine</p>
          </motion.div>
          <motion.div className="col-span-1 sm:col-span-2 bg-white rounded-lg shadow-md overflow-hidden" whileHover={{ scale: 1.05 }}>
            <img src="https://sequoiamanilabay.com/wp-content/uploads/2018/08/services-1.jpg" alt="Rejuvenating Spa" className="w-full h-48 sm:h-64 md:h-72 object-cover" />
            <div className="p-4 sm:p-6">
              <MdSpa className="text-3xl sm:text-4xl mb-3 sm:mb-4 text-amber-500" />
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-800">Rejuven0ating Spa</h3>
              <p className="mt-2 text-emerald-600">Indulge in relaxation and wellness</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Amenities;