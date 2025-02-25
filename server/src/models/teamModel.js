const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a team name'],
        minlength: [3, 'Team name must be at least 3 characters'],
        maxlength: [20, 'Team name must be at most 20 characters'],
        unique: [true, 'Team name already exists'],
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;