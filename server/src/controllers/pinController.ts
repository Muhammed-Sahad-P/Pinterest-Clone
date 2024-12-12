import type { Request, Response } from "express";
import pinModel from "../models/pinModel";
import boardModel from "../models/boardModel";
import { PinSchema } from "../utils/zodSchemas";
import { CustomError } from "../utils/error/customError";
import { StandardResponse } from "../utils/standardResponse";

interface CustomRequest extends Request {
  user?: { id: string };
}

// Create pin
const createPin = async (req: CustomRequest, res: Response) => {
  const { imageUrl, description, boardId } = PinSchema.parse(req.body);

  const board = await boardModel.findById(boardId);
  if (!board) {
    throw new CustomError("Board not found", 404);
  }

  if (board.createdBy.toString() !== req.user?.id) {
    throw new CustomError("Unauthorized to add pins to this board", 403);
  }

  const pin = await pinModel.create({
    imageUrl,
    description,
    boardId,
    createdBy: req.user?.id,
  });

  res.status(201).json(new StandardResponse("Pin created successfully", pin));
};

// Get all pins
const getAllPins = async (_req: Request, res: Response) => {
  const pins = await pinModel
    .find()
    .populate("createdBy", "username email")
    .sort({ createdAt: -1 });

  res.status(200).json(new StandardResponse("Pins fetched successfully", pins));
};

// Get pin by id
const getPinById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const pin = await pinModel
    .findById(id)
    .populate("createdBy", "username email");

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  res.status(200).json(new StandardResponse("Pin fetched successfully", pin));
};

// Delete pin by id
const deletePinById = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;

  const pin = await pinModel.findById(id);
  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  if (pin.createdBy.toString() !== req.user?.id) {
    throw new CustomError("Unauthorized to delete this pin", 403);
  }

  await pinModel.findByIdAndDelete(id);

  res.status(200).json(new StandardResponse("Pin deleted successfully", null));
};

export { createPin, getAllPins, getPinById, deletePinById };
