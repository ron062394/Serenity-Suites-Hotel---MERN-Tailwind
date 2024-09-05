const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  roomType: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType', required: true },
  status: { 
    type: String, 
    enum: ['available', 'booked', 'maintenance', 'cleaning', 'out of service'], 
    default: 'available' 
  },
  floor: { type: Number, required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'BookRequest' }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
