import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";
import {
  addComment,
  getAllComments,
  deleteComment,
} from "../controllers/commentController";

const router = express.Router();

router.post("/:pinId", verifyToken, errorCatch(addComment));
router.get("/:pinId", verifyToken, errorCatch(getAllComments));
router.delete("/:commentId", verifyToken, errorCatch(deleteComment));

export default router;
