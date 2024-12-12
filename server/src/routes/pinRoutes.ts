import express from "express";
import {
  createPin,
  deletePinById,
  getAllPins,
  getPinById,
} from "../controllers/pinController";
import { errorCatch } from "../utils/error/errorCatch";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", verifyToken, errorCatch(createPin));
router.get("/", verifyToken, errorCatch(getAllPins));
router.get("/:id", verifyToken, errorCatch(getPinById));
router.delete("/:id", verifyToken, errorCatch(deletePinById));

export default router;
