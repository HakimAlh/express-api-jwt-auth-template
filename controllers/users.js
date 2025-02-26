const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken')

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


// controllers/users.js

router.post('/signin', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
          const token = jwt.sign({ user }, process.env.JWT_SECRET);
            // Send the token back to the client
            res.json({ token });
      } else {
        res.json({ message: 'Invalid credentials.' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;