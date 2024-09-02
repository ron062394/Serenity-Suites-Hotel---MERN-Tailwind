import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaBed, FaCreditCard } from 'react-icons/fa';

function Booking() {
  const [step, setStep] = useState(1);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Select Dates</h2>
            <div className="mb-4">
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in Date</label>
              <input type="date" id="checkIn" name="checkIn" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out Date</label>
              <input type="date" id="checkOut" name="checkOut" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Guest Information</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Select Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Deluxe Suite', 'Royal Suite', 'Zen Garden Room', 'Skyline Penthouse'].map((room, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold">{room}</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <button className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">Select</button>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input type="text" id="cardNumber" name="cardNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input type="text" id="expiry" name="expiry" placeholder="MM/YY" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <input type="text" id="cvv" name="cvv" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-emerald-600 text-white py-4 px-6">
          <h1 className="text-3xl font-bold">Book Your Stay</h1>
        </div>
        <div className="p-6">
          <div className="flex justify-between mb-8">
            {[FaCalendarAlt, FaUser, FaBed, FaCreditCard].map((Icon, index) => (
              <div key={index} className={`flex flex-col items-center ${step > index + 1 ? 'text-emerald-600' : 'text-gray-400'}`}>
                <Icon className="text-2xl mb-2" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === index + 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          {renderStep()}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                Previous
              </button>
            )}
            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
                Next
              </button>
            ) : (
              <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors">
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
