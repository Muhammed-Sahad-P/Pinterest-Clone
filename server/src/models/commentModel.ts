import { text } from "body-parser";
import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  text: string;
  pinId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    pinId: { type: mongoose.Schema.Types.ObjectId, ref: "Pin", required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
