import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    { name: 'Emma Thompson', text: 'A sanctuary of luxury. Every detail was perfection!', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Michael Chen', text: 'Impeccable service and breathtaking views. A true 5-star experience.', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { name: 'Sophia Rodriguez', text: 'From the spa to the restaurants, absolute bliss at every turn.', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-emerald-100 transform -skew-y-6 -translate-y-32 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 text-center text-emerald-800 relative">
          <span className="relative z-10">What Our Guests Say</span>
          <motion.div
            className="absolute -top-6 -left-6 w-24 h-24 bg-amber-300 rounded-full opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg transform hover:rotate-2 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover border-4 border-emerald-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-amber-400 rounded-full p-1">
                    <FaStar className="text-white" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg text-emerald-800">{testimonial.name}</p>
                  <p className="text-sm text-emerald-600">Verified Guest</p>
                </div>
              </div>
              <FaQuoteLeft className="text-4xl text-amber-400 mb-4" />
              <p className="text-lg mb-4 italic text-emerald-700 leading-relaxed">{testimonial.text}</p>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FaStar className="w-6 h-6" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;