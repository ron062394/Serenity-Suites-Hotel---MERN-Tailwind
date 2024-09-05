import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaGlassCheers, FaBriefcase } from 'react-icons/fa';

function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    { id: 1, name: 'Gala Dinner', description: 'An elegant evening of fine dining and entertainment.', image: 'https://img.themirahotel.com/wp-content/uploads/2021/09/chi-heng-foundation-gala-dinner-11-m-43.jpg', icon: <FaGlassCheers /> },
    { id: 2, name: 'Business Conference', description: 'A professional gathering for networking and knowledge sharing.', image: 'https://www.ellicottdevelopment.com/wp-content/uploads/2021/02/Conference-room-Ellicott.jpg', icon: <FaBriefcase /> },
    { id: 3, name: 'Wedding Package', description: 'Create your dream wedding in our stunning venues.', image: 'https://www.brides.com/thmb/HuECXgUdCPn5zEVThcWjZdiD_nc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grace-greg_01-d23b238e0a534765b935897d44d45d80.jpg', icon: <FaUsers /> },
    { id: 4, name: 'New Year\'s Eve Party', description: 'Welcome the new year in style with our extravagant celebration.', image: 'https://ibizaglobalradio.com/wp-content/uploads/2018/04/Pacha.jpg', icon: <FaCalendarAlt /> }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
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
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-white"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Unforgettable Events at Serenity Suites
            </motion.h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {events.map((event) => (
                <motion.div 
                  key={event.id} 
                  className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEventSelect(event)}
                >
                  <img src={event.image} alt={event.name} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center mb-2">
                      {event.icon}
                      <h2 className="text-xl sm:text-2xl font-semibold ml-2 text-emerald-800">{event.name}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-emerald-700 mb-4">{event.description}</p>
                    <button className="px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-300">
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {selectedEvent && (
          <section className="py-12 sm:py-16 md:py-24 bg-emerald-100 bg-opacity-80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-emerald-800">Book {selectedEvent.name}</h2>
              <form className="max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
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
        
        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-white">Event Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                'https://www.windowworld.com/uploads/images/news/new-years-eve-friends-sparklers.jpg',
                'https://www.lottehotel.com/content/dam/lotte-hotel/lotte/world/weddings/211101-03-2000-wed-LTWO.jpg.thumb.768.768.jpg',
                'https://images.squarespace-cdn.com/content/v1/565e026ae4b02f39f71242f5/61220fe5-ac8a-4127-a1a8-e53056e631ff/theumsteadluxuryevent_luxurybirthdayparty_eventsattheumsteadcary-15%281%29.jpg',
                'https://revenue-hub.com/wp-content/uploads/2020/11/large-hotel-meeting-space.jpg',
                'https://www.handpickedhotels.co.uk/images/hotels/wood-hall/medium/food-beverage-restaurant/afternoon-tea/christenings/Wood%20Hall-145.jpg',
                'https://www.theplazany.com/wp-content/uploads/2016/02/Events_Venues_MeetingRooms_Hero_01.jpg',
                'https://www.firmdalehotels.com/media/11483/HH-Pool-Dinner-straight-on-HR.jpg?anchor=center&mode=crop&quality=90&width=1596&height=1088&bgcolor=fff&rnd=131713914004700000&sig=105c5cfa4a346715796e825085ac0f30',
                'https://wp-media-partyslate.imgix.net/2020/05/photo-8e48c05f-1c28-4930-adf4-84d1f86602ed.jpg?auto=compress%2Cformat&fit=scale&h=840&ixlib=php-3.3.1&w=1260&wpsize=huge'
              ].map((src, index) => (
                <motion.div 
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={src} alt={`Event ${index + 1}`} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-base sm:text-lg font-semibold">View Image</p>
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
