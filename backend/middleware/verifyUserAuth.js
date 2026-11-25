import handleAsyncError from "./handleAsyncError.js";
import ErrorHandler from "../utils/handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";

// 1. Verify Customer Authentication (for storefront & cart)
export const verifyUserAuth = handleAsyncError(async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1]);

  if (!token) {
    return next(
      new ErrorHandler(
        "You are not logged in! Please login to access this resource",
        401
      )
    );
  }

  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return next(
      new ErrorHandler("Invalid or expired session, please login again", 401)
    );
  }

  const user = await User.findById(decodedData.id);
  if (!user) {
    return next(
      new ErrorHandler("User belonging to this token no longer exists", 401)
    );
  }

  req.user = user;
  next();
});

// Optional User Authentication (attaches user if present, but doesn't block guests)
export const optionalUserAuth = handleAsyncError(async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1]);

  if (token) {
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decodedData.id);
      if (user) {
        req.user = user;
      }
    } catch {
      // ignore
    }
  }
  next();
});

// 2. Verify Dedicated Admin Authentication (for /admin portal)
export const verifyAdminAuth = handleAsyncError(async (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1]);

  if (!token) {
    return next(
      new ErrorHandler(
        "Admin access restricted. Please login through the Admin Portal.",
        401
      )
    );
  }

  let decodedData;
  try {
    decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return next(
      new ErrorHandler(
        "Admin session has expired. Please login again.",
        401
      )
    );
  }

  // Look in dedicated Admin collection first
  let admin = await Admin.findById(decodedData.id);

  // Fallback to User with admin role for seamless transition
  if (!admin) {
    const userAdmin = await User.findById(decodedData.id);
    if (userAdmin && userAdmin.role === "admin") {
      admin = userAdmin;
    }
  }

  if (!admin) {
    return next(
      new ErrorHandler(
        "Unauthorized. Administrator credentials required.",
        403
      )
    );
  }

  req.admin = admin;
  req.user = admin; // Backwards-compatible for routes using req.user
  next();
});

// 3. Higher-order function for role-based authorization
export const roleBasedAuth = (...roles) => {
  return (req, res, next) => {
    const actor = req.admin || req.user;
    if (!actor) {
      return next(
        new ErrorHandler(
          "You are not logged in! Please login to access this resource",
          401
        )
      );
    }
    if (!roles.includes(actor.role)) {
      return next(
        new ErrorHandler(
          `Role: ${actor.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
