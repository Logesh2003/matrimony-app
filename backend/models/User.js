const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    gender: String,
    dob: Date,
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


module.exports = mongoose.model("User", userSchema);
