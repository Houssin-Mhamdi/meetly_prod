const User = require("../models/User");
const Event = require("../models/Event");
const catchAsync = require("../utils/catchAsync");

exports.getProfile = catchAsync(async (req, res) => {
    const user = await User.findOne({ slug: req.params.slug })
        .select("fullName slug avatar cover bio location createdAt");

    if (!user) {
        const error = new Error("Profile not found");
        error.statusCode = 404;
        throw error;
    }

    res.json(user);
});

exports.getProfileEvents = catchAsync(async (req, res) => {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const events = await Event.find({ owner: user._id })
        .select("title description availability slotDuration createdAt");

    res.json(events);
});

exports.getProfileFull = catchAsync(async (req, res) => {
    const user = await User.findOne({ slug: req.params.slug })
        .select("fullName slug avatar cover bio location");

    if (!user) {
        const error = new Error("Profile not found");
        error.statusCode = 404;
        throw error;
    }

    const events = await Event.find({ owner: user._id })
        .select("title description availability slotDuration");

    res.json({
        profile: user,
        events
    });
});
