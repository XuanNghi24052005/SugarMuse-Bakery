import express from "express";
import {
  adminLogin,
  adminLogout,
  getAdminProfile,
  updateAdminPassword,
} from "../controller/adminAuthController.js";
import { verifyAdminAuth } from "../middleware/verifyUserAuth.js";

const router = express.Router();

router.post("/admin/auth/login", adminLogin);
router.get("/admin/auth/logout", adminLogout);
router.get("/admin/auth/me", verifyAdminAuth, getAdminProfile);
router.put("/admin/auth/password/update", verifyAdminAuth, updateAdminPassword);

export default router;
