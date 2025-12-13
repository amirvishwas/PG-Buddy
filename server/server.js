import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controller/clerkWebhooks.js";

const app = express();

/* ---------- CORS ---------- */
app.use(cors({ origin: true, credentials: true }));

/* ---------- CLERK WEBHOOK---------- */
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);

app.use(express.json());
app.use(clerkMiddleware());

/* ---------- ROUTES ---------- */
app.get("/", async (req, res) => {
  try {
    await connectDB();
    res.send("PG Buddy Backend Running 🚀");
  } catch (err) {
    console.error(err);
    res.status(500).send("DB connection failed");
  }
});

/* ---------- LOCAL SERVER ---------- */
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`Local server running on port ${PORT}`)
  );
}

export default app;
