import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { CustomError } from "../utils/error/customError";
import { RegisterSchema, LoginSchema } from "../utils/zodSchemas";
import { StandardResponse } from "../utils/standardResponse";

// Register a user
const register = async (req: Request, res: Response) => {
  const { username, email, password } = RegisterSchema.parse(req.body);

  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  await user.save();

  const response = {
    username: user.username,
    email: user.email,
  };

  res
    .status(201)
    .json(new StandardResponse("User created successfully", response));
};

// Login a user
const login = async (req: Request, res: Response) => {
  const { email, password } = LoginSchema.parse(req.body);

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY || "",
    {
      expiresIn: "1d",
    }
  );

  const response = {
    username: user.username,
    email: user.email,
    token,
  };

  res
    .status(200)
    .json(new StandardResponse("User logged in successfully", response));
};

export { register, login };
