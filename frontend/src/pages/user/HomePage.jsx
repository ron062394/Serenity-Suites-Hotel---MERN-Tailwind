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

  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryImages = [
    'https://www.travelandleisure.com/thmb/uWwv2wR4LeMCGRUgvpz8MKAzuyk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/wynn-las-vegas-encore-three-bed-duplex-LUXESUITE0122-6c1cafc69be04401a975bd7edb7a1e84.jpg',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/95/0d/90/le-rapp-hotel.jpg?w=1200&h=-1&s=1',
    'https://toohotel.com/wp-content/uploads/2022/09/TOO_restaurant_Panoramique_vue_Paris_nuit_v2-scaled.jpg',
    'https://media-magazine.trivago.com/wp-content/uploads/2015/06/07134522/spa-hotels-in-london-the-mondrian-treatment-room.jpeg',
    'https://galeriemagazine.com/wp-content/uploads/2020/09/le-bristol-paris-jardin_COVER.jpg',
    'https://media.licdn.com/dms/image/D4D12AQHv91WGkGrwew/article-cover_image-shrink_720_1280/0/1680587500469?e=2147483647&v=beta&t=zxpVEh3FhM-S8DoQa22T-silfvOJzXbbshwv-sO0D8k'
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

  const handlePrevGallery = () => {
    setGalleryIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextGallery = () => {
    setGalleryIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  };

  const getGalleryDescription = (index) => {
    const descriptions = [
      { title: "Luxurious Suites", description: "Experience unparalleled comfort in our meticulously designed suites. Each room is a sanctuary of elegance, featuring plush furnishings, state-of-the-art amenities, and breathtaking views. Our suites blend modern luxury with timeless sophistication to ensure an unforgettable stay." },
      { title: "Elegant Interiors", description: "Immerse yourself in the sophisticated ambiance of our hotel. From the grand lobby to the intimate lounges, every space is thoughtfully curated with exquisite artwork, custom furnishings, and opulent decor. The harmonious blend of colors and textures creates an atmosphere of refined luxury." },
      { title: "Panoramic Views", description: "Enjoy breathtaking vistas from our strategically located rooms. Wake up to stunning cityscapes or serene natural landscapes that change with the light throughout the day. Our floor-to-ceiling windows and private balconies offer unobstructed views that serve as a constant reminder of your extraordinary surroundings." },
      { title: "Rejuvenating Spa", description: "Indulge in relaxation at our world-class spa facilities. Our expert therapists offer a range of treatments inspired by ancient healing traditions and modern wellness techniques. From soothing massages to rejuvenating facials, each treatment is designed to restore balance to your body and mind." },
      { title: "Lush Gardens", description: "Stroll through our beautifully landscaped gardens for a serene escape. Meander along winding paths, discover hidden nooks, and breathe in the fragrance of exotic flowers. Our gardens provide a tranquil oasis where you can reconnect with nature and find moments of peace amidst your travels." },
      { title: "Exquisite Dining", description: "Savor culinary delights at our gourmet restaurants. Our world-renowned chefs craft innovative menus using the finest local and international ingredients. From intimate fine dining experiences to casual al fresco meals, each restaurant offers a unique ambiance and a commitment to gastronomic excellence." }
    ];
    return descriptions[index];
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
          <div className="grid grid-cols-4 gap-4">
            <motion.div 
              className="col-span-2 row-span-2 bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src="https://cdn.boatinternational.com/files/2021/01/37a84f40-51c0-11eb-a5c0-7f6de4783497-grace-hotel-santorini-infinity-pool.jpg" alt="Infinity Pool" className="w-full  object-cover" />
              <div className="p-6">
                <FaSwimmingPool className="text-4xl mb-4 text-amber-500" />
                <h3 className="text-2xl font-semibold text-emerald-800">Infinity Pool</h3>
                <p className="mt-2 text-emerald-600">Swim in luxury with breathtaking views</p>
              </div>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
              whileHover={{ scale: 1.05 }}
            >
              <FaWifi className="text-4xl mb-4 text-amber-500" />
              <h3 className="text-xl font-semibold text-emerald-800">High-Speed Wi-Fi</h3>
              <p className="mt-2 text-emerald-600">Stay connected everywhere</p>
            </motion.div>
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
              whileHover={{ scale: 1.05 }}
            >
              <FaDumbbell className="text-4xl mb-4 text-amber-500" />
              <h3 className="text-xl font-semibold text-emerald-800">State-of-the-Art Gym</h3>
              <p className="mt-2 text-emerald-600">Maintain your fitness routine</p>
            </motion.div>
            <motion.div 
              className="col-span-2 bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img src="https://sequoiamanilabay.com/wp-content/uploads/2018/08/services-1.jpg" alt="Rejuvenating Spa" className="w-full h-72 object-cover" />
              <div className="p-6">
                <MdSpa className="text-4xl mb-4 text-amber-500" />
                <h3 className="text-xl font-semibold text-emerald-800">Rejuvenating Spa</h3>
                <p className="mt-2 text-emerald-600">Indulge in relaxation and wellness</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="hotel-gallery" className="py-24 bg-gradient-to-r from-amber-400 to-amber-600 text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience Unparalleled Luxury</h2>
          <div className="flex items-center">
            <div className="relative w-2/3 overflow-hidden rounded-lg shadow-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
              >
                {galleryImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <img
                      src={image}
                      alt={`Luxurious Hotel View ${index + 1}`}
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                ))}
              </div>
              <button 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-amber-600 p-3 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300"
                onClick={handlePrevGallery}
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-amber-600 p-3 rounded-full opacity-75 hover:opacity-100 transition-opacity duration-300"
                onClick={handleNextGallery}
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="w-1/3 pl-8">
              <h3 className="text-2xl font-semibold mb-4">
                {getGalleryDescription(galleryIndex).title}
              </h3>
              <p className="text-lg">
                {getGalleryDescription(galleryIndex).description}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === galleryIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                onClick={() => setGalleryIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
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
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Culinary Delights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img src="https://media.istockphoto.com/id/1446478827/photo/a-chef-is-cooking-in-his-restaurants-kitchen.jpg?s=612x612&w=0&k=20&c=jwKJmGErrLe2XsTWNYEEyiNicudYVA4j8jvnTiJdp58=" alt="Gourmet Dining" className="rounded-lg shadow-lg w-full h-auto" />
            <div className="flex flex-col items-center md:items-start">
              <MdRestaurant className="text-6xl mb-4 text-amber-400" />
              <p className="text-lg mb-6 text-justify">
                Embark on a gastronomic journey at Serenity Suites, where culinary excellence meets unparalleled luxury. Our Michelin-starred chefs craft exquisite dishes that tantalize the taste buds and ignite the senses. From farm-fresh local ingredients to exotic flavors from around the world, every meal is a masterpiece. Complement your dining experience with selections from our sommelier-curated wine list, featuring rare vintages and boutique labels. Whether you're savoring a romantic dinner for two or hosting a grand celebration, our diverse dining venues offer the perfect ambiance for every occasion.
              </p>
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
              { icon: <FaLeaf className="text-5xl mb-4 text-emerald-500" />, title: 'Eco-Friendly Practices', description: 'We implement innovative green initiatives to significantly reduce our environmental footprint.', link: '/eco-practices' },
              { icon: <MdLocalFlorist className="text-5xl mb-4 text-emerald-500" />, title: 'Local Sourcing', description: 'We actively support and empower local communities by prioritizing local products and ingredients.', link: '/local-sourcing' },
              { icon: <FaGlobe className="text-5xl mb-4 text-emerald-500" />, title: 'Carbon Neutral', description: "We're committed to carbon neutrality through investments in verified environmental conservation projects.", link: '/carbon-neutral' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-emerald-50 p-8 rounded-lg shadow-lg text-center transition-all duration-300"
                whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
              >
                {item.icon}
                <h3 className="text-2xl font-semibold text-emerald-800 mb-3">{item.title}</h3>
                <p className="text-emerald-700 mb-4">{item.description}</p>
                <Link to={item.link} className="inline-block px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="additional-services" className="py-24 bg-emerald-800 text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Exclusive Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-w-16 aspect-h-9">
              <img 
                src="https://www.hoteldive.com/imgproxy/A8W9Zu1Xgyx2pPQYEqSJ7AiT3sIVzu4_9djHqhTxbhc/g:ce/rs:fill:1200:675:1/bG9jYWw6Ly8vZGl2ZWltYWdlL0dldHR5SW1hZ2VzLTEzODc2MjEwMzIuanBn.webp" 
                alt="Luxury Hotel Amenities" 
                className="object-cover w-full h-full rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <FaShuttleVan className="text-4xl mb-4 text-amber-400" />, name: 'Airport Shuttle', description: 'Complimentary transfers' },
                { icon: <MdPets className="text-4xl mb-4 text-amber-400" />, name: 'Pet-Friendly Rooms', description: 'Welcoming to furry friends' },
                { icon: <MdChildCare className="text-4xl mb-4 text-amber-400" />, name: 'Childcare Services', description: 'Professional care for kids' },
                { icon: <MdSecurity className="text-4xl mb-4 text-amber-400" />, name: '24/7 Security', description: 'Round-the-clock protection' },
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  className="bg-emerald-700 p-6 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-emerald-200">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="rewards-program" className="py-24 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Serenity Rewards Program</h2>
              <p className="text-lg mb-6 text-gray-600">Experience exclusive benefits and unparalleled luxury with our premier rewards program.</p>
              <div className="space-y-4">
                {[
                  { title: "Earn Points", description: "Accumulate points with every stay" },
                  { title: "Exclusive Perks", description: "Access special rates and premium amenities" },
                  { title: "Curated Experiences", description: "Enjoy bespoke experiences at our properties" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mr-3 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/rewards" className="inline-block mt-8 px-6 py-3 text-lg font-semibold text-white bg-emerald-600 rounded-md shadow-md hover:bg-emerald-700 transition-all duration-300 ease-in-out">
                Join Serenity Rewards
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://www.gorewards.com.ph/img/section2-c2.png" 
                  alt="Serenity Rewards Program" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
