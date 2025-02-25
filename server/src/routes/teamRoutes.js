const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const { createTeam, getTeams } = require('../controllers/teamController');
const teamRouter = express.Router();

// Only Accessible to Admin
teamRouter.post('/create', verifyToken, authorizeRoles('Admin'), createTeam);
teamRouter.get('/all', verifyToken, authorizeRoles('Admin'), getTeams);

module.exports = teamRouter;