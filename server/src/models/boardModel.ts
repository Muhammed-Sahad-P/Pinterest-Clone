import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  pins: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
}

const BoardSchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
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

BoardSchema.pre("save", function (next) {
  if (!this.pins) {
    this.pins = [];
  }
  next();
});

export default mongoose.model<IBoard>("Board", BoardSchema);
