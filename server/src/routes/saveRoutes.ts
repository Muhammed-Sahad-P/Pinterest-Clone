import express from "express";
import {
  savePin,
  unSavePin,
  fetchSavedPins,
} from "../controllers/saveController";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";

const router = express.Router();

router.get("/saved", verifyToken, errorCatch(fetchSavedPins));
router.post("/:pinId", verifyToken, errorCatch(savePin));
router.delete("/:pinId", verifyToken, errorCatch(unSavePin));

export default router;
