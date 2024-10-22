// app.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware (to be created)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start the server


const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
