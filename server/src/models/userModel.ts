import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  boards?: mongoose.Types.ObjectId[];
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
