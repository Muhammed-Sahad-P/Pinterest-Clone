import mongoose, { Schema, Document } from "mongoose";

export interface ILike extends Document {
  pinId: mongoose.Types.ObjectId;
  likedBy: mongoose.Types.ObjectId;
}

const LikeSchema: Schema = new mongoose.Schema(
  {
    pinId: { type: mongoose.Schema.Types.ObjectId, ref: "Pin", required: true },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILike>("Like", LikeSchema);
