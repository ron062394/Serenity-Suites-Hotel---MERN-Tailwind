import React from 'react';
import { FaShuttleVan } from 'react-icons/fa';
import { MdPets, MdChildCare, MdSecurity } from 'react-icons/md';
import { motion } from 'framer-motion';

const AdditionalServices = () => {
  const services = [
    { icon: <FaShuttleVan className="text-3xl sm:text-4xl mb-4 text-amber-400" />, name: 'Airport Shuttle', description: 'Complimentary transfers' },
    { icon: <MdPets className="text-3xl sm:text-4xl mb-4 text-amber-400" />, name: 'Pet-Friendly Rooms', description: 'Welcoming to furry friends' },
    { icon: <MdChildCare className="text-3xl sm:text-4xl mb-4 text-amber-400" />, name: 'Childcare Services', description: 'Professional care for kids' },
    { icon: <MdSecurity className="text-3xl sm:text-4xl mb-4 text-amber-400" />, name: '24/7 Security', description: 'Round-the-clock protection' },
  ];

  return (
    <section id="additional-services" className="py-12 sm:py-16 md:py-24 bg-emerald-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Exclusive Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src="https://www.hoteldive.com/imgproxy/A8W9Zu1Xgyx2pPQYEqSJ7AiT3sIVzu4_9djHqhTxbhc/g:ce/rs:fill:1200:675:1/bG9jYWw6Ly8vZGl2ZWltYWdlL0dldHR5SW1hZ2VzLTEzODc2MjEwMzIuanBn.webp" 
              alt="Luxury Hotel Amenities" 
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div key={index} className="bg-emerald-700 p-4 sm:p-6 rounded-lg shadow-md" whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }} transition={{ type: "spring", stiffness: 300 }}>
                {service.icon}
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-emerald-200">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;