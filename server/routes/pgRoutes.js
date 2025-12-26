import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerPG } from "../controller/pgController.js";

const pgRouter = express.Router();

pgRouter.post("/", protect, registerPG);

export default pgRouter;
