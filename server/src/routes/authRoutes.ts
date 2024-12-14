import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import { errorCatch } from "../utils/error/errorCatch";

const router = express.Router();

router.post("/register", errorCatch(register));
router.post("/login", errorCatch(login));
router.post("/forgotpassword", errorCatch(forgotPassword));
router.patch("/resetpassword/:token", errorCatch(resetPassword));

export default router;
