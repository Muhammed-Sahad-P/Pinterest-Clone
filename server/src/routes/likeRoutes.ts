import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";
import { likeUnlikePin } from "../controllers/likeController";

const router = express.Router();

router.post("/:pinId", verifyToken, errorCatch(likeUnlikePin));

export default router;
