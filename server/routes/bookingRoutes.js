import express from "express";
import {
  checkAvailabilityAPI,
  createBooking,
  getUserBookings,
  getOwnerBookings,
  deleteBooking,
  markBookingAsPaid,
} from "../controller/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.delete("/:id", protect, deleteBooking);
bookingRouter.get("/user", protect, getUserBookings);

bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.put("/:id/mark-paid", protect, markBookingAsPaid);

export default bookingRouter;
