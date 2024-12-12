import mongoose, { Schema, Document } from "mongoose";
import { pid } from "process";

export interface ISavedPin extends Document {
  pinId: mongoose.Types.ObjectId;
  savedBy: mongoose.Types.ObjectId;
}

const SavedPinSchema: Schema = new mongoose.Schema(
  {
    pinId: { type: mongoose.Schema.Types.ObjectId, ref: "Pin", required: true },
    savedBy: { type: mongoose.Types.ObjectId, ref: "Uer", required: true },
  },
  { timestamps: true }
);

SavedPinSchema.index({ pinId: 1, savedBy: 1 }, { unique: true });

export default mongoose.model<ISavedPin>("SavedPin", SavedPinSchema);
