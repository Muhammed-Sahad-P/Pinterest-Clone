import type { Request, Response } from "express";
import { CustomRequest } from "../types/interfaces";
import { StandardResponse } from "../utils/standardResponse";
import pinModel from "../models/pinModel";
import saveModel from "../models/saveModel";
import { CustomError } from "../utils/error/customError";
import { userInfo } from "os";

//Save a pin
const savePin = async (req: CustomRequest, res: Response) => {
  const { pinId } = req.params;
  const userId = req.user?.id;

  const pin = await pinModel.findById(pinId);

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  const existingSave = await saveModel.findOne({ pinId, savedBy: userId });

  if (existingSave) {
    res.status(400).json(new StandardResponse("Pin already saved"));
  }

  await saveModel.create({
    pinId,
    savedBy: userId,
  });

  pin.saveCount = (Number(pin.saveCount) || 0) + 1;
  await pin.save();

  res.status(200).json(new StandardResponse("Pin saved successfully", pin));
};

//Unsave a pin
const unSavePin = async (req: CustomRequest, res: Response) => {
  const { pinId } = req.params;
  const userId = req.user?.id;

  const pin = await pinModel.findById(pinId);

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  const savedPin = await saveModel.findOne({ pinId, savedBy: userId });

  if (!savedPin) {
    throw new CustomError("Pin not found in saved list", 404);
  }

  await saveModel.deleteOne({ pinId, savedBy: userId });

  if (typeof pin.saveCount === "number") {
    pin.saveCount = Math.max(0, pin.saveCount - 1);
    await pin.save();
  } else {
    pin.saveCount = 0;
    await pin.save();
  }

  res.status(200).json(new StandardResponse("Pin unsaved successfully"));
};

export { savePin, unSavePin };
