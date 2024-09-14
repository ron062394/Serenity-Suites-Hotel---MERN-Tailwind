import React from 'react';
import { Link } from 'react-router-dom';

const RewardsProgram = () => {
  const benefits = [
    { title: "Earn Points", description: "Accumulate points with every stay" },
    { title: "Exclusive Perks", description: "Access special rates and premium amenities" },
    { title: "Curated Experiences", description: "Enjoy bespoke experiences at our properties" }
  ];

  return (
    <section id="rewards-program" className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800">Serenity Rewards Program</h2>
            <p className="text-base sm:text-lg mb-6 text-gray-600">Experience exclusive benefits and unparalleled luxury with our premier rewards program.</p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500 flex items-center justify-center mr-3 mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">{benefit.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/rewards" className="inline-block mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-emerald-600 rounded-md shadow-md hover:bg-emerald-700 transition-all duration-300 ease-in-out">
              Join Serenity Rewards
            </Link>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
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
  );
};

export default RewardsProgram;