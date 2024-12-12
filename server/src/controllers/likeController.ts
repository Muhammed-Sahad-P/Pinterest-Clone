import type { Request, Response } from "express";
import likeModel from "../models/likeModel";
import pinModel from "../models/pinModel";
import { CustomError } from "../utils/error/customError";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interfaces";

// like a pin
const likeUnlikePin = async (req: CustomRequest, res: Response) => {
  const { pinId } = req.params;
  const userId = req.user?.id;

  const pin = await pinModel.findById(pinId);

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  const existingLike = await likeModel.findOne({ pinId, likedBy: userId });

  if (existingLike) {
    await likeModel.deleteOne({ _id: existingLike._id });

    pin.likeCount = Math.max(0, pin.likeCount - 1);
    await pin.save();

    res.status(200).json(
      new StandardResponse("Pin unlike successfully", {
        likeCount: pin.likeCount,
      })
    );
  } else {
    const like = await likeModel.create({
      pinId,
      likedBy: userId,
    });

    pin.likeCount = (pin.likeCount || 0) + 1;
    await pin.save();

    res.status(200).json(
      new StandardResponse("Pin liked Successfully", {
        likeCount: pin.likeCount,
        likedId: like._id,
      })
    );
  }
};

export { likeUnlikePin };
