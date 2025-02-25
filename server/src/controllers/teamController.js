const bcrypt = require('bcryptjs');
const Team = require('../models/teamModel');
const User = require('../models/userModel');

const createTeam = async (req, res) => {
    try {
        const { teamName, users } = req.body; // `users` is an array of user objects { username, email, password, role }

        if (!teamName || !users || users.length === 0) {
            return res.status(400).json({ message: 'Team name and users are required' });
        }

        // Check if team already exists
        const existingTeam = await Team.findOne({ name: teamName });
        if (existingTeam) {
            return res.status(400).json({ message: 'Team name already exists' });
        }

        let newUsers = [];

        // Register users
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const newUser = new User({
                username: user.username,
                email: user.email,
                password: hashedPassword,
                role: user.role || 'Employee' // Default role is Employee
            });

            await newUser.save();
            newUsers.push(newUser._id);
        }

        // Create team with registered users
        const team = new Team({
            name: teamName,
            members: newUsers,
            createdBy: req.user._id
        });

        await team.save();

        res.status(201).json({ success: true, message: 'Team created successfully', team });

    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members', 'username email role');
        res.status(200).json({ success: true, teams });
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

module.exports = { createTeam, getTeams };
