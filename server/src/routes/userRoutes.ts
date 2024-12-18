import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";
import { getUserDetails, updateUser } from "../controllers/userController";

const router = express.Router();

router.get("/:userId", verifyToken, errorCatch(getUserDetails));
router.put("/:userId", verifyToken, errorCatch(updateUser));

export default router;
