import type { Request, Response } from "express";
import pinModel from "../../models/pinModel";
import { PinSchema } from "../../utils/zodSchemas";
import { StandardResponse } from "../../utils/standardResponse";
import { CustomError } from "../../utils/error/customError";
import { CustomRequest } from "../../types/interfaces";

//get all pins
const getAllPins = async (req: CustomRequest, res: Response) => {
  const pins = await pinModel
    .find({})
    .populate("createdBy", "username email")
    .exec();
  res.status(200).json(new StandardResponse("Pins fetched successfully", pins));
};

//update pin
const updatePin = async (req: CustomRequest, res: Response) => {
  const { pinId } = req.params;
  const updateData = PinSchema.parse(req.body);

  const updatePin = await pinModel.findByIdAndUpdate(pinId, updateData, {
    new: true,
  });

  if (!updatePin) {
    throw new CustomError("Pin not found", 404);
  }

  res
    .status(200)
    .json(new StandardResponse("Pin updated successfully", updatePin));
};

//delete a pin
const deletePin = async (req: CustomRequest, res: Response) => {
  const { pinId } = req.params;

  const pin = await pinModel.findByIdAndDelete(pinId);

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  res.status(200).json(new StandardResponse("Pin deleted successfully", null));
};

export { getAllPins, updatePin, deletePin };
