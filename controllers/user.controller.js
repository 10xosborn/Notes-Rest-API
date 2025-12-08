require("dotenv").config();
const userModel = require("../models/user.model");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res, next) => {
    const registerSchema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { email, password, name } = req.body;

        //  DB query
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        const user = new userModel({
            email,
            password: hash,
            name
        });

        await user.save();

        return res.status(200).json({
            message: "User is registered successfully"
        });

    } catch (error) {
        next(error);
    }
};

// LOGIN USER
const loginUser = async (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            { userId: user.id, username: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        const resUser = {
            _id: user.id,
            email: user.email,
            name: user.name,
        };

        return res.status(200).json({ message: "logged in", user: resUser, token });

    } catch (error) {
        next(error);
    }
};

module.exports = { loginUser, registerUser };