const User = require("../models/User");

// GET LOGGED-IN USER
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user,
            req.body,
            { new: true }
        ).select("-password");

        res.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// SEARCH PROFILES
exports.searchProfiles = async (req, res) => {
    try {
        const { religion, caste, location, gender } = req.query;

        let filter = { _id: { $ne: req.user } };

        if (religion) filter.religion = religion;
        if (caste) filter.caste = caste;
        if (location) filter.location = location;
        if (gender) filter.gender = gender;

        const users = await User.find(filter).select("-password");

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// SEND INTEREST
exports.sendInterest = async (req, res) => {
    try {
        const receiverId = req.params.id;

        if (receiverId === req.user) {
            return res.status(400).json({ message: "Cannot send interest to yourself" });
        }

        const sender = await User.findById(req.user);
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({ message: "User not found" });
        }

        if (sender.interestsSent.includes(receiverId)) {
            return res.status(400).json({ message: "Interest already sent" });
        }

        sender.interestsSent.push(receiverId);
        receiver.interestsReceived.push(req.user);

        await sender.save();
        await receiver.save();

        res.json({ message: "Interest sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ACCEPT INTEREST
exports.acceptInterest = async (req, res) => {
    try {
        const senderId = req.params.id;

        const receiver = await User.findById(req.user);
        const sender = await User.findById(senderId);

        if (!receiver.interestsReceived.includes(senderId)) {
            return res.status(400).json({ message: "No interest found" });
        }

        // Remove interest
        receiver.interestsReceived = receiver.interestsReceived.filter(
            (id) => id.toString() !== senderId
        );

        sender.interestsSent = sender.interestsSent.filter(
            (id) => id.toString() !== req.user
        );

        // Add match
        receiver.matches.push(senderId);
        sender.matches.push(req.user);

        await receiver.save();
        await sender.save();

        res.json({ message: "Interest accepted – It's a match ❤️" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// REJECT INTEREST
exports.rejectInterest = async (req, res) => {
    try {
        const senderId = req.params.id;

        const user = await User.findById(req.user);

        user.interestsReceived = user.interestsReceived.filter(
            (id) => id.toString() !== senderId
        );

        await user.save();

        res.json({ message: "Interest rejected" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

