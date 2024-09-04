import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdRestaurant, MdLocalBar, MdRoomService } from 'react-icons/md';
import { FaWineGlassAlt, FaCocktail, FaUtensilSpoon } from 'react-icons/fa';

function Dining() {
  const diningOptions = [
    { id: 1, name: 'Gourmet Restaurant', description: 'Experience fine dining with our Michelin-starred chefs.', icon: <MdRestaurant />, image: 'https://source.unsplash.com/random/800x600?gourmet,restaurant' },
    { id: 2, name: 'Rooftop Bar', description: 'Enjoy breathtaking views with handcrafted cocktails.', icon: <MdLocalBar />, image: 'https://source.unsplash.com/random/800x600?rooftop,bar' },
    { id: 3, name: 'In-Room Dining', description: 'Savor exquisite meals in the comfort of your room.', icon: <MdRoomService />, image: 'https://source.unsplash.com/random/800x600?room,service' },
  ];

  const culinaryExperiences = [
    { icon: <FaWineGlassAlt />, name: 'Wine Tasting' },
    { icon: <FaCocktail />, name: 'Mixology Classes' },
    { icon: <FaUtensilSpoon />, name: 'Cooking Workshops' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out"
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
              Culinary Delights at Serenity Suites
            </motion.h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              {diningOptions.map((option) => (
                <motion.div 
                  key={option.id} 
                  className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={option.image} alt={option.name} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center mb-2">
                      {option.icon}
                      <h2 className="text-xl sm:text-2xl font-semibold ml-2 text-emerald-800">{option.name}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-emerald-700 mb-4">{option.description}</p>
                    <Link to={`/dining/${option.id}`} className="inline-block px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24 bg-emerald-800 bg-opacity-80 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">Culinary Experiences</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {culinaryExperiences.map((experience, index) => (
                <motion.div 
                  key={index}
                  className="bg-emerald-700 bg-opacity-80 p-4 sm:p-6 rounded-lg shadow-md text-center"
                  whileHover={{ y: -5 }}
                >
                  {React.cloneElement(experience.icon, { className: "text-3xl sm:text-4xl mx-auto" })}
                  <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">{experience.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-white">Make a Reservation</h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white">Secure your table at one of our exquisite dining venues.</p>
            <Link to="/dining-reservation" className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-semibold text-white bg-amber-600 rounded-md shadow-lg hover:bg-amber-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Reserve Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dining;
