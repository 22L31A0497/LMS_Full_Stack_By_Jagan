import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Use raw body as a string (important for svix signature verification)
    const payload = req.body.toString();
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, headers); // Validates signature

    const { data, type } = evt;

    switch (type) {
      case "user.created": {
        const email = data.email_addresses?.[0]?.email_address || null;
        const imageUrl = data.image_url || "https://example.com/default-image.png";

        if (!email) {
          console.error("User created event missing email:", data);
          return res.status(400).json({ success: false, message: "Email is required" });
        }

        const userData = {
          _id: data.id,
          email,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl,
        };

        try {
          console.log("Creating user with data:", userData);
          await User.create(userData);
          console.log("User created successfully");
          res.json({ success: true });
        } catch (err) {
          console.error("Error creating user:", err);
          res.status(500).json({ success: false, message: err.message });
        }
        break;
      }

      case "user.updated": {
        const email = data.email_addresses?.[0]?.email_address || null;
        const imageUrl = data.image_url || "https://example.com/default-image.png";

        if (!email) {
          console.error("User updated event missing email:", data);
          return res.status(400).json({ success: false, message: "Email is required" });
        }

        const userData = {
          email,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          imageUrl,
        };

        try {
          await User.findByIdAndUpdate(data.id, userData, { new: true });
          res.json({ success: true });
        } catch (err) {
          console.error("Error updating user:", err);
          res.status(500).json({ success: false, message: err.message });
        }
        break;
      }

      case "user.deleted": {
        try {
          await User.findByIdAndDelete(data.id);
          res.json({ success: true });
        } catch (err) {
          console.error("Error deleting user:", err);
          res.status(500).json({ success: false, message: err.message });
        }
        break;
      }

      default:
        res.status(400).json({ message: "Unknown event type" });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
