const mongoose = require("mongoose");

const workingHoursSchema = new mongoose.Schema({
    day: {
        type: String, // Monday, Tuesday...
        required: true
    },
    startTime: { type: String, default: "08:00" },
    endTime: { type: String, default: "17:00" },
    isActive: { type: Boolean, default: true }
}, { _id: false });

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    role: {
        type: String,
        enum: ['Admin', 'Receptionist', 'Manager'],
        default: 'Manager'
    },
    isActive: { type: Boolean, default: true },
    onLeave: { type: Boolean, default: false },
    location: { type: String },
    image: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    sendInvitationEmail: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    workingHours: [workingHoursSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Staff", staffSchema);
