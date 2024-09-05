const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    changeRoomStatus
} = require('../controllers/room');

// Get all rooms
router.get('/', authMiddleware, getAllRooms);

// Get a single room
router.get('/:id', authMiddleware, getRoom);

// Create a new room
router.post('/', authMiddleware, createRoom);

// Update a room
router.patch('/:id', authMiddleware, updateRoom);
router.patch('/:id/status', authMiddleware, changeRoomStatus);

// Delete a room
router.delete('/:id', authMiddleware, deleteRoom);

module.exports = router;
