const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(morgan('dev'));
app.use(express.json());

// Routes go here

// server.js

// ... other requires above
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
// ... other middleware

// Routes go here
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);

app.listen(3001, () => {
  console.log('The express app is ready!');
});