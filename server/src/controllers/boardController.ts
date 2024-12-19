import type { Request, Response } from "express";
import boardModel from "../models/boardModel";
import { BoardSchema, PinSchema } from "../utils/zodSchemas";
import { CustomError } from "../utils/error/customError";
import { StandardResponse } from "../utils/standardResponse";
import pinModel from "../models/pinModel";
import { CustomRequest } from "../types/interfaces";

//create board
const createBoard = async (req: CustomRequest, res: Response) => {
  const { name, description } = BoardSchema.parse(req.body);
  console.log(req.user);
  const board = await boardModel.create({
    name,
    description,
    createdBy: req.user?.id,
  });

  res
    .status(201)
    .json(new StandardResponse("Board created successfully", board));
};

//add pin to board
const addPinToBoard = async (req: CustomRequest, res: Response) => {
  const { boardId } = req.params;
  const { description } = PinSchema.parse(req.body);

  const board = await boardModel.findById(boardId);

  if (!board) {
    throw new CustomError("Board not found", 404);
  }

  if (board.createdBy.toString() !== req.user?.id) {
    throw new CustomError("Unauthorized to add pin to this board", 403);
  }

  const pin = await pinModel.create({
    description,
    boardId,
    createdBy: req.user?.id,
  });

  res
    .status(200)
    .json(new StandardResponse("Pin added to board Successfully", pin));
};

//get all boards for logged-in users
const getAllBoards = async (req: CustomRequest, res: Response) => {
  const boards = await boardModel
    .find({ createdBy: req.user?.id })
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new StandardResponse("Boards fetched Successfully", boards));
};

//get board by id
const getBoardById = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const board = await boardModel
    .findByIdAndUpdate(id, { $push: { pins: req.user?.id } }, { new: true })
    .populate({
      path: "pins",
      select: "imageUrl description likeCount saveCount createdAt",
    });

  if (!board) {
    throw new CustomError("Board not found", 404);
  }

  if (board.createdBy.toString() !== req.user?.id) {
    throw new CustomError("Unauthorized to view this board", 403);
  }

  res
    .status(200)
    .json(new StandardResponse("Board fetched successfully", board));
};

//update board
const updateBoard = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { name, description } = BoardSchema.parse(req.body);

  const board = await boardModel.findById(id);

  if (!board) {
    throw new CustomError("Board not found", 404);
  }

  if (board.createdBy.toString() !== req.user?.id) {
    throw new CustomError("Unauthorized to update this board", 403);
  }

  board.name = name || board.name;
  board.description = description || board.description;

  await board.save();
  res
    .status(200)
    .json(new StandardResponse("Board updated successfully", board));
};

//delete a board
const deleteBoard = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const board = await boardModel.findById(id);

  if (!board) {
    throw new CustomError("Board not found", 404);
  }

  if (board.createdBy.toString() !== req.user?.id) {
    throw new CustomError("Unauthorized to delete board", 403);
  }

  await pinModel.deleteMany({ boardId: id });

  await boardModel.findByIdAndDelete(id);

  res
    .status(200)
    .json(new StandardResponse("Board and pins deleted successfully", null));
};

export {
  createBoard,
  addPinToBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard,
};
