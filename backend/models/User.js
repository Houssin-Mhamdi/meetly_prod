const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const slugify = require("slugify");

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    cover: { type: String },
    bio: { type: String },
    location: { type: String },
    slug: { type: String, unique: true, index: true },
    // website: { type: String },
    // phone: { type: String },
    // gender: { type: String },



    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    // Google-related (empty until activated)

    googleInfo: {
        googleId: { type: String },
        email: { type: String },
        name: { type: String },
        image: { type: String }
    },
    refreshToken: { type: String },
    googleConnected: { type: Boolean, default: false },
    timezone: { type: String, default: "UTC" },

    createdAt: { type: Date, default: Date.now }
});

// Hash password
UserSchema.pre("save", async function () {

    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.pre("save", async function () {
    if (!this.isNew && this.slug) return;

    const baseSlug = slugify(this.fullName, {
        lower: true,
        strict: true
    });

    let slug = baseSlug;
    let count = 1;

    while (await this.constructor.findOne({ slug })) {
        slug = `${baseSlug}-${count++}`;
    }

    this.slug = slug;
});

// Compare password
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
