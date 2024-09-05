const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  capacity: { type: Number, required: true, min: 1 },
  amenities: [{ type: String }],
  images: [{ type: String }],
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

module.exports = RoomType;

