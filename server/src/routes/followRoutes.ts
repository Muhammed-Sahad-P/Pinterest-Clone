import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";
import { followUser, unfollowUser } from "../controllers/followController";

const router = express.Router();

router.put("/follow/:followUserId", verifyToken, errorCatch(followUser));
router.delete("/unfollow/:followUserId", verifyToken, errorCatch(unfollowUser));

export default router;
