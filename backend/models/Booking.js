const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        date: {
            type: String, // "2025-02-20"
            required: true
        },

        startTime: {
            type: String, // "09:00"
            required: true
        },

        endTime: {
            type: String, // "09:30"
            required: true
        },

        googleCalendarEventId: String
    },
    { timestamps: true }
);

bookingSchema.index({ event: 1, date: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);
