const mongoose = require('mongoose');
const Room = require('../models/room');
const BookRequest = require('../models/booking');
const RoomType = require('../models/roomType');

// Create a new booking request
const createBookRequest = async (req, res) => {
    try {
        const bookRequest = await BookRequest.create(req.body);
        res.status(201).json(bookRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update booking status and optionally room assignment
const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status, room, roomNumber } = req.body;  // Room and roomNumber can be updated here
    try {
        const updateFields = { status };
        if (room) updateFields.room = room;
        if (roomNumber) updateFields.roomNumber = roomNumber;

        const bookRequest = await BookRequest.findOneAndUpdate({ _id: id }, updateFields, { new: true });
        if (!bookRequest) {
            return res.status(404).json({ error: 'Booking request not found' });
        }
        res.status(200).json(bookRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const confirmBooking = async (req, res) => {
    const { id } = req.params; // Booking ID
    const { room, roomType } = req.body; // Room ID and Room Type ID
    try {
        // Find the booking request
        const booking = await BookRequest.findById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking request not found' });
        }

        // Check if the booking is already confirmed
        if (booking.status === 'confirmed') {
            return res.status(400).json({ error: 'Booking already confirmed' });
        }

        // Check if the room is available
        const roomUpdate = await Room.findById(room);
        if (!roomUpdate) {
            return res.status(404).json({ error: 'Room not found' });
        }
        if (roomUpdate.status !== 'available') {
            return res.status(400).json({ error: 'Room is not available' });
        }

        // Get room type details
        const roomTypeDetails = await RoomType.findById(roomType);
        if (!roomTypeDetails) {
            return res.status(404).json({ error: 'Room type not found' });
        }

        // Update the booking request
        booking.status = 'confirmed';
        booking.room = room;
        booking.roomNumber = roomUpdate.roomNumber;
        booking.price = roomTypeDetails.price;
        booking.roomType = roomTypeDetails.roomName;
        await booking.save();

        // Update the room
        roomUpdate.status = 'booked';
        roomUpdate.booking = id;
        await roomUpdate.save();

        res.status(200).json({ message: 'Booking confirmed and room assigned successfully', booking });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Check in a guest
const checkInGuest = async (req, res) => {
    const { id } = req.params; // Booking ID

    try {
        // Find the booking request
        const booking = await BookRequest.findById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking request not found' });
        }

        // Check if the booking is already checked-in or checked-out
        if (booking.status === 'checked-in') {
            return res.status(400).json({ error: 'Guest is already checked in' });
        }
        if (booking.status === 'checked-out') {
            return res.status(400).json({ error: 'Guest has already checked out' });
        }
        if (booking.status !== 'confirmed') {
            return res.status(400).json({ error: 'Booking must be confirmed before check-in' });
        }

        // Update the booking status and check-in time
        booking.status = 'checked-in';
        booking.checkInTime = new Date(); // Set check-in time to current date and time
        await booking.save();

        res.status(200).json({ message: 'Guest checked in successfully', booking });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const checkoutGuest = async (req, res) => {
    const { id } = req.params; // Booking ID

    try {
        // Find the booking request
        const booking = await BookRequest.findById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking request not found' });
        }

        // Check if the booking is in 'checked-in' status
        if (booking.status !== 'checked-in') {
            return res.status(400).json({ error: 'Cannot check out. Booking is not in a checked-in status.' });
        }

        // Update the booking request to checked-out
        booking.status = 'checked-out';
        booking.checkOutTime = new Date(); // Set the checkout time to the current time
        await booking.save();

        // Update the room status to available
        const roomUpdate = await Room.findById(booking.room);
        if (roomUpdate) {
            roomUpdate.status = 'available';
            roomUpdate.booking = null; // Remove the booking reference
            await roomUpdate.save();
        }

        res.status(200).json({ message: 'Guest checked out successfully', booking });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const cancelBooking = async (req, res) => {
    const { id } = req.params; // Booking ID

    try {
        // Find the booking request
        const booking = await BookRequest.findById(id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking request not found' });
        }

        // Check if the booking is in a status that can be canceled
        if (booking.status !== 'pending' && booking.status !== 'confirmed') {
            return res.status(400).json({ error: 'Cannot cancel. Booking is not in a cancellable status.' });
        }

        // Update the booking request to canceled
        booking.status = 'canceled';
        booking.cancellationTime = new Date(); // Optionally record cancellation time
        await booking.save();

        // If a room was assigned, update the room status to available
        if (booking.room) {
            const roomUpdate = await Room.findById(booking.room);
            if (roomUpdate) {
                roomUpdate.status = 'available';
                roomUpdate.booking = null; // Remove the booking reference
                await roomUpdate.save();
            }
        }

        res.status(200).json({ message: 'Booking canceled successfully', booking });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all booking requests
const getAllBookRequests = async (req, res) => {
    try {
        const bookRequests = await BookRequest.find({});
        res.status(200).json(bookRequests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all bookings with status not "checked-out"
const getAllAvailableBookings = async (req, res) => {
    try {
        const bookRequests = await BookRequest.find({ status: { $ne: 'checked-out' } });
        res.status(200).json(bookRequests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all bookings ascending order
const getAllBookingsAscending = async (req, res) => {
    try {
        const bookRequests = await BookRequest.find({}).sort({ checkInTime: 1 });
        res.status(200).json(bookRequests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get a specific booking request
const getBookRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const bookRequest = await BookRequest.findById(id);
        if (!bookRequest) {
            return res.status(404).json({ error: 'Booking request not found' });
        }
        res.status(200).json(bookRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a booking request (including roomNumber if provided)
const updateBookRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const bookRequest = await BookRequest.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
        if (!bookRequest) {
            return res.status(404).json({ error: 'Booking request not found' });
        }
        res.status(200).json(bookRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a booking request
const deleteBookRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const bookRequest = await BookRequest.findOneAndDelete({ _id: id });
        if (!bookRequest) {
            return res.status(404).json({ error: 'Booking request not found' });
        }
        res.status(200).json({ message: 'Booking request deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createBookRequest,
    updateBookingStatus,
    getAllBookRequests,
    getBookRequestById,
    updateBookRequest,
    deleteBookRequest,
    confirmBooking,
    checkInGuest,
    checkoutGuest,
    cancelBooking,
    getAllAvailableBookings,
    getAllBookingsAscending
};
