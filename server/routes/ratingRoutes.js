import express from "express";
import { createRating } from "../controller/ratingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRating);

export default router;
