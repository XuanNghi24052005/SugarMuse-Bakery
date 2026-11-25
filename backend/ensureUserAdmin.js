import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/userModel.js";
import Admin from "./models/adminModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

async function check() {
  await mongoose.connect(process.env.DB_URL);
  
  // Ensure in users collection
  let userAdmin = await User.findOne({ email: "admin@sugarmuse.vn" });
  if (!userAdmin) {
    userAdmin = await User.create({
      name: "Sugar Muse Admin",
      email: "admin@sugarmuse.vn",
      password: "SugarMuseAdmin@2026",
      role: "admin",
      avatar: { public_id: "admin_avatar", url: "/images/sugar-muse-favicon.svg" },
      isVerified: true
    });
    console.log("Created admin in users collection:", userAdmin.email);
  } else {
    userAdmin.role = "admin";
    await userAdmin.save();
    console.log("Admin in users collection verified:", userAdmin.email, userAdmin.role);
  }

  // Ensure in admins collection
  let adminRecord = await Admin.findOne({ email: "admin@sugarmuse.vn" });
  if (!adminRecord) {
    adminRecord = await Admin.create({
      name: "Sugar Muse Admin",
      email: "admin@sugarmuse.vn",
      password: "SugarMuseAdmin@2026",
      role: "admin",
      avatar: { public_id: "admin_avatar", url: "/images/sugar-muse-favicon.svg" }
    });
    console.log("Created in admins collection:", adminRecord.email);
  } else {
    console.log("Admin in admins collection verified:", adminRecord.email);
  }

  await mongoose.disconnect();
}
check();
