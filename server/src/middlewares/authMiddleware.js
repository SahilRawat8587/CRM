const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No Token, Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        // console.log(user);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyToken;