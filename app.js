require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require ('./config/db.js');
const errorHandler = require('./middleware/errorHandler');


const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

// Global Middlewares
app.use(cors()); // Enable CORS

app.use(express.json()); // Parse JSON bodies



// Centralized error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})