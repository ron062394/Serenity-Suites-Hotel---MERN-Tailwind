const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // e.g., single, double, suite
  amenities: [String], // e.g., ['WiFi', 'Air Conditioning']
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['available', 'booked', 'maintenance', 'cleaning', 'out of service'], 
    default: 'available' 
  },
  imageSrc: { type: String, required: true }, // URL to the room image
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'BookRequest' } // Reference to the current booking
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
