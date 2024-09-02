import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function UserLogin() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50">
      <section id='user-login' className='flex justify-center items-center min-h-screen bg-cover bg-center'
        style={{
          backgroundImage: `url('https://source.unsplash.com/random/1920x1080?luxury,hotel')`,
        }}
      >
        <div className='container mx-auto px-4'>
          <motion.div 
            className='bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto'
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-bold mb-8 text-center text-emerald-800">Welcome Back to Serenity Suites</h2>
            <div className='flex flex-col md:flex-row gap-12'>
              {/* Login Banner */}
              <div className='flex-1'>
                <h3 className='text-2xl font-semibold mb-4 text-emerald-700'>Experience Luxury Again</h3>
                <p className='text-lg text-emerald-600 mb-4'>Log in to your account to access exclusive benefits and continue your journey with Serenity Suites.</p>
                <ul className='list-disc list-inside text-emerald-600 space-y-2'>
                  <li>View your upcoming reservations</li>
                  <li>Access special member rates</li>
                  <li>Manage your loyalty points</li>
                  <li>Customize your stay preferences</li>
                </ul>
              </div>

              {/* Login form */}
              <form className='flex-1 flex flex-col gap-4'>
                <input type="email" id="email" name="email" placeholder="Email Address" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                <input type="password" id="password" name="password" placeholder="Password" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input type="checkbox" id="rememberMe" name="rememberMe" className='w-4 h-4 mr-2' />
                    <label htmlFor="rememberMe" className='text-emerald-700'>Remember me</label>
                  </div>
                  <a href="#" className='text-emerald-500 underline'>Forgot password?</a>
                </div>
                <button type="submit" className='mt-4 p-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105'>
                  Log In
                </button>
                <div className='text-center mt-4'>
                  <p className='text-emerald-700'>
                    Don't have an account?{' '}
                    <Link to="/register" className='text-emerald-500 underline'>Sign up</Link>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default UserLogin;
