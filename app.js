require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db.js");
const errorHandler = require('./middleware/errorHandler.js');
const  noteRouter = require("./routes/note.routes.js");
const  userRouter = require("./routes/user.route.js");

const app = express();
const PORT = process.env.PORT;


connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(noteRouter);
app.use(userRouter);

// Error Handler (last)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});