const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        const error = new Error("No token provided");
        error.statusCode = 401;
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            const error = new Error("Invalid token");
            error.statusCode = 401;
            return next(error);
        }

        req.user = user;
        next();
    } catch (err) {
        const error = new Error("Unauthorized");
        error.statusCode = 401;
        next(error);
    }
};

exports.adminOnly = (req, res, next) => {
    if (req.user?.role !== "admin") {
        const error = new Error("Admin access only");
        error.statusCode = 403;
        return next(error);
    }
    next();
};
