const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, select: false },
    gender: String,
    dob: {
        type: Date,
        required: true
    },
    religion: String,
    caste: String,
    location: String,
    education: String,
    occupation: String,
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    interestsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    interestsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    photos: [
        {
            url: String,
            public_id: String,
        },
    ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },

    isBlocked: {
        type: Boolean,
        default: false,
    },

    reports: [
        {
            reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            reason: String,
            date: { type: Date, default: Date.now },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});
userSchema.virtual("age").get(function () {
    if (!this.dob) return null;
    const diff = Date.now() - this.dob.getTime();
    return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
