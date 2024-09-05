const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/booking');

// Create a new booking request
router.post('/', createBookRequest);

// Get all booking requests
router.get('/', getAllBookRequests);
router.get('/available', getAllAvailableBookings);
router.get('/ascending', getAllBookingsAscending);

// Get a specific booking request by ID
router.get('/:id', getBookRequestById);

// Update a booking request by ID
router.patch('/:id', updateBookRequest);

// Update the status of a booking request
router.patch('/confirm/:id', confirmBooking);
router.patch('/checkin/:id', checkInGuest);
router.patch('/checkout/:id', checkoutGuest);
router.patch('/cancel/:id', cancelBooking);

// Delete a booking request by ID
router.delete('/:id', deleteBookRequest);

// Update the status of a booking request
router.patch('/:id/status', updateBookingStatus);

module.exports = router;
