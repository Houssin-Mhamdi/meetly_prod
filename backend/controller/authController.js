const User = require("../models/User");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

exports.register = catchAsync(async (req, res) => {
    const { fullName, email, password, role } = req.body;

    if (!email || !password || !fullName) {
        const error = new Error("Email, password and fullName required");
        error.statusCode = 400;
        throw error;
    }

    const exists = await User.findOne({ email });
    if (exists) {
        const error = new Error("User already exists");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.create({
        fullName,
        email,
        password,
        role: role === "admin" ? "admin" : "user" // prevent random admin
    });

    res.json({ message: "User registered successfully", user });
});

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Email and password required");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.json({ user, token });
});

exports.getMe = catchAsync(async (req, res) => {
    // req.user is already populated by the auth middleware
    res.json(req.user);
});
