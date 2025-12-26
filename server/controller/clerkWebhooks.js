import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const payload = req.body.toString();
    const evt = wh.verify(payload, headers);

    const { data, type } = evt;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "",
      username:
        `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
      image: data.image_url || "",
    };

    console.log("📥 Webhook received:", type, data.id);

    if (type === "user.created") {
      const existing = await User.findById(data.id);
      if (!existing) {
        await User.create(userData);
        console.log("✅ User created via webhook:", data.id);
      }
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, userData, {
        new: true,
        upsert: true,
      });
      console.log("✅ User updated via webhook:", data.id);
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      console.log("✅ User deleted via webhook:", data.id);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

export default clerkWebhooks;
