const User = require("../models/userModel");

const updateProfile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { username, email, role } = req.body;

        // Check allowed fields from the request body
        const allowedFields = ['username', 'email', 'role'];
        const isValidOperation = Object.keys(req.body).every(field => allowedFields.includes(field));
        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        if (loggedInUser.username !== username) {
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({ message: 'Username already exists' });
            }
        }

        if (loggedInUser.email !== email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(loggedInUser._id, { username, email, role }, { new: true }); // new refers to returning the updated document
        res.json({ message: 'Profile updated successfully', user: updatedUser });
        
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}

module.exports = updateProfile;