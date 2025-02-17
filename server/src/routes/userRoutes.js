const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

const userRouter = express.Router();

// Routes that only Admin can access. 
userRouter.get('/admin', verifyToken, authorizeRoles("Admin"), (req, res) => {
    try {
        res.status(200).json({ message: 'Admin route' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes that Manager and Admin can access.
userRouter.get('/manager', verifyToken, authorizeRoles("Admin", "Manager"), (req, res) => {
    try {
        res.status(200).json({ message: 'Manager route' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes that Employee, Manager and Admin can access.
userRouter.get('/employee', verifyToken, authorizeRoles("Admin", "Manager", "Employee"), (req, res) => {
    try {
        res.status(200).json({ message: 'Employee route' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = userRouter;