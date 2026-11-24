import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

const mongoUrl = process.env.DB_URL;

async function clearProducts() {
  if (!mongoUrl) {
    console.error("❌ Missing DB_URL in config.env");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB successfully!");

    // Ensure Admin account exists so user can log in immediately
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.log("Creating default Sugar Muse Admin user...");
      admin = await User.create({
        name: "Sugar Muse Admin",
        email: "admin@sugarmuse.vn",
        password: "SugarMuseAdmin@2026",
        role: "admin",
        avatar: {
          public_id: "sugar_muse_admin_avatar",
          url: "/images/sugar-muse-favicon.svg",
        },
        isVerified: true,
      });
      console.log(`Created admin: ${admin.email}`);
    } else {
      console.log(`Existing Admin account: ${admin.email}`);
    }

    // Delete all mock products
    const result = await Product.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} products from database.`);
    console.log("Database is clean and ready for real bakery products!");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error clearing products:", error.message);
    process.exit(1);
  }
}

clearProducts();
