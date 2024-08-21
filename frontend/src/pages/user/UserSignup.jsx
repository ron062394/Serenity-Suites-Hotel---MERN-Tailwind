import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for routing

function UserSignup() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(2);
  const handlePrevious = () => setStep(1);

  return (
    <section id='user-signup' className='flex justify-center items-center min-h-screen bg-cover bg-center'
      style={{
        backgroundImage: `url('https://cdn.prod.website-files.com/5c6d6c45eaa55f57c6367749/65046bf150d1abb7e5911702_x-65046bcfdc4f0.webp')`,
      }}
    >
      <div className='flex flex-col md:flex-row gap-8 p-8 bg-gray-100 rounded-lg shadow-lg max-w-4xl'>
        {/* Signup Banner */}
        <div className='flex-1 text-center md:text-left'>
          <h2 className='text-2xl font-semibold mb-4'>Create an account and get started</h2>
          <h3 className='text-xl font-medium mb-2'>Why should you join us</h3>
          <p className='mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat quo dolorum nesciunt deserunt velit.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam exercitationem molestias ducimus!</p>
        </div>

        {/* Signup form */}
        <form className='flex-1 flex flex-col gap-4'>
          {step === 1 && (
            <>
              {/* First Name */}
              <label htmlFor="firstName" className='font-medium'>First Name / Given</label>
              <input type="text" id="firstName" name="firstName" className='p-2 border rounded-md' required />

              {/* Last Name */}
              <label htmlFor="lastName" className='font-medium'>Last Name / Surname</label>
              <input type="text" id="lastName" name="lastName" className='p-2 border rounded-md' required />

              {/* Email */}
              <label htmlFor="email" className='font-medium'>Email Address</label>
              <input type="email" id="email" name="email" className='p-2 border rounded-md' required />

              {/* Phone Number */}
              <label htmlFor="phone" className='font-medium'>Phone Number</label>
              <input type="tel" id="phone" name="phone" className='p-2 border rounded-md' required />

              {/* Next Button */}
              <button type="button" onClick={handleNext} className='mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Address */}
              <label htmlFor="address" className='font-medium'>Address</label>
              <input type="text" id="address" name="address" className='p-2 border rounded-md' required />

              {/* Password */}
              <label htmlFor="password" className='font-medium'>Password</label>
              <input type="password" id="password" name="password" className='p-2 border rounded-md' required />

              {/* Confirm Password */}
              <label htmlFor="confirmPassword" className='font-medium'>Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" className='p-2 border rounded-md' required />

              {/* Agree to Terms */}
              <div className='flex items-center gap-2'>
                <input type="checkbox" id="agreeTerms" name="agreeTerms" className='w-4 h-4' required />
                <label htmlFor="agreeTerms" className='font-medium'>I agree to the <a href="#" className='text-blue-500 underline'>terms and conditions</a></label>
              </div>

              {/* Previous and Signup Buttons */}
              <div className='flex justify-between mt-4'>
                <button type="button" onClick={handlePrevious} className='p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'>
                  Previous
                </button>
                <Link className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600' to={'/'}>
                  Sign up
                </Link>
              </div>
            </>
          )}

          {/* Already have an account link */}
          <div className='text-center mt-4'>
            <p>
              Already have an account?{' '}
              <Link to="/login" className='text-blue-500 underline'>Click here</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default UserSignup;
