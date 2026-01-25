import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      index: true,
    },
    contact: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "both"],
      default: "both",
    },
    startingPrice: {
      type: Number,
      default: 1000,
    },
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
    location: {
      lat: { type: Number, default: 28.6139 },
      lng: { type: Number, default: 77.209 },
    },
  },
  { timestamps: true },
);

const PG = mongoose.model("PG", pgSchema);
export default PG;
