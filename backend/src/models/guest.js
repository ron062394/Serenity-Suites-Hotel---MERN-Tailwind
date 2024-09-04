const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' }, // Room assigned to the guest
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
