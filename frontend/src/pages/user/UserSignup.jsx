import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function UserSignup() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handlePrevious = () => setStep(1);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50">
      <section id='user-signup' className='flex justify-center items-center min-h-screen bg-cover bg-center'
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
            <h2 className="text-4xl font-bold mb-8 text-center text-emerald-800">Join Serenity Suites</h2>
            <div className='flex flex-col md:flex-row gap-12'>
              {/* Signup Banner */}
              <div className='flex-1'>
                <h3 className='text-2xl font-semibold mb-4 text-emerald-700'>Experience Luxury</h3>
                <p className='text-lg text-emerald-600 mb-4'>Discover a world of unparalleled comfort and elegance. Sign up now to unlock exclusive benefits and start your journey with Serenity Suites.</p>
                <ul className='list-disc list-inside text-emerald-600 space-y-2'>
                  <li>Access to special rates and promotions</li>
                  <li>Priority booking for our most sought-after suites</li>
                  <li>Personalized concierge service</li>
                  <li>Earn points with every stay</li>
                </ul>
              </div>

              {/* Signup form */}
              <form className='flex-1 flex flex-col gap-4'>
                {step === 1 && (
                  <>
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                    <input type="email" id="email" name="email" placeholder="Email Address" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                    <input type="tel" id="phone" name="phone" placeholder="Phone Number" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                    <button type="button" onClick={handleNext} className='mt-4 p-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105'>
                      Next
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <input type="text" id="address" name="address" placeholder="Address" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                    <input type="password" id="password" name="password" placeholder="Password" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className='p-3 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500' required />
                    <div className='flex items-center gap-2'>
                      <input type="checkbox" id="agreeTerms" name="agreeTerms" className='w-4 h-4' required />
                      <label htmlFor="agreeTerms" className='text-emerald-700'>I agree to the <a href="#" className='text-emerald-500 underline'>terms and conditions</a></label>
                    </div>
                    <div className='flex justify-between mt-4'>
                      <button type="button" onClick={handlePrevious} className='p-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105'>
                        Previous
                      </button>
                      <Link className='p-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-300 ease-in-out transform hover:scale-105' to={'/'}>
                        Sign up
                      </Link>
                    </div>
                  </>
                )}

                <div className='text-center mt-4'>
                  <p className='text-emerald-700'>
                    Already have an account?{' '}
                    <Link to="/login" className='text-emerald-500 underline'>Sign in</Link>
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

export default UserSignup;
