import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const sampleEnglishUsers = [
  {
    name: "Emily Watson",
    email: "emily.watson@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_1",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    isVerified: true
  },
  {
    name: "Oliver Smith",
    email: "oliver.smith@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_2",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    isVerified: true
  },
  {
    name: "Sophia Brown",
    email: "sophia.brown@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_3",
      url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    isVerified: true
  },
  {
    name: "James Wilson",
    email: "james.wilson@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_4",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    },
    isVerified: true
  },
  {
    name: "Lucas Miller",
    email: "lucas.miller@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_5",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    isVerified: true
  },
  {
    name: "Charlotte Davis",
    email: "charlotte.davis@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_6",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150"
    },
    isVerified: true
  },
  {
    name: "Liam Johnson",
    email: "liam.johnson@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_7",
      url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150"
    },
    isVerified: true
  },
  {
    name: "Isabella Martinez",
    email: "isabella.m@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_8",
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150"
    },
    isVerified: true
  },
  {
    name: "Ethan Anderson",
    email: "ethan.anderson@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_9",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
    },
    isVerified: true
  },
  {
    name: "Mia Taylor",
    email: "mia.taylor@sugarmuse.com",
    password: "Customer@2026",
    role: "user",
    avatar: {
      public_id: "avatar_user_10",
      url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150"
    },
    isVerified: true
  }
];

async function replaceWithEnglishUsers() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected successfully!");

    // Delete existing customer accounts (role: "user"), keep admin!
    const deleteResult = await User.deleteMany({ role: "user" });
    console.log(`Removed ${deleteResult.deletedCount} old customer accounts.`);

    let createdCount = 0;
    for (const u of sampleEnglishUsers) {
      // User.create triggers bcrypt pre('save') password hashing
      await User.create(u);
      createdCount++;
      console.log(`Created user: ${u.name} (${u.email})`);
    }

    const totalUsers = await User.countDocuments();
    const adminUser = await User.findOne({ role: "admin" });

    console.log(`\nDONE: Successfully added ${createdCount} English customer accounts.`);
    console.log(`Admin account preserved: ${adminUser?.email || "N/A"}`);
    console.log(`Total users in MongoDB: ${totalUsers}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Replacing users failed:", error);
    process.exit(1);
  }
}

replaceWithEnglishUsers();
