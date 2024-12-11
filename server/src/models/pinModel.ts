import mongoose, { Schema, Document } from "mongoose";

export interface IPin extends Document {
  imageUrl: string;
  description?: string;
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
  },
  { timestamps: true }
);

export default mongoose.model<IPin>("Pin", PinSchema);
