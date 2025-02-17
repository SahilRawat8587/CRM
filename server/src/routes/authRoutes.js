const express = require('express');
const { register, login, logout, forgotPassword, resetPassword } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);

module.exports = authRouter;