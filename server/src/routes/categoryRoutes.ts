import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";
import {
  getAllCategories,
  getCategoryById,
} from "../controllers/categoryController";

const router = express.Router();
router.get("/", verifyToken, errorCatch(getAllCategories));
router.get("/:categoryId", verifyToken, errorCatch(getCategoryById));

export default router;
