import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <section className="relative h-screen overflow-hidden bg-cover bg-center"
             style={{
               backgroundImage: `url('https://cdn.prod.website-files.com/5c6d6c45eaa55f57c6367749/65046bf150d1abb7e5911702_x-65046bcfdc4f0.webp')`,
             }}
    >
      {/* Background overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="container mx-auto h-full flex items-center justify-center relative z-10">
        {/* Content area centered vertically and horizontally */}
        <div className="w-full md:w-4/5 p-8 flex flex-col items-start text-white">
          <header>
            {/* Main heading for the homepage */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Experience Luxury and Comfort
            </h1>
            {/* Supporting text describing the hotel experience */}
            <p className="text-lg md:text-xl mb-6">
              Discover a world of elegance and relaxation at our premier hotel. From our luxurious rooms and top-notch amenities to our exceptional service, we ensure every stay is unforgettable.
            </p>
          </header>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
