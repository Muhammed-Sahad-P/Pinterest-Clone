import mongoose, { Schema, Document } from "mongoose";

export interface IPin extends Document {
  imageUrl: string;
  description?: string;
  likeCount: number;
  saveCount: number;
  boardId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

const PinSchema: Schema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    description: { type: String, maxlength: 500 },
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
    saveCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PinSchema.index({ boardId: 1 });
PinSchema.index({ createdBy: 1 });

export default mongoose.model<IPin>("Pin", PinSchema);
