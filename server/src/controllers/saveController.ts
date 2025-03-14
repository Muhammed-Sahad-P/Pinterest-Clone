import type { Request, Response } from "express";
import { CustomRequest } from "../types/interfaces";
import { StandardResponse } from "../utils/standardResponse";
import pinModel from "../models/pinModel";
import saveModel from "../models/saveModel";
import { CustomError } from "../utils/error/customError";
import mongoose from "mongoose";

// Toggle save pin
const toggleSavePin = async (req: CustomRequest, res: Response) => {
  const { pinId } = req.params;
  const userId = req.user?.id;

  if (!mongoose.Types.ObjectId.isValid(pinId)) {
    throw new CustomError("Invalid pin ID", 400);
  }

  const pin = await pinModel.findById(pinId);

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  const existingSave = await saveModel.findOne({ pinId, savedBy: userId });

  if (existingSave) {
    await saveModel.deleteOne({ pinId, savedBy: userId });
    pin.saveCount = Math.max(0, (Number(pin.saveCount) || 0) - 1);
    await pin.save();
    res.status(200).json(new StandardResponse("Pin unsaved successfully", pin));
  } else {
    await saveModel.create({ pinId, savedBy: userId });
    pin.saveCount = (Number(pin.saveCount) || 0) + 1;
    await pin.save();
    res.status(200).json(new StandardResponse("Pin saved successfully", pin));
  }
};

// Fetch saved pins
const fetchSavedPins = async (req: CustomRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new CustomError("User not found", 400);
  }

  const savedPins = await saveModel.find({ savedBy: userId }).populate("pinId");

  res
    .status(200)
    .json(new StandardResponse("Saved pins fetched successfully", savedPins));
};

export { toggleSavePin, fetchSavedPins };
