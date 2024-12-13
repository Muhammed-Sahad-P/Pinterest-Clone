import express from "express";
import { adminLogin } from "../../controllers/Admin/adminAuthController";
import { errorCatch } from "../../utils/error/errorCatch";
import { adminAuthenticate } from "../../middlewares/Admin/adminAuthenticate";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  getAllBlockedUsers,
} from "../../controllers/Admin/adminUserController";

const router = express.Router();

router.post("/login", errorCatch(adminLogin)); //auth route

//user routes
router.get("/users", adminAuthenticate, errorCatch(getAllUsers)); //get all users
router.get("/users/:userId", adminAuthenticate, errorCatch(getUserById)); //get user by id
router.put("/users/:userId", adminAuthenticate, errorCatch(updateUser)); //update user
router.delete("/users/:userId", adminAuthenticate, errorCatch(deleteUser)); //delete user
router.put("/users/:userId/block", adminAuthenticate, errorCatch(blockUser)); //block user
router.put(
  "/users/:userId/unblock",
  adminAuthenticate,
  errorCatch(unblockUser)
); //unblock user
router.get("/blocked-users", adminAuthenticate, errorCatch(getAllBlockedUsers)); //get all blocked users

export default router;
