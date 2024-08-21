import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://wallpaper.forfun.com/fetch/a4/a49e63e310d934d816d1bc87fc78ec03.jpeg')`,
      }}
    >
      <div
        className="absolute top-1/2 left-0 w-2/5 bg-black bg-opacity-50 p-8 flex flex-col items-start text-white transform -translate-y-1/2"
        style={{
          borderTop: '4px solid #ff4655', // Inline style for gold top border
        }}
      >
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Experience Luxury and Comfort</h1>
          <p className="text-lg md:text-xl mb-6">
            Discover a world of elegance and relaxation at our premier hotel. From our luxurious rooms and top-notch amenities to our exceptional service, we ensure every stay is unforgettable. Book your escape today and enjoy the perfect blend of comfort and sophistication.
          </p>
          <Link
            className="relative inline-block py-3 mb-5 text-sm font-bold uppercase text-[#0f1923] border-none bg-none cursor-pointer transition-all duration-150 ease-in-out group"
            to="/book-now"
          >
            <span className="relative block px-6 py-3 text-white bg-[#0f1923] overflow-hidden shadow-inner">
              <span className="relative z-10">Book Now</span>
              <span className="absolute top-0 left-[-8px] bottom-[-1px] w-0 bg-[#ff4655] transform skew-x-[-15deg] transition-all duration-200 ease-in-out group-hover:w-[calc(100%+15px)]" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
