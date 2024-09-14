import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaConciergeBell, FaSwimmingPool, FaUtensils, FaSpa, FaWifi, FaGlassMartini, FaShuttleVan } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ExperienceLuxury = () => {
  const amenities = [
    { icon: FaClock, text: "Check-in: 3:00 PM - Check-out: 11:00 AM", description: "Flexible timings to suit your schedule" },
    { icon: FaConciergeBell, text: "24/7 Concierge Service", description: "Personalized assistance at your fingertips" },
    { icon: FaSwimmingPool, text: "Pool Hours: 6:00 AM - 10:00 PM", description: "Relax in our stunning infinity pool" },
    { icon: FaUtensils, text: "Restaurant: 7:00 AM - 11:00 PM", description: "Savor exquisite cuisine at any hour" },
    { icon: FaSpa, text: "Spa & Wellness Center", description: "Rejuvenate your body and mind" },
    { icon: FaWifi, text: "Complimentary High-Speed Wi-Fi", description: "Stay connected throughout your stay" },
    { icon: FaGlassMartini, text: "Rooftop Bar: 4:00 PM - 1:00 AM", description: "Enjoy breathtaking views with your cocktail" },
    { icon: FaShuttleVan, text: "Complimentary Airport Shuttle", description: "Hassle-free transfers to and from the airport" },
  ];

  return (
    <section className="relative z-20 -mt-16 sm:-mt-20 md:-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-lg shadow-2xl p-6 sm:p-8 md:p-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-emerald-100 text-center">Experience Unparalleled Luxury</h2>
          <p className="text-lg sm:text-xl text-emerald-200 mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
            Immerse yourself in a world of opulence, where every detail is crafted to perfection and every moment is an opportunity for indulgence. Our commitment to excellence ensures your stay is nothing short of extraordinary.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {amenities.map((amenity, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center bg-emerald-700 p-4 rounded-lg shadow-md"
              >
                <amenity.icon className="text-3xl text-emerald-300 mb-2" />
                <p className="text-sm sm:text-base text-emerald-100 font-semibold mb-1">{amenity.text}</p>
                <p className="text-xs sm:text-sm text-emerald-200 text-center">{amenity.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/rooms" className="inline-block px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-emerald-900 bg-gradient-to-r from-emerald-300 to-emerald-400 rounded-full shadow-lg hover:from-emerald-400 hover:to-emerald-500 transition-all duration-300 ease-in-out relative overflow-hidden group">
                <span className="relative z-10">Discover Our Exquisite Rooms</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceLuxury;