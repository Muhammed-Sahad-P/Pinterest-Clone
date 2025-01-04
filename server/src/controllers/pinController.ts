import multer from "multer";
import { Request, Response } from "express";
import pinModel from "../models/pinModel";
import boardModel from "../models/boardModel";
import { PinSchema } from "../utils/zodSchemas";
import { CustomError } from "../utils/error/customError";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interfaces";
import cloudinary from "../utils/cloudinary";
import { model } from "mongoose";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create Pin
const createPin = async (req: CustomRequest, res: Response) => {
  const { description, boardId } = PinSchema.parse(req.body);

  if (!req.file) {
    throw new CustomError("No image file provided", 400);
  }

  const result = await new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: `pins/${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    if (req.file) {
      uploadStream.write(req.file.buffer);
      uploadStream.end();
    }
  });

  const imageUrl = result.secure_url;
  if (!imageUrl) {
    throw new CustomError("Failed to upload image", 500);
  }

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

  board.pins.push(pin._id);
  await board.save();

  res.status(201).json(new StandardResponse("Pin created successfully", pin));
};

// Get all Pins
const getAllPins = async (_req: Request, res: Response) => {
  const pins = await pinModel
    .find()
    .populate("createdBy", "username email")
    .sort({ createdAt: -1 });

  res.status(200).json(new StandardResponse("Pins fetched successfully", pins));
};

// Get Pin by ID
const getPinById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const pin = await pinModel
    .findById(id)
    .populate("createdBy", "username email")
    .populate({
      path: "comments",
      populate: { path: "createdBy", model: "User" },
    });

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  res.status(200).json(new StandardResponse("Pin fetched successfully", pin));
};

//update pin
const updatePin = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const updateData = PinSchema.parse(req.body);

  const updatePin = await pinModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatePin) {
    throw new CustomError("Pin not found", 404);
  }

  res
    .status(200)
    .json(new StandardResponse("Pin updated successfully", updatePin));
};

// Delete Pin by ID
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

export { createPin, getAllPins, getPinById, updatePin, deletePinById, upload };
