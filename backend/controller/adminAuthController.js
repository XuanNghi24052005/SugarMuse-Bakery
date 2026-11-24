import Admin from "../models/adminModel.js";
import ErrorHandler from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";

// Helper to send Admin Token
export const sendAdminToken = (admin, statusCode, res) => {
  const token = admin.getJWTToken();
  admin.password = undefined;

  const cookieExpireDays = Number(process.env.EXPIRE_COOKIE) || 7;
  const options = {
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "PRODUCTION",
  };

  res
    .status(statusCode)
    .cookie("adminToken", token, options)
    .cookie("token", token, options)
    .json({
      success: true,
      admin,
      token,
    });
};

// 1. Admin Login
export const adminLogin = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Admin Email and Password", 400));
  }

  const admin = await Admin.findOne({
    email: email.trim().toLowerCase(),
  }).select("+password");

  if (!admin) {
    return next(
      new ErrorHandler("Invalid Admin credentials or Admin does not exist", 401)
    );
  }

  const isPasswordMatched = await admin.verifyPassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Admin credentials", 401));
  }

  admin.lastLogin = Date.now();
  await admin.save({ validateBeforeSave: false });

  sendAdminToken(admin, 200, res);
});

// 2. Admin Logout
export const adminLogout = handleAsyncError(async (req, res, next) => {
  res.cookie("adminToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
});

// 3. Get Current Admin Profile
export const getAdminProfile = handleAsyncError(async (req, res, next) => {
  const admin = req.admin;
  res.status(200).json({
    success: true,
    admin,
  });
});

// 4. Update Admin Password
export const updateAdminPassword = handleAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please provide old and new password", 400));
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("New passwords do not match", 400));
  }

  const admin = await Admin.findById(req.admin._id).select("+password");

  const isPasswordMatched = await admin.verifyPassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect old password", 400));
  }

  admin.password = newPassword;
  await admin.save();

  sendAdminToken(admin, 200, res);
});
