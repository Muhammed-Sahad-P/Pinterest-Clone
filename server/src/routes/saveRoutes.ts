import express from "express";
import { toggleSavePin, fetchSavedPins } from "../controllers/saveController";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";

const router = express.Router();

router.get("/saved", verifyToken, errorCatch(fetchSavedPins));
router.post("/:pinId", verifyToken, errorCatch(toggleSavePin));

export default router;
