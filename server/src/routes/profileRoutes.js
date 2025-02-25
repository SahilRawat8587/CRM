const express = require('express');
const updateProfile = require('../controllers/profileController');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const profileRouter = express.Router();

profileRouter.patch('/update-profile', verifyToken, authorizeRoles("Admin", "Manager", "Employee"), updateProfile);

module.exports = profileRouter;