import { create } from "domain";
import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  pins?: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}

const BoardSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pin" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBoard>("Board", BoardSchema);
