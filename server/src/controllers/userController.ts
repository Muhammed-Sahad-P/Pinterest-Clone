import type { Request, Response } from "express";
import userModel from "../models/userModel";
import { StandardResponse } from "../utils/standardResponse";
import { CustomError } from "../utils/error/customError";
import { CustomRequest } from "../types/interfaces";
import { EditUserSchema } from "../utils/zodSchemas";

//Get user details
const getUserDetails = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  const user = await userModel.findById(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json(new StandardResponse("User fetched successfully", user));
};

//update user
const updateUser = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  const { username, email, profilePicture } = EditUserSchema.parse(req.body);

  const user = await userModel
    .findByIdAndUpdate(
      userId,
      { username, email, profilePicture },
      { new: true, runValidators: true }
    )
    .select("-password");

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json(new StandardResponse("User updated successfully", user));
};

export { getUserDetails, updateUser };
