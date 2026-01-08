const User = require("../models/User");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
};

// BLOCK / UNBLOCK USER
exports.toggleBlockUser = async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
        message: `User ${user.isBlocked ? "blocked" : "unblocked"}`,
    });
};
