import React from 'react';
import { motion } from 'framer-motion';

const HotelGallery = ({ galleryImages, galleryIndex, handlePrevGallery, handleNextGallery, getGalleryDescription, setGalleryIndex }) => {
  // Check if galleryImages is undefined or null, and provide a default empty array
  const images = galleryImages || [];

  return (
    <section id="hotel-gallery" className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-amber-400 to-amber-600 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Experience Unparalleled Luxury</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-full md:w-2/3 overflow-hidden rounded-lg shadow-xl mb-8 md:mb-0">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${galleryIndex * 100}%)` }}>
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img src={image} alt={`Luxurious Hotel View ${index + 1}`} className="w-full h-64 sm:h-80 md:h-[500px] object-cover" />
                </div>
              ))}
            </div>
            <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-amber-600 p-2 sm:p-3 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300" onClick={handlePrevGallery} aria-label="Previous image">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-amber-600 p-2 sm:p-3 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300" onClick={handleNextGallery} aria-label="Next image">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="w-full md:w-1/3 md:pl-8">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">
              {getGalleryDescription && getGalleryDescription(galleryIndex)?.title}
            </h3>
            <p className="text-base sm:text-lg">
              {getGalleryDescription && getGalleryDescription(galleryIndex)?.description}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button key={index} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${index === galleryIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`} onClick={() => setGalleryIndex(index)} aria-label={`Go to image ${index + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelGallery;