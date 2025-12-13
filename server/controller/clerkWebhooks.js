import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ✅ VERIFY AND GET EVENT 
    const event = whook.verify(req.body, headers);

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
      case "user.created": {
        const user = await User.create(userData);
        console.log("✅ User created in MongoDB:", user._id);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log("✅ User updated in MongoDB:", data.id);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted from MongoDB:", data.id);
        break;
      }

      default:
        console.log("ℹ️ Ignored event:", type);
    }

    res.status(200).json({
      success: true,
      message: "Clerk webhook processed successfully",
    });
  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
};

export default clerkWebhooks;
