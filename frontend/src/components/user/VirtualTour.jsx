import React from 'react';
import { Link } from 'react-router-dom';

const VirtualTour = () => {
  return (
    <section id="virtual-tour" className="py-12 sm:py-16 md:py-24 bg-emerald-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-emerald-800">Experience Serenity Suites Virtually</h2>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-emerald-700">Take a 360° tour of our luxurious rooms and facilities from the comfort of your home.</p>
        <Link to="/virtual-tour" className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-emerald-600 rounded-md shadow-lg hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105">
          Start Virtual Tour
        </Link>
      </div>
    </section>
  );
};

export default VirtualTour;