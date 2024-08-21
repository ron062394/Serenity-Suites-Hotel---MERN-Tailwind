import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <section id="hero" className="relative h-screen overflow-hidden bg-cover bg-center"
               style={{
                 backgroundImage: `url('https://cdn.prod.website-files.com/5c6d6c45eaa55f57c6367749/65046bf150d1abb7e5911702_x-65046bcfdc4f0.webp')`,
               }}
      >
        {/* Background overlay with opacity */}
        <div className="absolute inset-0 bg-black opacity-50" />

        <div className="container mx-auto h-full flex items-center justify-center relative z-10">
          {/* Content area centered vertically and horizontally */}
          <div className="w-full md:w-4/5 p-8 flex flex-col items-start text-white">
            <header>
              {/* Main heading for the homepage */}
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Experience Luxury and Comfort
              </h1>
              {/* Supporting text describing the hotel experience */}
              <p className="text-lg md:text-xl mb-6">
                Discover a world of elegance and relaxation at our premier hotel. From our luxurious rooms and top-notch amenities to our exceptional service, we ensure every stay is unforgettable.
              </p>
            </header>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section id="featured-rooms" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Rooms</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <img src="https://via.placeholder.com/400x300" alt="Room 1" className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2">Deluxe Suite</h3>
              <p className="text-gray-600 mb-4">Enjoy luxury and comfort in our spacious Deluxe Suite. Perfect for relaxing and unwinding.</p>
              <Link to="/rooms" className="text-blue-500 hover:underline">View Details</Link>
            </div>
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <img src="https://via.placeholder.com/400x300" alt="Room 2" className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2">Executive Room</h3>
              <p className="text-gray-600 mb-4">Experience modern elegance in our Executive Room. Ideal for business and leisure travelers.</p>
              <Link to="/rooms" className="text-blue-500 hover:underline">View Details</Link>
            </div>
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <img src="https://via.placeholder.com/400x300" alt="Room 3" className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold mb-2">Standard Room</h3>
              <p className="text-gray-600 mb-4">Comfortable and cozy, our Standard Room offers great value for your stay.</p>
              <Link to="/rooms" className="text-blue-500 hover:underline">View Details</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Amenities</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
              <img src="https://via.placeholder.com/100x100" alt="Amenity 1" className="w-24 h-24 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Free Wi-Fi</h3>
              <p className="text-gray-600">Stay connected with high-speed internet throughout the hotel.</p>
            </div>
            <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
              <img src="https://via.placeholder.com/100x100" alt="Amenity 2" className="w-24 h-24 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Swimming Pool</h3>
              <p className="text-gray-600">Enjoy a refreshing dip in our outdoor pool.</p>
            </div>
            <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
              <img src="https://via.placeholder.com/100x100" alt="Amenity 3" className="w-24 h-24 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Gym</h3>
              <p className="text-gray-600">Stay fit during your stay with our fully equipped gym.</p>
            </div>
            <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
              <img src="https://via.placeholder.com/100x100" alt="Amenity 4" className="w-24 h-24 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Spa</h3>
              <p className="text-gray-600">Relax and rejuvenate at our full-service spa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section id="special-offers" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Special Offers</h2>
          <p className="text-lg md:text-xl mb-6">Check out our latest promotions and special offers to make the most of your stay.</p>
          <Link to="/special-offers" className="inline-block px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">View Offers</Link>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Customer Testimonials</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
              <blockquote className="text-lg mb-4">
                "The best hotel experience I've ever had. The service was exceptional, and the room was perfect!"
              </blockquote>
              <p className="font-semibold">- John Doe</p>
            </div>
            <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
              <blockquote className="text-lg mb-4">
                "A truly luxurious stay. Everything was well-organized, and the amenities were top-notch."
              </blockquote>
              <p className="font-semibold">- Jane Smith</p>
            </div>
            <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
              <blockquote className="text-lg mb-4">
                "I had a wonderful time at this hotel. The location is great, and the staff is very friendly."
              </blockquote>
              <p className="font-semibold">- Mark Johnson</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
            <section id="about-us" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-lg md:text-xl mb-6">
            With decades of experience in hospitality, our hotel has a rich history of delivering world-class services and unforgettable experiences to guests from around the globe.
          </p>
          <Link to="/about" className="text-blue-500 hover:underline">Learn More</Link>
        </div>
      </section>

            {/* Events and Conferences Section */}
            <section id="events" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Events & Conferences</h2>
          <p className="text-lg md:text-xl mb-6">
            Our hotel offers state-of-the-art facilities for hosting events, conferences, and weddings. Let us help you make your next event a success.
          </p>
          <Link to="/events" className="text-blue-500 hover:underline">View Details</Link>
        </div>
      </section>

            {/* Dining Section */}
            <section id="dining" className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Dining & Cuisine</h2>
          <p className="text-lg md:text-xl mb-6">
            Indulge in a culinary journey at our on-site restaurants, offering a diverse range of cuisines crafted by world-renowned chefs.
          </p>
          <Link to="/dining" className="text-blue-500 hover:underline">Explore Dining</Link>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg md:text-xl mb-6">
            Have questions or need assistance? Get in touch with us, and we’ll be happy to help with any inquiries you may have.
          </p>
          <Link to="/contact" className="text-blue-500 hover:underline">Get in Touch</Link>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
