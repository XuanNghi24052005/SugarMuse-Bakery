import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/userModel.js";
import Admin from "./models/adminModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const simpleUsers = [
  { name: "Alex", email: "user1@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u1", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" } },
  { name: "Bob", email: "user2@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u2", url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150" } },
  { name: "Chris", email: "user3@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u3", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" } },
  { name: "David", email: "user4@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u4", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" } },
  { name: "Emma", email: "user5@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u5", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" } },
  { name: "Jack", email: "user6@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u6", url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150" } },
  { name: "Leo", email: "user7@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u7", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150" } },
  { name: "Max", email: "user8@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u8", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150" } },
  { name: "Sam", email: "user9@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u9", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" } },
  { name: "Tom", email: "user10@gmail.com", password: "User@123", role: "user", isVerified: true, avatar: { public_id: "u10", url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" } },
];

async function seedSimpleUsers() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected successfully!");

    // Remove all previous normal users
    const delRes = await User.deleteMany({ role: "user" });
    console.log(`Cleared ${delRes.deletedCount} previous users.`);

    // Create 10 ultra-simple users
    for (const u of simpleUsers) {
      await User.create(u);
      console.log(`Created: ${u.name} | ${u.email} | ${u.password}`);
    }

    // Also update Admin password to Admin@123 (super easy to remember)
    let admin = await User.findOne({ email: "admin@sugarmuse.vn" });
    if (admin) {
      admin.password = "Admin@123";
      await admin.save();
      console.log("Updated Admin user password to Admin@123");
    }

    let adminRecord = await Admin.findOne({ email: "admin@sugarmuse.vn" });
    if (adminRecord) {
      adminRecord.password = "Admin@123";
      await adminRecord.save();
      console.log("Updated Admins collection password to Admin@123");
    }

    const total = await User.countDocuments();
    console.log(`\nDONE! Total users in MongoDB: ${total}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding simple users failed:", err);
    process.exit(1);
  }
}

seedSimpleUsers();
