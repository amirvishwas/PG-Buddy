import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controller/clerkWebhooks.js";

const app = express();

/* ---------- MIDDLEWARE ---------- */
const corsConfig = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsConfig));
app.use(express.json());

/* ---------- DATABASE ---------- */
await connectDB();

/* ---------- CLERK ---------- */
app.use("/api/clerk", clerkWebhooks);
app.use(clerkMiddleware());

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.send("PG Buddy Backend Running 🚀");
});

/* ---------- LOCAL SERVER ONLY ---------- */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Local server running on port ${PORT}`)
  );
}

export default app;
