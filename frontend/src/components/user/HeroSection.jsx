import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = ({ fadeInUp }) => {
  const heroImages = [
    'url("https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg")',
    'url("https://www.lifeandmoney.citi.com/rcs/v1/siteIds/lifeandmoney/asset/654b710a5837e2614c3262e8.jpg")',
    'url("https://image.architonic.com/prj2-3/20017680/brewin-design-office-executive-lounge-conrad-hotel-architonic-bdo-conradexecutivelounge-1-01-arcit18.jpg")',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(heroImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentImage(heroImages[currentImageIndex]);
  }, [currentImageIndex]);
  
  return ( 
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden bg-cover bg-center transition-all duration-1000 ease-in-out"
             style={{ backgroundImage: currentImage }}>
      <div className="absolute inset-0 bg-black opacity-50" />
      <motion.div 
        className="container mx-auto h-full flex items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="w-full md:w-4/5 p-4 sm:p-6 md:p-8 flex flex-col items-start text-white">
          <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4" variants={fadeInUp}>
            Serenity Suites
          </motion.h1>
          <motion.p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8" variants={fadeInUp}>
            Where Luxury Meets Tranquility
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link to="/booking" className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-amber-600 border-2 border-amber-600 rounded-md shadow-lg hover:bg-transparent hover:text-amber-600 transition-all duration-300 ease-in-out transform hover:scale-105">
              Book Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;