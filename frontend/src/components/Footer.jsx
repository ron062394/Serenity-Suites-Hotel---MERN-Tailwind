import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-emerald-800 text-white py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Footer Logo or Branding */}
          <div className="mb-8 sm:mb-0">
            <Link to="/">
              <div className="font-serif text-2xl sm:text-3xl text-white mb-2 sm:mb-4">
                <span className="italic">Serenity</span>
                <span className="text-amber-500 italic">Suites</span>
              </div>
            </Link>
            <p className="text-emerald-200 text-sm sm:text-base">Where Luxury Meets Tranquility</p>
          </div>

          {/* Footer Navigation Links */}
          <div className="mb-8 sm:mb-0">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link to="/" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300 text-sm sm:text-base">Home</Link></li>
              <li><Link to="/rooms" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300 text-sm sm:text-base">Rooms</Link></li>
              <li><Link to="/dining" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300 text-sm sm:text-base">Dining</Link></li>
              <li><Link to="/events" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300 text-sm sm:text-base">Events</Link></li>
              <li><Link to="/special-offers" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300 text-sm sm:text-base">Special Offers</Link></li>
            </ul>
          </div>

          {/* Footer Contact Information */}
          <div className="mb-8 sm:mb-0">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Contact Us</h3>
            <p className="mb-1 sm:mb-2 text-sm sm:text-base">1234 Serenity Lane, Tranquil City, 12345</p>
            <p className="mb-1 sm:mb-2 text-sm sm:text-base">Phone: (123) 456-7890</p>
            <p className="text-sm sm:text-base">Email: <a href="mailto:info@serenitysuites.com" className="text-amber-400 hover:underline">info@serenitysuites.com</a></p>
          </div>

          {/* Footer Social Media Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Connect With Us</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300" aria-label="Facebook">
                <FaFacebookF className="text-xl sm:text-2xl" />
              </a>
              <a href="#" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300" aria-label="Twitter">
                <FaTwitter className="text-xl sm:text-2xl" />
              </a>
              <a href="#" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300" aria-label="Instagram">
                <FaInstagram className="text-xl sm:text-2xl" />
              </a>
              <a href="#" className="text-emerald-200 hover:text-amber-500 transition-colors duration-300" aria-label="LinkedIn">
                <FaLinkedinIn className="text-xl sm:text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 sm:mt-12 md:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-emerald-700">
        <div className="container mx-auto px-4 text-center text-emerald-200">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Serenity Suites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
