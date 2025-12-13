import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controller/clerkWebhooks.js";

const app = express();

// Enable CORS
app.use(cors());

// Connect DB
connectDB();

// Clerk webhook
app.post(
  "/api/clerk/webhook",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

// JSON parser for normal routes
app.use(express.json());

// Clerk auth middleware
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.send("Hello from PG Buddy Server 🚀");
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
