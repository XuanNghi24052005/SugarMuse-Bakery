import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import Admin from "./models/adminModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

const mongoUrl = process.env.DB_URL;

async function setupSeparatedAdminAndClear() {
  if (!mongoUrl) {
    console.error("❌ Missing DB_URL in config.env");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB successfully!");

    // 1. Ensure dedicated Admin account exists in 'admins' collection
    let admin = await Admin.findOne({ email: "admin@sugarmuse.vn" });
    if (!admin) {
      console.log("Creating dedicated Admin account in 'admins' collection...");
      admin = await Admin.create({
        name: "Sugar Muse Admin",
        email: "admin@sugarmuse.vn",
        password: "SugarMuseAdmin@2026",
        role: "admin",
        avatar: {
          public_id: "sugar_muse_admin_avatar",
          url: "/images/sugar-muse-favicon.svg",
        },
      });
      console.log(`✅ Dedicated Admin created in 'admins' collection: ${admin.email}`);
    } else {
      console.log(`ℹ️ Dedicated Admin exists in 'admins' collection: ${admin.email}`);
    }

    // 2. Remove admin from 'users' collection so 'users' is 100% pure customers
    const removedUserAdmin = await User.deleteMany({ email: "admin@sugarmuse.vn" });
    if (removedUserAdmin.deletedCount > 0) {
      console.log(`🧹 Cleaned ${removedUserAdmin.deletedCount} admin records from 'users' collection.`);
    }

    // 3. Clear products (if any mock left)
    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products. Database is clean for real cakes.`);

    console.log("\n🎉 SEPARATION COMPLETE:");
    console.log(" • 'admins' collection: Holds official store administrators.");
    console.log(" • 'users' collection: Holds 100% store customers only.");
    console.log(" • Admin Credentials -> Email: admin@sugarmuse.vn | Password: SugarMuseAdmin@2026");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error during separation setup:", error.message);
    process.exit(1);
  }
}

setupSeparatedAdminAndClear();
