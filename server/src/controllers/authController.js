const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({ message: `User registered successfully with username ${username}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { register, login };