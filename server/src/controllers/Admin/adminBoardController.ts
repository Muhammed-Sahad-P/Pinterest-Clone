import type { Request, Response } from "express";
import boardModel from "../../models/boardModel";
import { StandardResponse } from "../../utils/standardResponse";
import { CustomError } from "../../utils/error/customError";
import { CustomRequest } from "../../types/interfaces";
import { BoardSchema } from "../../utils/zodSchemas";

//get all boards
const getAllBoards = async (req: CustomRequest, res: Response) => {
  const boards = await boardModel
    .find()
    .populate("createdBy", "username email")
    .exec();

  res
    .status(200)
    .json(new StandardResponse("Boards fetched successfully", boards));
};

//update a board
const updateBoard = async (req: CustomRequest, res: Response) => {
  const { boardId } = req.params;
  const updateData = BoardSchema.parse(req.body);

  const updateBoard = await boardModel.findByIdAndUpdate(boardId, updateData, {
    new: true,
  });

  if (!updateBoard) {
    throw new CustomError("Board not found", 404);
  }

  res
    .status(200)
    .json(new StandardResponse("Board updated successfully", updateBoard));
};

//delete a board
const deleteBoard = async (req: CustomRequest, res: Response) => {
  const { boardId } = req.params;

  const board = await boardModel.findByIdAndDelete(boardId);

  if (!board) {
    throw new CustomError("Board not found", 404);
  }

  res
    .status(200)
    .json(new StandardResponse("Board deleted successfully", null));
};

export { getAllBoards, updateBoard, deleteBoard };
