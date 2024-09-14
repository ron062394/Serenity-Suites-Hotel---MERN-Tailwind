import React, { useState, useEffect } from 'react';
import HotelGallery from '../../components/user/HotelGallery';
import Testimonials from '../../components/user/Testimonials';
import Dining from '../../components/user/Dining';
import Events from '../../components/user/Events';
import VirtualTour from '../../components/user/VirtualTour';
import Sustainability from '../../components/user/Sustainability';
import AdditionalServices from '../../components/user/AdditionalServices';
import RewardsProgram from '../../components/user/RewardsProgram';
import HeroSection from '../../components/user/HeroSection';
import ExperienceLuxury from '../../components/user/ExperienceLuxury';
import FeaturedRooms from '../../components/user/FeaturedRooms';
import Amenities from '../../components/user/Amenities';

function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    // ... your hero images
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
      <HeroSection currentImage={heroImages[currentImageIndex]} fadeInUp={fadeInUp} />
      <ExperienceLuxury />
      <FeaturedRooms />
      <Amenities />
      <HotelGallery />
      <Testimonials />
      <Dining />
      <Events />
      <VirtualTour />
      <Sustainability />
      <AdditionalServices />
      <RewardsProgram />
    </div>
  );
}

export default HomePage;