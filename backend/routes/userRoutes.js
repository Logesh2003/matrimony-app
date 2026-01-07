const express = require("express");
const {
    getMe,
    updateProfile,
    searchProfiles,
    sendInterest,
    acceptInterest,
    rejectInterest,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);
router.get("/search", authMiddleware, searchProfiles);
router.post("/interest/:id", authMiddleware, sendInterest);
router.post("/interest/:id/accept", authMiddleware, acceptInterest);
router.post("/interest/:id/reject", authMiddleware, rejectInterest);

module.exports = router;
