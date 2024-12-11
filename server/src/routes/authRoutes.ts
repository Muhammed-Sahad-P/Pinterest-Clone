import express from "express";
import { register, login } from "../controllers/authController";
import { errorCatch } from "../utils/error/errorCatch";

const router = express.Router();

router.post("/register", errorCatch(register));
router.post("/login", errorCatch(login));

export default router;
