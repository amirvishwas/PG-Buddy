import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("ℹ️ MongoDB already connected");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI not found");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
