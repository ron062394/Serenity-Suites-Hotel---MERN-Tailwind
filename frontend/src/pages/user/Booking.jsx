import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaBed, FaCreditCard, FaMoneyBill, FaWifi, FaTv, FaSwimmingPool, FaParking, FaSnowflake, FaGlassMartiniAlt, FaDumbbell, FaConciergeBell, FaUmbrellaBeach, FaHotTub, FaTree, FaLaptop } from 'react-icons/fa';

function Booking() {
  const [step, setStep] = useState(1);
  const [bookingInfo, setBookingInfo] = useState({
    roomName: '',
    checkInDate: '',
    checkOutDate: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    specialRequests: '',
    status: 'pending',
    paymentMethod: '',
  });
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [roomTypes, setRoomTypes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('payNow');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const validateStep = () => {
      switch(step) {
        case 1:
          setIsNextDisabled(!bookingInfo.checkInDate || !bookingInfo.checkOutDate);
          break;
        case 2:
          setIsNextDisabled(['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'country', 'zipCode'].some(field => !bookingInfo[field]));
          break;
        case 3:
          setIsNextDisabled(!bookingInfo.roomName);
          break;
        case 4:
          setIsNextDisabled(!bookingInfo.paymentMethod);
          break;
        default:
          setIsNextDisabled(false);
      }
    };

    validateStep();
  }, [step, bookingInfo]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch('https://serenity-suites-api.vercel.app/api/roomTypes');
        if (!response.ok) {
          throw new Error('Failed to fetch room types');
        }
        const data = await response.json();
        setRoomTypes(data);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRoomTypes();
  }, []);

  useEffect(() => {
    if (bookingInfo.roomName && bookingInfo.checkInDate && bookingInfo.checkOutDate) {
      const selectedRoomType = roomTypes.find(room => room.roomName === bookingInfo.roomName);
      if (selectedRoomType) {
        const checkIn = new Date(bookingInfo.checkInDate);
        const checkOut = new Date(bookingInfo.checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        setTotalPrice(selectedRoomType.price * nights);
        setSelectedRoom(selectedRoomType._id);
        setCheckInDate(bookingInfo.checkInDate);
        setCheckOutDate(bookingInfo.checkOutDate);
      }
    }
  }, [bookingInfo.roomName, bookingInfo.checkInDate, bookingInfo.checkOutDate, roomTypes]);

  useEffect(() => {
    setPaymentMethod(bookingInfo.paymentMethod);
  }, [bookingInfo.paymentMethod]);

  const renderAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wi-fi':
        return <FaWifi className="text-lg mr-2" />;
      case 'tv':
        return <FaTv className="text-lg mr-2" />;
      case 'air conditioning':
        return <FaSnowflake className="text-lg mr-2" />;
      case 'mini bar':
        return <FaGlassMartiniAlt className="text-lg mr-2" />;
      case 'parking':
        return <FaParking className="text-lg mr-2" />;
      case 'gym':
        return <FaDumbbell className="text-lg mr-2" />;
      case 'swimming pool':
        return <FaSwimmingPool className="text-lg mr-2" />;
      case 'room service':
        return <FaConciergeBell className="text-lg mr-2" />;
      case 'private balcony':
        return <FaUmbrellaBeach className="text-lg mr-2" />;
      case 'jacuzzi':
        return <FaHotTub className="text-lg mr-2" />;
      case 'private garden':
        return <FaTree className="text-lg mr-2" />;
      case 'workspace':
        return <FaLaptop className="text-lg mr-2" />;
      default:
        return <FaConciergeBell className="text-lg mr-2" />;
    }
  };

  const handleBooking = async () => {
    try {
      const response = await fetch('https://serenity-suites-api.vercel.app/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingInfo,
          price: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const result = await response.json();
      console.log('Booking created:', result);
      // Handle successful booking (e.g., show confirmation, redirect)
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-6">Select Dates</h2>
            <div className="mb-6">
              <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
              <input type="date" id="checkInDate" name="checkInDate" value={bookingInfo.checkInDate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
            </div>
            <div className="mb-6">
              <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
              <input type="date" id="checkOutDate" name="checkOutDate" value={bookingInfo.checkOutDate} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-6">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" id="firstName" name="firstName" value={bookingInfo.firstName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={bookingInfo.lastName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={bookingInfo.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={bookingInfo.phone} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input type="text" id="address" name="address" value={bookingInfo.address} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input type="text" id="city" name="city" value={bookingInfo.city} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input type="text" id="country" name="country" value={bookingInfo.country} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                <input type="text" id="zipCode" name="zipCode" value={bookingInfo.zipCode} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <textarea id="specialRequests" name="specialRequests" value={bookingInfo.specialRequests} onChange={handleInputChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-2" placeholder="Any special requests or requirements?"></textarea>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-6">Select Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roomTypes.map((roomType) => (
                <div key={roomType._id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                  <h3 className="text-lg font-semibold mb-2">{roomType.roomName}</h3>
                  <p className="text-gray-600 mb-3">{roomType.description}</p>
                  <p className="text-emerald-600 font-semibold mb-2">Price: ${roomType.price}/night</p>
                  <p className="text-gray-700 mb-3">Capacity: {roomType.capacity} guests</p>
                  <div className="mb-4">
                    <p className="font-medium mb-2">Amenities:</p>
                    <ul className="list-disc list-inside">
                      {roomType.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center mb-1">
                          {renderAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className={`mt-4 px-6 py-2 ${bookingInfo.roomName === roomType.roomName ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-emerald-700 transition-colors`}
                    onClick={() => handleInputChange({ target: { name: 'roomName', value: roomType.roomName } })}
                  >
                    {bookingInfo.roomName === roomType.roomName ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
            {bookingInfo.roomName && (
              <div className="mt-6 p-6 bg-emerald-100 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">Booking Summary</h3>
                <p className="mb-2">Check-in: {bookingInfo.checkInDate}</p>
                <p className="mb-2">Check-out: {bookingInfo.checkOutDate}</p>
                <p className="font-bold">Total Price: ${totalPrice}</p>
              </div>
            )}
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payNow"
                    checked={bookingInfo.paymentMethod === 'payNow'}
                    onChange={handleInputChange}
                    className="form-radio text-emerald-600"
                  />
                  <span className="text-gray-700">Pay Now <FaCreditCard className="inline ml-2 text-lg" /></span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payLater"
                    checked={bookingInfo.paymentMethod === 'payLater'}
                    onChange={handleInputChange}
                    className="form-radio text-emerald-600"
                  />
                  <span className="text-gray-700">Pay at Counter <FaMoneyBill className="inline ml-2" /></span>
                </label>
              </div>
            </div>
            {bookingInfo.paymentMethod === 'payNow' && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Card Details</h3>
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
              </div>
            )}
            <div className="mt-4 p-4 bg-emerald-100 rounded-lg">
              <h3 className="text-lg font-semibold text-emerald-800">Final Booking Summary</h3>
              <p>Check-in: {checkInDate}</p>
              <p>Check-out: {checkOutDate}</p>
              <p>Room: {roomTypes.find(room => room._id === selectedRoom)?.roomType}</p>
              <p>Capacity: {roomTypes.find(room => room._id === selectedRoom)?.capacity} guests</p>
              <p>Amenities: {roomTypes.find(room => room._id === selectedRoom)?.amenities.join(', ')}</p>
              <p className="font-bold">Total Price: ${totalPrice}</p>
              <p>Payment Method: {paymentMethod === 'payNow' ? 'Pay Now' : 'Pay at Counter'}</p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen py-12 flex items-center justify-center pt-48">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 max-w-3xl w-full mx-auto bg-white bg-opacity-90 shadow-xl rounded-lg overflow-hidden">
        <div className="bg-emerald-800 text-white py-4 px-6">
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
              <button 
                onClick={() => setStep(step + 1)} 
                className={`px-4 py-2 ${isNextDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded transition-colors`}
                disabled={isNextDisabled}
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleBooking}
                className={`px-4 py-2 ${isNextDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded transition-colors`}
                disabled={isNextDisabled}
              >
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
