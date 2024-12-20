import express from "express";
import {
  createPin,
  getAllPins,
  getPinById,
  deletePinById,
  upload,
} from "../controllers/pinController";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";

const router = express.Router();

router.post("/", verifyToken, upload.single("image"), errorCatch(createPin));
router.get("/", verifyToken, errorCatch(getAllPins));
router.get("/:id", verifyToken, errorCatch(getPinById));
router.delete("/:id", verifyToken, errorCatch(deletePinById));

export default router;
