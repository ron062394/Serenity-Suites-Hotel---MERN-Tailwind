const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
    roomName: { type: String, required: true },  // Room type chosen by the guest
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },  // Room ID assigned by staff
    guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest' },  // Guest ID
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    checkInTime: { type: Date },  // Time when the guest checks in
    checkOutTime: { type: Date }, // Time when the guest checks out
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    specialRequests: { type: String },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'canceled'], 
        default: 'pending' 
    },
    roomNumber: { type: String },  // Room number assigned to the booking
    price: { type: Number },  // Price of the room assigned to the booking
    paymentMethod: { type: String, enum: ['payNow', 'payLater'], required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('BookRequest', bookRequestSchema);