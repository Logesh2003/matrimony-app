const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { searchProfiles } = require("../controllers/searchController");

const router = express.Router();

router.get("/profiles", authMiddleware, searchProfiles);

module.exports = router;
