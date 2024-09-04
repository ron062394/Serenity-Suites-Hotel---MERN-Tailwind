const express = require('express');
const router = express.Router();
const {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
} = require('../controllers/room');

// Get all rooms
router.get('/', getAllRooms);

// Get a single room
router.get('/:id', getRoom);

// Create a new room
router.post('/', createRoom);

// Update a room
router.patch('/:id', updateRoom);

// Delete a room
router.delete('/:id', deleteRoom);

module.exports = router;
