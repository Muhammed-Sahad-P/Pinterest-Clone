import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  profilePicture?: string;
  boards?: mongoose.Types.ObjectId[];
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  isBlocked?: boolean;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profilePicture: { type: String },
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
