const express = require('express');
const router = express.Router();
const {
    createRoomType,
    getAllRoomTypes,
    getRoomTypeById,
    updateRoomType,
    deleteRoomType
} = require('../controllers/roomType');

// Create a new room type
router.post('/', createRoomType);

// Get all room types
router.get('/', getAllRoomTypes);

// Get a single room type by ID
router.get('/:id', getRoomTypeById);

// Update a room type
router.patch('/:id', updateRoomType);

// Delete a room type
router.delete('/:id', deleteRoomType);

module.exports = router;
