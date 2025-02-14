import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { errorCatch } from "../utils/error/errorCatch";
import { search } from "../controllers/searchController";

const router = express.Router();

router.get("/", verifyToken, errorCatch(search));

export default router;
