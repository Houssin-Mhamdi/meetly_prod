const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        required: true
    },
    start: String, // "09:00"
    end: String    // "17:00"
});


const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    meetLink: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slotDuration: {
        type: Number,
        default: 30 // minutes
    },
    durationType: String,
    customDurationUnit: String,
    customDurationValue: Number,
    service: {
        type: String,
        enum: ["google_meet", "zoom", "microsoft_teams"],
        default: "google_meet"
    },
    availability: [availabilitySchema],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    timezone: {
        type: String,
        default: "UTC"
    },
    customValue: Number,
    customUnit: String
}, {
    timestamps: true
});
EventSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Event", EventSchema);