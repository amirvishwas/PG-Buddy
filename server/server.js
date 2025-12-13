import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controller/clerkWebhooks.js";

connectDB();

const app = express();
const cors = require("cors");
const corsConfig = {
  origin: true,
  credentials: true,
  methods:["GET","POST","PUT","DELETE","OPTIONS"],
};
app.options("/api/clerk", cors(corsConfig));
app.use(cors(corsConfig));

//api to listen to clerk webhooks
app.use("/api/clerk", clerkWebhooks);
//clerk middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (res, req) => req.send("Hello from pgbuddy server"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
