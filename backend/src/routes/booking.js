const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
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
router.post('/', authMiddleware, createBookRequest);

// Get all booking requests
router.get('/', authMiddleware, getAllBookRequests);
router.get('/available', authMiddleware, getAllAvailableBookings);
router.get('/ascending', authMiddleware, getAllBookingsAscending);

// Get a specific booking request by ID
router.get('/:id', authMiddleware, getBookRequestById);

// Update a booking request by ID
router.patch('/:id', authMiddleware, updateBookRequest);

// Update the status of a booking request
router.patch('/confirm/:id', authMiddleware, confirmBooking);
router.patch('/checkin/:id', authMiddleware, checkInGuest);
router.patch('/checkout/:id', authMiddleware, checkoutGuest);
router.patch('/cancel/:id', authMiddleware, cancelBooking);

// Delete a booking request by ID
router.delete('/:id', authMiddleware, deleteBookRequest);

// Update the status of a booking request
router.patch('/:id/status', authMiddleware, updateBookingStatus);

module.exports = router;
