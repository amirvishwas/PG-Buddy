import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "fs";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./config/connectDB.js";
import connectToCloudinary from "./config/cloudinary.js";

import clerkWebhooks from "./controller/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import pgRouter from "./routes/pgRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(
  clerkMiddleware({
    enableAuthHeader: true,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// Webhook (
app.post(
  "/api/clerk/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// Normal JSON routes
app.use(express.json());

// DB & cloud
connectDB();
connectToCloudinary();

app.get("/", (req, res) => {
  res.send("Hello from PG Buddy Server 🚀");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/pg", pgRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
