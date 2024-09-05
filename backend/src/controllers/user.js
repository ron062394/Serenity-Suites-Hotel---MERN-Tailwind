const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

// Create a new user (protected)
const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if the user making the request is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only administrators can create new users' });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Check if role is provided
        if (!role) {
            return res.status(400).json({ error: 'Role is required' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role, canAddUser: newUser.canAddUser },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User created successfully', userId: newUser._id, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// User login
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username is provided
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create and assign token
        const token = jwt.sign(
            { userId: user._id, role: user.role, canAddUser: user.canAddUser },
            process.env.JWT_SECRET,
        );

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { userId, username, password, role } = req.body;

        // Check if user making the request is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only administrators can update users' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user details
        user.username = username;
        user.role = role;

        // Save updated user
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if user making the request is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Only administrators can delete users' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete user
        await user.deleteOne();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



    module.exports = {
    createUser,
    login,  
    updateUser,
    getAllUsers,
    deleteUser
};
