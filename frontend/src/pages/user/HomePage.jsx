import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWifi, FaSwimmingPool, FaDumbbell, FaSpa, FaCocktail, FaConciergeBell, FaLeaf, FaShuttleVan, FaGlobe } from 'react-icons/fa';
import { MdRestaurant, MdEvent, MdLocalFlorist, MdSpa, MdPets, MdChildCare, MdSecurity } from 'react-icons/md';
import { motion } from 'framer-motion';

function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    'url("https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg")',
    'url("https://www.lifeandmoney.citi.com/rcs/v1/siteIds/lifeandmoney/asset/654b710a5837e2614c3262e8.jpg")',
    'url("https://image.architonic.com/prj2-3/20017680/brewin-design-office-executive-lounge-conrad-hotel-architonic-bdo-conradexecutivelounge-1-01-arcit18.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50">
      <section id="hero" className="relative h-[80vh] overflow-hidden bg-cover bg-center transition-all duration-1000 ease-in-out"
               style={{
                 backgroundImage: heroImages[currentImageIndex],
               }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <motion.div 
          className="container mx-auto h-full flex items-center justify-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="w-full md:w-4/5 p-8 flex flex-col items-start text-white">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4"
              variants={fadeInUp}
            >
              Serenity Suites
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8"
              variants={fadeInUp}
            >
              Where Luxury Meets Tranquility
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link to="/booking" className="inline-block px-8 py-3 text-lg font-semibold text-white bg-amber-600 border-2 border-amber-600 rounded-md shadow-lg hover:bg-transparent hover:text-amber-600 transition-all duration-300 ease-in-out transform hover:scale-105">
                Book Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-20 -mt-24">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-emerald-800">Experience Luxury</h2>
            <p className="text-lg text-emerald-700 mb-6">Discover our world-class amenities and unparalleled service.</p>
            <Link to="/rooms" className="inline-block px-6 py-2 text-lg font-semibold text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Explore Our Rooms
            </Link>
          </div>
        </div>
      </section>

      <section id="featured-rooms" className="py-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-800">Exquisite Accommodations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Royal Suite', description: 'Indulge in opulence with panoramic views', icon: <FaCocktail />, image: 'https://www.theplazany.com/wp-content/uploads/2016/02/DSC_3020-scaled.jpg' },
              { name: 'Zen Garden Room', description: 'Find peace in nature-inspired luxury', icon: <MdLocalFlorist />, image: 'https://spacesmag.com/wp-content/uploads/2022/02/46.webp' },
              { name: 'Skyline Penthouse', description: 'Experience urban elegance at its finest', icon: <FaConciergeBell />, image: 'https://image-tc.galaxy.tf/wijpeg-b87cxl0q3gmcsm0jrbnnfwkvb/web-nylo-king-city-view-1_standard.jpg?crop=106%2C0%2C1688%2C1266' },
            ].map((room, index) => (
              <motion.div 
                key={index} 
                className="bg-emerald-50 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={room.image} alt={room.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {room.icon}
                    <h3 className="text-2xl font-semibold ml-2 text-emerald-800">{room.name}</h3>
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

      <section id="amenities" className="py-24 bg-emerald-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-800">World-Class Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaWifi className="text-4xl mb-4 text-amber-500" />, name: 'High-Speed Wi-Fi' },
              { icon: <FaSwimmingPool className="text-4xl mb-4 text-amber-500" />, name: 'Infinity Pool' },
              { icon: <FaDumbbell className="text-4xl mb-4 text-amber-500" />, name: 'State-of-the-Art Gym' },
              { icon: <MdSpa className="text-4xl mb-4 text-amber-500" />, name: 'Rejuvenating Spa' },
            ].map((amenity, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md text-center"
                whileHover={{ y: -5 }}
              >
                {amenity.icon}
                <h3 className="text-xl font-semibold text-emerald-800">{amenity.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="special-offers" className="py-24 bg-gradient-to-r from-amber-400 to-amber-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Exclusive Experiences</h2>
          <p className="text-xl mb-12">Unlock extraordinary moments with our curated packages</p>
          <Link to="/special-offers" className="inline-block px-8 py-3 text-lg font-semibold text-amber-600 bg-white rounded-md shadow-lg hover:bg-amber-50 transition-all duration-300 ease-in-out transform hover:scale-105">
            Discover More
          </Link>
        </div>
      </section>

      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-800">Guest Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Emma Thompson', text: '"A sanctuary of luxury. Every detail was perfection!"' },
              { name: 'Michael Chen', text: '"Impeccable service and breathtaking views. A true 5-star experience."' },
              { name: 'Sophia Rodriguez', text: '"From the spa to the restaurants, absolute bliss at every turn."' },
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className="bg-emerald-50 p-8 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-lg mb-4 italic text-emerald-800">{testimonial.text}</p>
                <p className="font-semibold text-amber-600">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="dining" className="py-24 bg-emerald-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Culinary Delights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <img src="https://source.unsplash.com/random/800x600?gourmet,restaurant" alt="Gourmet Dining" className="rounded-lg shadow-lg" />
            <div>
              <MdRestaurant className="text-6xl mb-6 mx-auto text-amber-400" />
              <p className="text-xl mb-8">Embark on a gastronomic journey with our Michelin-starred chefs and sommelier-curated wine list.</p>
              <Link to="/dining" className="inline-block px-8 py-3 text-lg font-semibold text-white bg-amber-600 rounded-md shadow-lg hover:bg-amber-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                Reserve Your Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="py-24 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-emerald-800">Unforgettable Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <MdEvent className="text-6xl mb-6 mx-auto text-amber-500" />
              <p className="text-xl mb-8 text-emerald-700">From fairy-tale weddings to high-powered conferences, create memories in our stunning venues.</p>
              <Link to="/events" className="inline-block px-8 py-3 text-lg font-semibold text-white bg-emerald-800 rounded-md shadow-lg hover:bg-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105">
                Start Planning
              </Link>
            </div>
            <img src="https://diamondhotel.com/wp-content/uploads/2024/02/diamond-hotel-ballroom-wedding-set-up.jpg" alt="Luxury Event Space" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      <section id="virtual-tour" className="py-24 bg-emerald-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-emerald-800">Experience Serenity Suites Virtually</h2>
          <p className="text-xl mb-8 text-emerald-700">Take a 360° tour of our luxurious rooms and facilities from the comfort of your home.</p>
          <Link to="/virtual-tour" className="inline-block px-8 py-3 text-lg font-semibold text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            Start Virtual Tour
          </Link>
        </div>
      </section>

      <section id="sustainability" className="py-24 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-800">Our Commitment to Sustainability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FaLeaf className="text-4xl mb-4 text-emerald-500" />, title: 'Eco-Friendly Practices', description: 'We implement green initiatives to reduce our environmental impact.' },
              { icon: <MdLocalFlorist className="text-4xl mb-4 text-emerald-500" />, title: 'Local Sourcing', description: 'We support local communities by sourcing products and ingredients locally.' },
              { icon: <FaGlobe className="text-4xl mb-4 text-emerald-500" />, title: 'Carbon Neutral', description: 'We offset our carbon footprint through various environmental projects.' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-emerald-50 p-6 rounded-lg shadow-md text-center"
                whileHover={{ y: -5 }}
              >
                {item.icon}
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">{item.title}</h3>
                <p className="text-emerald-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="additional-services" className="py-24 bg-emerald-800 text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Additional Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaShuttleVan className="text-4xl mb-4 text-amber-400" />, name: 'Airport Shuttle' },
              { icon: <MdPets className="text-4xl mb-4 text-amber-400" />, name: 'Pet-Friendly Rooms' },
              { icon: <MdChildCare className="text-4xl mb-4 text-amber-400" />, name: 'Childcare Services' },
              { icon: <MdSecurity className="text-4xl mb-4 text-amber-400" />, name: '24/7 Security' },
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-emerald-700 p-6 rounded-lg shadow-md text-center"
                whileHover={{ y: -5 }}
              >
                {service.icon}
                <h3 className="text-xl font-semibold">{service.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="rewards-program" className="py-24 bg-amber-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-amber-800">Serenity Rewards Program</h2>
          <p className="text-xl mb-12 text-amber-700">Join our exclusive rewards program and enjoy special perks, discounts, and unique experiences.</p>
          <Link to="/rewards" className="inline-block px-8 py-3 text-lg font-semibold text-white bg-amber-600 rounded-md shadow-lg hover:bg-amber-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            Join Now
          </Link>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
