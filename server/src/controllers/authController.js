const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/userModel');
const crypto = require('crypto');
const { sendPasswordResetEmail, sendResetSuccessEmail } = require('../mailtrap/emails');
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
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: user
        });
        } catch (error) {
            res.status(500).json({
                message: `Error: ${error.message}`
            });
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
        await user.save();
        res.status(200).json({ 
            success: true,
            message: 'Logged in successfully',
            user: user
        });
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        });
    }
}

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour from now

        // Save the reset token and expiry time to the user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetPasswordExpiresAt;

        await user.save();

        // Send the email with the reset token
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: 'Password reset email sent successfully'
        }); 
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        }); 
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
        } catch (error) {
            res.status(500).json({
                message: `Error: ${error.message}`
            });    
        }
}

module.exports = { register, login, logout, forgotPassword, resetPassword };