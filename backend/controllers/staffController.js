const Staff = require("../models/Staff");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const DEFAULT_WORKING_HOURS = [
    { day: "monday", startTime: "08:00", endTime: "17:00", isActive: true },
    { day: "tuesday", startTime: "08:00", endTime: "17:00", isActive: true },
    { day: "wednesday", startTime: "08:00", endTime: "17:00", isActive: true },
    { day: "thursday", startTime: "08:00", endTime: "17:00", isActive: true },
    { day: "friday", startTime: "08:00", endTime: "17:00", isActive: true },
    { day: "saturday", startTime: "08:00", endTime: "17:00", isActive: true },
    { day: "sunday", startTime: "08:00", endTime: "17:00", isActive: true },
];

exports.createStaff = catchAsync(async (req, res) => {
    const { name, email, phone, role, isActive, onLeave, location, image, categories, sendInvitationEmail } = req.body;
    const existingStaff = await Staff.findOne({ email });
    if (existingStaff) {
        const error = new Error("Staff member already exists");
        error.statusCode = 400;
        throw error;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    if (!name || !email || !phone || !role || !isActive || !onLeave || !categories) {
        const error = new Error("Please provide all the required fields");
        error.statusCode = 400;
        throw error;
    }
    const staff = await Staff.create({
        name,
        email,
        phone,
        role,
        isActive,
        onLeave,
        location,
        image,
        categories,
        sendInvitationEmail,
        owner: req.user._id,
        workingHours: DEFAULT_WORKING_HOURS
    });

    res.status(201).json(staff);
});

exports.getAllStaff = catchAsync(async (req, res) => {
    const staff = await Staff.find({ owner: req.user._id }).populate("categories");
    res.json(staff);
});

exports.getStaffById = catchAsync(async (req, res) => {
    const staff = await Staff.findOne({ _id: req.params.id, owner: req.user._id }).populate("categories");
    if (!staff) {
        const error = new Error("Staff member not found");
        error.statusCode = 404;
        throw error;
    }
    res.json(staff);
});

exports.updateStaff = catchAsync(async (req, res) => {
    const staff = await Staff.findOneAndUpdate(
        { _id: req.params.id, owner: req.user._id },
        req.body,
        { new: true, runValidators: true }
    ).populate("categories");

    if (!staff) {
        const error = new Error("Staff member not found");
        error.statusCode = 404;
        throw error;
    }
    res.json(staff);
});

exports.deleteStaff = catchAsync(async (req, res) => {
    const staff = await Staff.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!staff) {
        const error = new Error("Staff member not found");
        error.statusCode = 404;
        throw error;
    }
    res.json({ message: "Staff member deleted successfully" });
});
