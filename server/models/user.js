import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    clerkId: {
      type: String,
      sparse: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: String,
    image: String,
    role: {
      type: String,
      enum: ["user", "owner"],
      default: "user",
    },
    searchedCities: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
