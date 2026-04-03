import express from "express";
import {
  changePassword,
  login,
  logout,
  me,
  refreshSession,
  register,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshSession);
router.post("/logout", logout);
router.get("/me", protect, me);
router.put("/change-password", protect, changePassword);

export default router;
