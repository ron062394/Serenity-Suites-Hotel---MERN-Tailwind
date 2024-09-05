const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createRoomType,
    getAllRoomTypes,
    getRoomTypeById,
    updateRoomType,
    deleteRoomType
} = require('../controllers/roomType');

// Create a new room type
router.post('/', authMiddleware, createRoomType);

// Get all room types
router.get('/', authMiddleware, getAllRoomTypes);

// Get a single room type by ID
router.get('/:id', authMiddleware, getRoomTypeById);

// Update a room type
router.patch('/:id', authMiddleware, updateRoomType);

// Delete a room type
router.delete('/:id', authMiddleware, deleteRoomType);

module.exports = router;
