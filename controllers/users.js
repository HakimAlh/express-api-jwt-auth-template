const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// controllers/users.js
// ... require statements above

// Add in constant for the number
const SALT_LENGTH = 12;

router.post('/signup', async (req, res) => {
    try {
        // Check if the username is already taken
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.status(400).json({error:'Username already taken.'});
        }
        // Create a new user with hashed password
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;