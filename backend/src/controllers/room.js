const Room = require('../models/Room');

// Get all rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({}).populate('roomType');
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single room
const getRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await Room.findById(id).populate('roomType').populate('booking');
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new room
const createRoom = async (req, res) => {
    const { roomNumber, roomType, status, floor } = req.body;
    try {
        const room = await Room.create({ roomNumber, roomType, status, floor });
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a room
const updateRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await Room.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
            .populate('roomType')
            .populate('booking');
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a room
const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await Room.findOneAndDelete({ _id: id });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
};
