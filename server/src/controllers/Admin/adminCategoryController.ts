import type { Request, Response } from "express";
import categoryModel from "../../models/categoryModel";
import { StandardResponse } from "../../utils/standardResponse";
import { CustomError } from "../../utils/error/customError";
import { CategorySchema } from "../../utils/zodSchemas";
import { CustomRequest } from "../../types/interfaces";

//Create category
const createCategory = async (req: CustomRequest, res: Response) => {
  const { name, description } = CategorySchema.parse(req.body);

  if (!name) {
    throw new CustomError("Category name is required", 400);
  }

  const newCategory = await categoryModel.create({
    name,
    description,
  });

  await newCategory.save();

  res
    .status(200)
    .json(new StandardResponse("Category created successfully", newCategory));
};

//update a category
const updateCategory = async (req: CustomRequest, res: Response) => {
  const { categoryId } = req.params;
  const { name, description } = CategorySchema.parse(req.body);

  const category = await categoryModel.findById(categoryId);

  if (!category) {
    throw new CustomError("Category not found", 404);
  }

  if (name) category.name = name;
  if (description) category.description = description;

  await category.save();

  res
    .status(200)
    .json(new StandardResponse("Category updated successfully", category));
};

//delete category
const deleteCategory = async (req: CustomRequest, res: Response) => {
  const { categoryId } = req.params;

  const category = await categoryModel.findByIdAndDelete(categoryId);

  if (!category) {
    throw new CustomError("Category not found", 404);
  }

  res
    .status(200)
    .json(new StandardResponse("Category deleted successfully", null));
};

export { createCategory, updateCategory, deleteCategory };
