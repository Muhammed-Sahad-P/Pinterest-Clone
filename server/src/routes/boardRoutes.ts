import express from "express";
import {
  createBoard,
  addPinToBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController";
import { errorCatch } from "../utils/error/errorCatch";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/", verifyToken, errorCatch(createBoard));
router.post("/:boardId/pins", verifyToken, errorCatch(addPinToBoard));
router.get("/", verifyToken, errorCatch(getAllBoards));
router.get("/:id", verifyToken, errorCatch(getBoardById));
router.put("/:id", verifyToken, errorCatch(updateBoard));
router.delete("/:id", verifyToken, errorCatch(deleteBoard));

export default router;
