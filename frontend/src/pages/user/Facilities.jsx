import React from 'react';

function Facilities() {
  const facilities = [
    { id: 1, name: 'Swimming Pool', description: 'Enjoy our Olympic-sized swimming pool with a stunning view.', image: 'https://via.placeholder.com/400x300' },
    { id: 2, name: 'Fitness Center', description: 'Stay fit with our state-of-the-art gym equipment and personal trainers.', image: 'https://via.placeholder.com/400x300' },
    { id: 3, name: 'Spa & Wellness', description: 'Relax and rejuvenate with our wide range of spa treatments.', image: 'https://via.placeholder.com/400x300' },
    { id: 4, name: 'Restaurant', description: 'Savor delicious cuisines from around the world in our elegant restaurant.', image: 'https://via.placeholder.com/400x300' },
    { id: 5, name: 'Conference Rooms', description: 'Host your business meetings and events in our modern conference facilities.', image: 'https://via.placeholder.com/400x300' },
    { id: 6, name: 'Rooftop Bar', description: 'Enjoy breathtaking views and cocktails at our stylish rooftop bar.', image: 'https://via.placeholder.com/400x300' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Facilities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{facility.name}</h2>
              <p className="text-gray-600 mb-4">{facility.description}</p>
              <button className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Facilities;
