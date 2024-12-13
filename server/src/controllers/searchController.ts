import type { Request, Response } from "express";
import pinModel from "../models/pinModel";
import boardModel from "../models/boardModel";
import userModel from "../models/userModel";
import { StandardResponse } from "../utils/standardResponse";
import { CustomError } from "../utils/error/customError";
import { CustomRequest } from "../types/interfaces";

const search = async (req: CustomRequest, res: Response) => {
  const searchTerm = req.query.searchTerm as string;

  if (!searchTerm) {
    throw new CustomError("Search term is required", 400);
  }

  const pin = await pinModel.find({
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ],
  });

  const board = await boardModel.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ],
  });

  const user = await userModel
    .find({
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    })
    .select("-password -__v");

  res
    .status(200)
    .json(new StandardResponse("Search results", { pin, board, user }));
};

export { search };
