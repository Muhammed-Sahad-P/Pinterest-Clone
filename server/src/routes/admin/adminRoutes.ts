import express from "express";
import { adminLogin } from "../../controllers/Admin/adminAuthController";
import { errorCatch } from "../../utils/error/errorCatch";
import { verifyToken } from "../../middlewares/verifyToken";

const router = express.Router();

router.post("/login", errorCatch(adminLogin));

export default router;
