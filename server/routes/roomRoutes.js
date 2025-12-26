import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRoom,
  deleteRoom,
  getRooms,
  getOwnerRooms,
  toggleRoomAvailability,
} from "../controller/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", protect, upload.array("images", 5), createRoom);
roomRouter.delete("/:id", protect, deleteRoom);

roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

export default roomRouter;
