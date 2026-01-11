const User = require("../models/User");
const Event = require("../models/Event");
const catchAsync = require("../utils/catchAsync");
const { getSearchQuery, getPaginationOptions, formatPagedResponse } = require("../utils/queryHelper");

exports.getUsers = catchAsync(async (req, res) => {
    const { search, page, limit } = req.query;
    const query = {};

    if (search) {
        query.$or = getSearchQuery(search, ["fullName", "email"]);
    }

    const { skip, limit: limitNum, page: pageNum } = getPaginationOptions(page, limit);

    const [users, total] = await Promise.all([
        User.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 }),
        User.countDocuments(query)
    ]);

    res.json(formatPagedResponse(users, total, pageNum, limitNum));
});

exports.getGoogleStatus = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    res.json({ googleConnected: user.googleConnected });
});

// Profile functions moved to profileController.js
