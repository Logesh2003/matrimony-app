const express = require("express");
const {
    getMe,
    updateProfile,
    searchProfiles,
    sendInterest,
    acceptInterest,
    rejectInterest,
    uploadProfilePhoto,
    deletePhoto,
    reportUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const cloudUpload = require("../middleware/cloudUpload");
const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);
router.get("/search", authMiddleware, searchProfiles);
router.post("/interest/:id", authMiddleware, sendInterest);
router.post("/interest/:id/accept", authMiddleware, acceptInterest);
router.post("/interest/:id/reject", authMiddleware, rejectInterest);
router.post(
    "/profile/photo",
    authMiddleware,
    cloudUpload.single("photo"),
    uploadProfilePhoto
);

router.delete(
    "/profile/photo/:photoId",
    authMiddleware,
    deletePhoto
);

router.post(
    "/report/:userId",
    authMiddleware,
    reportUser
);


module.exports = router;
