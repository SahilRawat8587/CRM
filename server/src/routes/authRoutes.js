const express = require('express');
const { register, login, logout, forgotPassword, resetPassword, checkAuth } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);
authRouter.get('/check-auth', verifyToken, checkAuth);

module.exports = authRouter;