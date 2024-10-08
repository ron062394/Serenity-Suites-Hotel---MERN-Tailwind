const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
    createUser,
    login,
    updateUser,
    getAllUsers,
    deleteUser
} = require('../controllers/user');


// Create a new user (only accessible by admin)
router.post('/users', authMiddleware, createUser);

// Update user
router.put('/users/:userId', authMiddleware, updateUser);

// User login
router.post('/login', login);

// Get all users
router.get('/users', authMiddleware, getAllUsers);

// Delete user
router.delete('/users/:userId', authMiddleware, deleteUser);

module.exports = router;
