import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook
    const event = wh.verify(payload, headers);

    const { data, type } = event;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "no-email",

      username:
        data.username ||
        data.first_name ||
        data.email_addresses?.[0]?.email_address.split("@")[0],

      image: data.image_url || "",
    };

    switch (type) {
      case "user.created":
        try {
          await User.create(userData);
          console.log("User created in MongoDB:", userData._id);
        } catch (dbErr) {
          console.error("MongoDB create failed:", dbErr.message);
        }
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

export default clerkWebhooks;
