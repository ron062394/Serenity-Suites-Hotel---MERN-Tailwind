const RoomType = require('../models/roomType');

// Create a new room type
const createRoomType = async (req, res) => {
    try {
        const roomType = await RoomType.create(req.body);
        res.status(201).json(roomType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all room types
const getAllRoomTypes = async (req, res) => {
    try {
        const roomTypes = await RoomType.find();
        res.status(200).json(roomTypes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single room type by ID
const getRoomTypeById = async (req, res) => {
    const { id } = req.params;
    try {
        const roomType = await RoomType.findById(id);
        if (!roomType) {
            return res.status(404).json({ error: 'Room type not found' });
        }
        res.status(200).json(roomType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a room type
const updateRoomType = async (req, res) => {
    const { id } = req.params;
    try {
        const roomType = await RoomType.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!roomType) {
            return res.status(404).json({ error: 'Room type not found' });
        }
        res.status(200).json(roomType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a room type
const deleteRoomType = async (req, res) => {
    const { id } = req.params;
    try {
        const roomType = await RoomType.findByIdAndDelete(id);
        if (!roomType) {
            return res.status(404).json({ error: 'Room type not found' });
        }
        res.status(200).json({ message: 'Room type deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createRoomType,
    getAllRoomTypes,
    getRoomTypeById,
    updateRoomType,
    deleteRoomType
};
