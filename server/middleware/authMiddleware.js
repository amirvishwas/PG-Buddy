import { requireAuth, clerkClient } from "@clerk/express";
import User from "../models/user.js";

export const protect = [
  requireAuth({
    unauthorized: (req, res) => {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    },
  }),
  async (req, res, next) => {
    try {
      const userId = req.auth?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "No userId from Clerk",
        });
      }

      // Fetch real user data from Clerk API
      const clerkUser = await clerkClient.users.getUser(userId);
      const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
      const username =
        [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
        clerkUser.username ||
        "User";
      const image = clerkUser.imageUrl || "";

      // Upsert user (create if not exists, update if exists)
      const user = await User.findByIdAndUpdate(
        userId,
        {
          _id: userId,
          email,
          username,
          image,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      req.user = user;
      next();
    } catch (error) {
      console.error("❌ Auth Middleware Error:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Authentication middleware failed",
      });
    }
  },
];
