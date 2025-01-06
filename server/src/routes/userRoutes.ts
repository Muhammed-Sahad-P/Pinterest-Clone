import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";
import { getUserDetails, updateUser } from "../controllers/userController";
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();

router.get("/:userId", verifyToken, errorCatch(getUserDetails));
router.put(
  "/:userId",
  verifyToken,
  upload.single("profilePicture"),
  errorCatch(updateUser)
);

export default router;
