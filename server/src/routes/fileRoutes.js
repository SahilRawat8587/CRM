const express = require('express');
const fileRouter = express.Router();
const { uploadFile, removeFile, getFiles } = require('../controllers/fileController');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const upload = require('../config/mutlerConfig')

// Upload file to Cloudinary
fileRouter.post('/upload', verifyToken, authorizeRoles("Admin", "Manager", "Employee"), upload.single('file'), uploadFile);

// Delete file from Cloudinary
fileRouter.delete('/delete/uploads/:id', verifyToken, authorizeRoles("Admin", "Manager", "Employee"), removeFile);

// Get all files from Cloudinary
fileRouter.get('/getAllFiles', verifyToken, authorizeRoles("Admin", "Manager", "Employee"), getFiles);

module.exports = fileRouter;