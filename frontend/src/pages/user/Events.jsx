import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaGlassCheers, FaBriefcase } from 'react-icons/fa';

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    { id: 1, name: 'Gala Dinner', description: 'An elegant evening of fine dining and entertainment.', image: 'https://source.unsplash.com/random/800x600?gala,dinner', icon: <FaGlassCheers /> },
    { id: 2, name: 'Business Conference', description: 'A professional gathering for networking and knowledge sharing.', image: 'https://source.unsplash.com/random/800x600?business,conference', icon: <FaBriefcase /> },
    { id: 3, name: 'Wedding Package', description: 'Create your dream wedding in our stunning venues.', image: 'https://source.unsplash.com/random/800x600?wedding', icon: <FaUsers /> },
    { id: 4, name: 'New Year\'s Eve Party', description: 'Welcome the new year in style with our extravagant celebration.', image: 'https://source.unsplash.com/random/800x600?new,year,party', icon: <FaCalendarAlt /> }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="bg-gray-50 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-4xl font-bold mb-12 text-center text-white"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Unforgettable Events at Serenity Suites
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {events.map((event) => (
                <motion.div 
                  key={event.id} 
                  className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEventSelect(event)}
                >
                  <img src={event.image} alt={event.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {event.icon}
                      <h2 className="text-2xl font-semibold ml-2 text-emerald-800">{event.name}</h2>
                    </div>
                    <p className="text-emerald-700 mb-4">{event.description}</p>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {selectedEvent && (
          <section className="py-24 bg-emerald-100 bg-opacity-80">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center text-emerald-800">Book {selectedEvent.name}</h2>
              <form className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-emerald-700 font-semibold mb-2">Your Name</label>
                  <input type="text" id="name" name="name" className="w-full p-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-emerald-700 font-semibold mb-2">Email Address</label>
                  <input type="email" id="email" name="email" className="w-full p-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-emerald-700 font-semibold mb-2">Event Date</label>
                  <input type="date" id="date" name="date" className="w-full p-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="guests" className="block text-emerald-700 font-semibold mb-2">Number of Guests</label>
                  <input type="number" id="guests" name="guests" min="1" className="w-full p-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-emerald-700 font-semibold mb-2">Additional Information</label>
                  <textarea id="message" name="message" rows="4" className="w-full p-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-300">
                  Submit Booking Request
                </button>
              </form>
            </div>
          </section>
        )}

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">Event Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <motion.div 
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={`https://source.unsplash.com/random/400x300?event,${index}`} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-semibold">View Image</p>
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

export default Events;
