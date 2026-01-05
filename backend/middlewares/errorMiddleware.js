const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Mongoose bad ObjectId error
    if (err.name === "CastError") {
        err.message = `Invalid ${err.path}: ${err.value}`;
        err.statusCode = 400;
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        err.message = `Duplicate field value: ${value}. Please use another value!`;
        err.statusCode = 400;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = Object.values(err.errors).map(el => el.message);
        err.message = `Invalid input data. ${errors.join(". ")}`;
        err.statusCode = 400;
    }

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

module.exports = errorMiddleware;
