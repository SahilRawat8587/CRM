const express = require('express')
const verifyToken = require('../middlewares/authMiddleware');
const { profileView } = require('../controllers/profileController');
const profileRouter = express.Router()

profileRouter.get('/view', verifyToken, profileView);

module.exports = profileRouter;