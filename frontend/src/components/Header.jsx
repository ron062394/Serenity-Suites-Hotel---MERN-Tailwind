import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-emerald-800 bg-opacity-90' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-6">
          <Link to="/">
            <motion.div 
              className="font-serif text-3xl text-white"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <span className="italic">Serenity</span>
              <span className="text-amber-500 italic">Suites</span>
            </motion.div>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {['Home', 'Rooms', 'Dining', 'Events'].map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-white hover:text-amber-500 transition-colors duration-300">
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Link to="/booking" className="hidden md:inline-block px-6 py-2 text-lg font-semibold text-white bg-amber-600 rounded-md shadow-lg hover:bg-amber-700 transition-all duration-300 ease-in-out transform hover:scale-105">
              Book Now
            </Link>
          </motion.div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-emerald-800 bg-opacity-95"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4">
            {['Home', 'Rooms', 'Dining', 'Events'].map((item) => (
              <Link 
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className="block py-2 text-white hover:text-amber-500 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              to="/booking" 
              className="block mt-4 px-6 py-2 text-center text-lg font-semibold text-white bg-amber-600 rounded-md shadow-lg hover:bg-amber-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
