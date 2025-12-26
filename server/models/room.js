import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    pg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PG",
      required: true,
    },

    roomType: {
      type: String,
      enum: ["single", "double", "triple"],
      required: true,
    },

    totalBeds: {
      type: Number,
      required: true,
      min: 1,
    },

    availableBeds: {
      type: Number,
      required: true,
      min: 0,
    },

    pricePerBed: {
      type: Number,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    isAvailable: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      enum: ["Boys", "Girls", "Mixed"],
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
