import type { Request, Response } from "express";
import { CustomError } from "../utils/error/customError";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interfaces";
import categoryModel from "../models/categoryModel";
import { CategorySchema } from "../utils/zodSchemas";

//get all categories
const getAllCategories = async (req: CustomRequest, res: Response) => {
  const category = await categoryModel.find();

  if (!category) {
    throw new CustomError("Category not found", 404);
  }

  res
    .status(200)
    .json(new StandardResponse("Category fetched successfully", category));
};

//get category by id
const getCategoryById = async (req: CustomRequest, res: Response) => {
  const { categoryId } = req.params;

  const category = await categoryModel.findById(categoryId);

  if (!category) {
    throw new CustomError("Category not found", 404);
  }

  res
    .status(200)
    .json(new StandardResponse("Category fetched successfully", category));
};

export { getAllCategories, getCategoryById };
