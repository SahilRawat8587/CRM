const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        minlength: [3, 'Username must be at least 3 characters'],
        maxlength: [20, 'Username must be at most 20 characters'],
        unique: [true, 'Username already exists'],
    },
    email : {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'Email already exists'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please enter a valid email');
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character');
            }
        }
    },
    role: {
        type: String,
        enum: {
            values: ['Admin', 'Manager', 'Employee'],
            message: 'Please select a valid role'
        },
        required: [true, 'Please select a role']
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;