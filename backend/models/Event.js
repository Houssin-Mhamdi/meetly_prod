const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        required: true
    },
    start: String, // "09:00"
    end: String,   // "17:00"
    startPause: String,
    endPause: String,
    disabledSlots: [String] // ["10:00", "14:30"]
});


const EventSchema = new mongoose.Schema({
    title: String,
    description: String,
    meetLink: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    price: {
        type: Number,
        default: 0
    },
    videoLink: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.Mixed, // Can be string (predefined) or ObjectId (custom)
        default: "other"
    },
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
    timezone: {
        type: String,
        default: "UTC"
    },
    customValue: Number,
    customUnit: String,
    cardGradient: {
        from: {
            type: String,
            default: "from-blue-50"
        },
        to: {
            type: String,
            default: "to-indigo-50"
        }
    }
}, {
    timestamps: true
});
EventSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Event", EventSchema);