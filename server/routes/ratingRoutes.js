const express = require("express");
const router = express.Router();
const { createRating } = require("../controllers/ratingController");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/", protect, createRating);

module.exports = router;
