import PG from "../models/pg.js";
import User from "../models/user.js";

export const registerPG = async (req, res) => {
  try {
    const { name, address, city, contact, gender, startingPrice, location } =
      req.body;

    if (!name || !address || !city || !contact) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const owner = req.user._id;
    const existingPG = await PG.findOne({ owner });
    if (existingPG) {
      return res
        .status(400)
        .json({ success: false, message: "PG already registered" });
    }

    const pg = await PG.create({
      name,
      address,
      city,
      contact,
      owner,
      gender: gender || "both",
      startingPrice: startingPrice || 1000,
      location: location || { lat: 28.6139, lng: 77.209 },
    });

    await User.findByIdAndUpdate(owner, { role: "owner" });

    return res
      .status(201)
      .json({ success: true, message: "PG registered successfully", pg });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
