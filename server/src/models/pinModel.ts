import mongoose, { Schema, Document } from "mongoose";

export interface IPin extends Document {
  imageUrl: string;
  description?: string;
  likeCount: number;
  boardId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const PinSchema: Schema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    description: { type: String },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IPin>("Pin", PinSchema);
