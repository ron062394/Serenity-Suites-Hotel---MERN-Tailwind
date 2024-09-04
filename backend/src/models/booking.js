const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
    roomType: { type: String, required: true },  // Room type chosen by the guest
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },  // Room ID assigned by staff
    guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest' },  // Guest ID
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    checkInTime: { type: Date },  // Time when the guest checks in
    checkOutTime: { type: Date }, // Time when the guest checks out
    name: { type: String, required: true },  // Name is required for the booking
    email: { type: String, required: true },  // Email is required for the booking
    phone: { type: String, required: true },  // Phone is required for the booking
    specialRequests: { type: String },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'canceled'], 
        default: 'pending' 
    },
    roomNumber: { type: String },  // Room number assigned to the booking
    price: { type: Number }  // Price of the room assigned to the booking
}, {
    timestamps: true
});

module.exports = mongoose.model('BookRequest', bookRequestSchema);