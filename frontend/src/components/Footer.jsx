import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Footer Logo or Branding */}
        <div>
            <Link to='/'>
              <div className="font-serif text-2xl text-white">
                <span className="italic">Serenity</span>
                <span className="text-[#ff4655] italic">Suites</span>
              </div>
            </Link>
          </div>

        {/* Footer Navigation Links */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-2">Navigation</h3>
          <ul>
            <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
            <li><Link to="/rooms" className="text-gray-300 hover:text-white">Rooms</Link></li>
            <li><Link to="/amenities" className="text-gray-300 hover:text-white">Amenities</Link></li>
            <li><Link to="/special-offers" className="text-gray-300 hover:text-white">Special Offers</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Footer Contact Information */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="mb-2">1234 Hotel Lane, City, Country</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>Email: <a href="mailto:info@hotel.com" className="text-blue-400 hover:underline">info@hotel.com</a></p>
        </div>

        {/* Footer Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 text-gray-400 py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Hotel Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
