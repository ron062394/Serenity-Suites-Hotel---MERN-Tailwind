import React from 'react';
import { FaCalendarAlt, FaUser, FaBed, FaDollarSign, FaUsers, FaConciergeBell, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaFlag, FaMailBulk } from 'react-icons/fa';

function BookDetails({ booking }) {
  return (
    <div className="bg-white rounded-lg p-8 max-w-md w-full">
      <h3 className="text-2xl font-bold mb-4">Booking Details</h3>
      <p className="mb-2"><FaUser className="inline mr-2" />Book ID: {booking._id}</p>
      <p className="mb-2"><FaUser className="inline mr-2" />Guest: {booking.firstName} {booking.lastName}</p>
      <p className="mb-2"><FaEnvelope className="inline mr-2" />Email: {booking.email}</p>
      <p className="mb-2"><FaPhone className="inline mr-2" />Phone: {booking.phone}</p>
      <p className="mb-2"><FaMapMarkerAlt className="inline mr-2" />Address: {booking.address}</p>
      <p className="mb-2"><FaCity className="inline mr-2" />City: {booking.city}</p>
      <p className="mb-2"><FaFlag className="inline mr-2" />Country: {booking.country}</p>
      <p className="mb-2"><FaMailBulk className="inline mr-2" />Zip Code: {booking.zipCode}</p>
      <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
      <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
      <p className="mb-2"><FaBed className="inline mr-2" />Room: {booking.roomName}</p>
      <p className="mb-2"><FaDollarSign className="inline mr-2" />Price: ${booking.price}</p>
      <p className="mb-2"><FaUsers className="inline mr-2" />Room Number: {booking.roomNumber}</p>
      <p className="mb-2"><FaConciergeBell className="inline mr-2" />Special Requests: {booking.specialRequests}</p>
      <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Status: {booking.status}</p>
      <p className="mb-2"><FaCalendarAlt className="inline mr-2" />Payment Method: {booking.paymentMethod}</p>
    </div>
  );
}

export default BookDetails;

