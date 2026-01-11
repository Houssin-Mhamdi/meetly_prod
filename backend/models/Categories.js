const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    color: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Category", categorySchema);
