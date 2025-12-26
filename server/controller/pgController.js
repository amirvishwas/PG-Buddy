import User from "../models/user.js";
import PG from "../models/pg.js";

export const registerPG = async (req, res) => {
  try {
    const { name, address, city, contact, gender, startingPrice } = req.body;

    if (!name || !address || !city || !contact) {
      return res.status(400).json({
        success: false,
        message: "All required fields missing",
      });
    }

    const owner = req.user._id;

    const existingPG = await PG.findOne({ owner });
    if (existingPG) {
      return res.status(400).json({
        success: false,
        message: "PG already registered",
      });
    }

    const pg = await PG.create({
      name,
      address,
      city,
      contact,
      owner,
      gender: gender || "both",
      startingPrice: startingPrice || 1000,
    });

    await User.findByIdAndUpdate(owner, { role: "owner" });

    return res.status(201).json({
      success: true,
      message: "PG registered successfully",
      pg,
    });
  } catch (error) {
    console.error("Register PG Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
