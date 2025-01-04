import type { Request, Response } from "express";
import { CommentSchema } from "../utils/zodSchemas";
import commentModel from "../models/commentModel";
import pinModel from "../models/pinModel";
import { CustomError } from "../utils/error/customError";
import { StandardResponse } from "../utils/standardResponse";
import { CustomRequest } from "../types/interfaces";

// Add comment
const addComment = async (req: CustomRequest, res: Response) => {
  const { pinId } = req.params;
  const createdBy = req.user?.id;
  const { text } = req.body;

  const validateData = CommentSchema.parse({
    text,
    pinId,
    createdBy,
  });

  const pin = await pinModel.findById(validateData.pinId);

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  const comment = await commentModel.create({
    text: validateData.text,
    pinId: validateData.pinId,
    createdBy: validateData.createdBy,
  });

  pin.comments.push(comment._id);
  await pin.save();

  res
    .status(200)
    .json(new StandardResponse("Comment added successfully", comment));
};

//get all Comments for a pin
const getAllComments = async (req: CustomRequest, res: Response) => {
  const { pinId } = req.params;

  const pin = await pinModel.findById(pinId);

  if (!pin) {
    throw new CustomError("Pin not found", 404);
  }

  const comments = await commentModel
    .find({ pinId })
    .populate("createdBy", "username email");

  res
    .status(200)
    .json(new StandardResponse("Comments fetched successfully", comments));
};

//delete a comment
const deleteComment = async (req: CustomRequest, res: Response) => {
  const { commentId } = req.params;

  const comment = await commentModel.findById(commentId);

  if (!comment) {
    throw new CustomError("Comment not found", 404);
  }

  if (comment.createdBy.toString() !== req.user?.id) {
    throw new CustomError("Unauthorized to delete this comment", 403);
  }

  await comment.deleteOne();

  res
    .status(200)
    .json(new StandardResponse("Comment deleted successfully", null));
};

export { addComment, getAllComments, deleteComment };
