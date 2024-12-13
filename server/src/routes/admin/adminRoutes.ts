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
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/Admin/adminCategoryController";
import {
  deletePin,
  updatePin,
  getAllPins,
} from "../../controllers/Admin/adminPinController";
import {
  getAllBoards,
  updateBoard,
  deleteBoard,
} from "../../controllers/Admin/adminBoardController";

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

//category routes
router.post("/category", adminAuthenticate, errorCatch(createCategory)); //create category
router.put(
  "/category/:categoryId",
  adminAuthenticate,
  errorCatch(updateCategory)
); //update category
router.delete(
  "/category/:categoryId",
  adminAuthenticate,
  errorCatch(deleteCategory)
); //delete category

//Pin routes
router.get("/pins", adminAuthenticate, errorCatch(getAllPins)); //get all pins
router.put("/pins/:pinId", adminAuthenticate, errorCatch(updatePin)); //update pin
router.delete("/pins/:pinId", adminAuthenticate, errorCatch(deletePin)); //delete pin

//Board routes
router.get("/boards", adminAuthenticate, errorCatch(getAllBoards)); //get all boards
router.put("/boards/:boardId", adminAuthenticate, errorCatch(updateBoard)); //update board
router.delete("/boards/:boardId", adminAuthenticate, errorCatch(deleteBoard)); //delete board

export default router;
