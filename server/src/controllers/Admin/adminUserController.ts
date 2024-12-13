import type { Request, Response } from "express";
import { CustomError } from "../../utils/error/customError";
import { StandardResponse } from "../../utils/standardResponse";
import userModel from "../../models/userModel";
import { CustomRequest } from "../../types/interfaces";

//Get all users
const getAllUsers = async (req: CustomRequest, res: Response) => {
  const users = await userModel.find({});
  res
    .status(200)
    .json(new StandardResponse("Users fetched successfully", users));
};

//Get user by id
const getUserById = async (req: CustomRequest, res: Response) => {
  const { userId } = req.params;
  const user = await userModel.findById(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  res.status(200).json(new StandardResponse("User fetched successfully", user));
};

//Update user
const updateUser = async (req: CustomRequest, res: Response) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  const user = await userModel.findByIdAndUpdate(
    userId,
    { username, email },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  res.status(200).json(new StandardResponse("User updated successfully", user));
};

//delete user
const deleteUser = async (req: CustomRequest, res: Response) => {
  const { userId } = req.params;
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  res.status(200).json(new StandardResponse("User deleted successfully", user));
};

//block user
const blockUser = async (req: CustomRequest, res: Response) => {
  const { userId } = req.params;
  const user = await userModel.findByIdAndUpdate(userId, { isBlocked: true });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (user.isBlocked) {
    throw new CustomError("User already blocked", 400);
  }

  user.isBlocked = true;
  await user.save();

  res.status(200).json(new StandardResponse("User blocked successfully", user));
};

//unblock user
const unblockUser = async (req: CustomRequest, res: Response) => {
  const { userId } = req.params;
  const user = await userModel.findByIdAndUpdate(userId, { isBlocked: false });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  if (!user.isBlocked) {
    throw new CustomError("User already unblocked", 400);
  }

  user.isBlocked = false;
  await user.save();

  res
    .status(200)
    .json(new StandardResponse("User unblocked successfully", user));
};

//get all blocked users
const getAllBlockedUsers = async (req: CustomRequest, res: Response) => {
  const users = await userModel.find({ isBlocked: true });

  res
    .status(200)
    .json(new StandardResponse("Blocked users fetched successfully", users));
};

export {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  getAllBlockedUsers,
};
