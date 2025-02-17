const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No Token, Access Denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyToken;