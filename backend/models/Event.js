const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday"],
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
    durationType:String,
    
    service: {
        type: String,
        enum: ["google_meet", "zoom", "microsoft_teams"],
        default: "google_meet"
    },
    availability: [availabilitySchema],
    timezone: {
        type: String,
        default: "UTC"
    }

}, {
    timestamps: true
});
EventSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Event", EventSchema);