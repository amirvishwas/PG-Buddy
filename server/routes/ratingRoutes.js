import express from "express";
import {
  createRating,
  getRoomRatings,
} from "../controller/ratingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRating);
router.get("/room/:roomId", getRoomRatings);

export default router;
