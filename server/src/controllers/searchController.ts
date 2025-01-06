import type { Request, Response } from "express";
import pinModel from "../models/pinModel";
import { StandardResponse } from "../utils/standardResponse";
import { CustomError } from "../utils/error/customError";
import { CustomRequest } from "../types/interfaces";

const search = async (req: CustomRequest, res: Response) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (!searchTerm) {
    throw new CustomError("Search term is required", 400);
  }
  const pins = await pinModel
    .find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await pinModel.countDocuments({
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  });

  res.status(200).json(
    new StandardResponse("Search results", {
      pins,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
      },
    })
  );
};

export { search };
