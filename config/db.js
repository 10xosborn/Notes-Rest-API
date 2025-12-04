const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URI);
        console.log("MongoBD connected successfuly");

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
