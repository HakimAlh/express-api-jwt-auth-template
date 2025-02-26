const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());

// Routes go here

// server.js

// ... other requires above
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const verifyToken = require('./middleware/verify-token')
const profilesRouter = require('./controllers/profiles');

// ... other middleware


// Routes go here
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);

// Verification anything after this will require user to be logged in
app.use(verifyToken)
app.use('/profiles', profilesRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});