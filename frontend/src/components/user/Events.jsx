import React from 'react';
import { MdEvent } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <section id="events" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-emerald-800">Unforgettable Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <MdEvent className="text-5xl sm:text-6xl mb-6 mx-auto text-amber-500" />
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-emerald-700">From fairy-tale weddings to high-powered conferences, create memories in our stunning venues.</p>
            <Link to="/events" className="inline-block px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-emerald-800 rounded-md shadow-lg hover:bg-emerald-900 transition-all duration-300 ease-in-out transform hover:scale-105">
              Start Planning
            </Link>
          </div>
          <img src="https://diamondhotel.com/wp-content/uploads/2024/02/diamond-hotel-ballroom-wedding-set-up.jpg" alt="Luxury Event Space" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default Events;