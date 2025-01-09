import type { Request, Response } from "express";
import userModel from "../models/userModel";
import { CustomRequest } from "../types/interfaces";
import { StandardResponse } from "../utils/standardResponse";
import { CustomError } from "../utils/error/customError";
import { Types } from "mongoose";

// follow user
const followUser = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  const { followUserId } = req.params;

  if (followUserId === userId) {
    throw new CustomError("You cannot follow yourself", 400);
  }

  const userIdObj = new Types.ObjectId(userId);
  const followUserIdObj = new Types.ObjectId(followUserId);

  const followUser = await userModel.findById(followUserId);
  const currentUser = await userModel.findById(userId);

  if (!followUser) {
    throw new CustomError("Target user not found", 404);
  }

  if (!currentUser) {
    throw new CustomError("Current user not found", 404);
  }

  if (!currentUser.following) {
    currentUser.following = [];
  }

  if (!followUser.followers) {
    followUser.followers = [];
  }

  if (currentUser.following.includes(followUserIdObj)) {
    throw new CustomError("You are already following this user", 400);
  }

  currentUser.following.push(followUserIdObj);
  followUser.followers.push(userIdObj);

  await currentUser.save();
  await followUser.save();

  res.status(200).json(
    new StandardResponse("User followed successfully", {
      currentUser,
      followUser,
    })
  );
};

// unfollow user
const unfollowUser = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;
  const { followUserId } = req.params;

  if (followUserId === userId) {
    throw new CustomError("You cannot unfollow yourself", 400);
  }

  const userIdObj = new Types.ObjectId(userId);
  const followUserIdObj = new Types.ObjectId(followUserId);

  const followUser = await userModel.findById(followUserId);
  const currentUser = await userModel.findById(userId);

  if (!followUser) {
    throw new CustomError("Target user not found", 404);
  }

  if (!currentUser) {
    throw new CustomError("Current user not found", 404);
  }

  if (!currentUser.following) {
    currentUser.following = [];
  }

  if (!followUser.followers) {
    followUser.followers = [];
  }

  if (!currentUser.following.includes(followUserIdObj)) {
    throw new CustomError("You are not following this user", 400);
  }

  currentUser.following = currentUser.following.filter(
    (id) => !id.equals(followUserIdObj)
  );
  followUser.followers = followUser.followers.filter(
    (id) => !id.equals(userIdObj)
  );

  await currentUser.save();
  await followUser.save();

  res.status(200).json(
    new StandardResponse("User unfollowed successfully", {
      currentUser,
      followUser,
    })
  );
};

//user followers
const userFollowers = async (req: CustomRequest, res: Response) => {
  const { userId } = req.params;

  const user = await userModel
    .findById(userId)
    .populate("followers", "email username");

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  res.status(200).json(
    new StandardResponse("Followers fetched successfully", {
      followers: user.followers,
      following: user.following,
    })
  );
};

export { followUser, unfollowUser, userFollowers };
