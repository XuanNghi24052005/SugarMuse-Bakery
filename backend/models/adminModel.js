import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter admin name"],
      maxLength: [40, "Name cannot exceed 40 characters"],
      minLength: [2, "Name should have at least 2 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter admin email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter admin password"],
      minLength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        default: "sugar_muse_admin_avatar",
      },
      url: {
        type: String,
        default: "/images/sugar-muse-favicon.svg",
      },
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin", "superadmin"],
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// Generate JWT token for Admin
adminSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, isAdmin: true },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

// Verify password
adminSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model("Admin", adminSchema);
