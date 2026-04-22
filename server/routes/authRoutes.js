import express from "express";
import {
  login,
  logout,
  me,
  refreshSession,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refreshSession);
router.post("/logout", logout);
router.get("/me", protect, me);

export default router;
