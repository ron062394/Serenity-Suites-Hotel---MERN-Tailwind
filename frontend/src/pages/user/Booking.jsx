import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaBed, FaCreditCard, FaMoneyBill, FaWifi, FaTv, FaSwimmingPool, FaParking } from 'react-icons/fa';

function Booking() {
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    specialRequests: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [roomTypes, setRoomTypes] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const validateStep = () => {
      switch(step) {
        case 1:
          setIsNextDisabled(!checkInDate || !checkOutDate);
          break;
        case 2:
          setIsNextDisabled(Object.values(guestInfo).some(value => value === ''));
          break;
        case 3:
          setIsNextDisabled(!selectedRoom);
          break;
        case 4:
          setIsNextDisabled(!paymentMethod);
          break;
        default:
          setIsNextDisabled(false);
      }
    };

    validateStep();
  }, [step, checkInDate, checkOutDate, guestInfo, selectedRoom, paymentMethod]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/roomTypes');
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
    if (selectedRoom && checkInDate && checkOutDate) {
      const selectedRoomType = roomTypes.find(room => room._id === selectedRoom);
      if (selectedRoomType) {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        setTotalPrice(selectedRoomType.price * nights);
      }
    }
  }, [selectedRoom, checkInDate, checkOutDate, roomTypes]);

  const renderAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <FaWifi className="inline-block mr-2" />;
      case 'tv':
        return <FaTv className="inline-block mr-2" />;
      case 'pool':
        return <FaSwimmingPool className="inline-block mr-2" />;
      case 'parking':
        return <FaParking className="inline-block mr-2" />;
      default:
        return null;
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Select Dates</h2>
            <div className="mb-4">
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">Check-in Date</label>
              <input type="date" id="checkIn" name="checkIn" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">Check-out Date</label>
              <input type="date" id="checkOut" name="checkOut" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="firstName" name="firstName" value={guestInfo.firstName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={guestInfo.lastName} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" value={guestInfo.email} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={guestInfo.phone} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" id="address" name="address" value={guestInfo.address} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="city" name="city" value={guestInfo.city} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" id="country" name="country" value={guestInfo.country} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input type="text" id="zipCode" name="zipCode" value={guestInfo.zipCode} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Special Requests</label>
                <textarea id="specialRequests" name="specialRequests" value={guestInfo.specialRequests} onChange={handleInputChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500" placeholder="Any special requests or requirements?"></textarea>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Select Room</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roomTypes.map((roomType) => (
                <div key={roomType._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold">{roomType.roomType}</h3>
                  <p className="text-gray-600">{roomType.description}</p>
                  <p className="text-emerald-600 font-semibold mt-2">Price: ${roomType.price}/night</p>
                  <p className="text-gray-700">Capacity: {roomType.capacity} guests</p>
                  <div className="mt-2">
                    <p className="font-medium">Amenities:</p>
                    <ul className="list-disc list-inside">
                      {roomType.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-center">
                          {renderAmenityIcon(amenity)}
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    className={`mt-4 px-4 py-2 ${selectedRoom === roomType._id ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'} rounded hover:bg-emerald-700 transition-colors`}
                    onClick={() => setSelectedRoom(roomType._id)}
                  >
                    {selectedRoom === roomType._id ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
            {selectedRoom && (
              <div className="mt-4 p-4 bg-emerald-100 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-800">Booking Summary</h3>
                <p>Check-in: {checkInDate}</p>
                <p>Check-out: {checkOutDate}</p>
                <p className="font-bold">Total Price: ${totalPrice}</p>
              </div>
            )}
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payNow"
                    checked={paymentMethod === 'payNow'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio text-emerald-600"
                  />
                  <span className="text-gray-700">Pay Now <FaCreditCard className="inline ml-2" /></span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payLater"
                    checked={paymentMethod === 'payLater'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio text-emerald-600"
                  />
                  <span className="text-gray-700">Pay at Counter <FaMoneyBill className="inline ml-2" /></span>
                </label>
              </div>
            </div>
            {paymentMethod === 'payNow' && (
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
              <p>Room: {roomTypes.find(room => room._id === selectedRoom)?.name}</p>
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
    <div className="relative min-h-screen py-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?cs=srgb&dl=pexels-thorsten-technoman-109353-338504.jpg&fm=jpg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 max-w-3xl w-full mx-auto bg-white bg-opacity-90 shadow-xl rounded-lg overflow-hidden">
        <div className="bg-emerald-600 text-white py-4 px-6">
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
