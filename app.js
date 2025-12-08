require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./dataBase/connectDb");
const errorHandler = require('./middleware/errorHandler');
const  noteRouter = require("./routes/note.routes.js");
const  userRouter = require("./routes/user.route.js");

const app = express();
const PORT = process.env.PORT || 4000;


connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(noteRouter);
app.use(userRouter);

// Error Handler (last)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});