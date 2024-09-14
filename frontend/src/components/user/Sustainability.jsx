import React from 'react';
import { FaLeaf, FaGlobe } from 'react-icons/fa';
import { MdLocalFlorist } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Sustainability = () => {
  const initiatives = [
    { icon: <FaLeaf className="text-4xl sm:text-5xl mb-4 text-emerald-500" />, title: 'Eco-Friendly Practices', description: 'We implement innovative green initiatives to significantly reduce our environmental footprint.', link: '/eco-practices' },
    { icon: <MdLocalFlorist className="text-4xl sm:text-5xl mb-4 text-emerald-500" />, title: 'Local Sourcing', description: 'We actively support and empower local communities by prioritizing local products and ingredients.', link: '/local-sourcing' },
    { icon: <FaGlobe className="text-4xl sm:text-5xl mb-4 text-emerald-500" />, title: 'Carbon Neutral', description: "We're committed to carbon neutrality through investments in verified environmental conservation projects.", link: '/carbon-neutral' }
  ];

  return (
    <section id="sustainability" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-emerald-800">Our Commitment to Sustainability</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {initiatives.map((item, index) => (
            <motion.div key={index} className="bg-emerald-50 p-6 sm:p-8 rounded-lg shadow-lg text-center transition-all duration-300" whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
              {item.icon}
              <h3 className="text-xl sm:text-2xl font-semibold text-emerald-800 mb-3">{item.title}</h3>
              <p className="text-emerald-700 mb-4">{item.description}</p>
              <Link to={item.link} className="inline-block px-4 sm:px-6 py-2 text-sm sm:text-base font-medium text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors duration-300">
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sustainability;