import type { Request, Response } from "express";
import userModel from "../models/userModel";
import { StandardResponse } from "../utils/standardResponse";
import { CustomError } from "../utils/error/customError";
import { CustomRequest } from "../types/interfaces";
import { EditUserSchema } from "../utils/zodSchemas";
import cloudinary from "../utils/cloudinary";

//Get user details
const getUserDetails = async (req: CustomRequest, res: Response) => {
  const { userId } = req.params;
  const user = await userModel.findById(userId);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json(new StandardResponse("User fetched successfully", user));
};

//update user
const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { username, email } = EditUserSchema.omit({
    profilePicture: true,
  }).parse(req.body);

  let profilePicture;

  if (req.file) {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "profile_pictures",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.write(req.file?.buffer);
        uploadStream.end();
      });

      profilePicture = result.secure_url;
    } catch (error) {
      throw new CustomError("Failed to upload profile picture", 500);
    }
  }

  const updatedUser = await userModel
    .findByIdAndUpdate(
      userId,
      { username, email, profilePicture },
      { new: true, runValidators: true }
    )
    .select("-password");

  if (!updatedUser) {
    throw new CustomError("User not found", 404);
  }

  res
    .status(200)
    .json(new StandardResponse("User updated successfully", updatedUser));
};

export { getUserDetails, updateUser };
