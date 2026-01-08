const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getAllUsers,
    toggleBlockUser,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.put("/block/:userId", authMiddleware, adminMiddleware, toggleBlockUser);

module.exports = router;
