import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { CustomError } from "../utils/error/customError";
import { RegisterSchema, LoginSchema } from "../utils/zodSchemas";
import { StandardResponse } from "../utils/standardResponse";
import mailSender from "../utils/mailSender";

// Register a user
const register = async (req: Request, res: Response) => {
  const { email, password, birthdate } = RegisterSchema.parse(req.body);

  const birthdateAsDate = new Date(birthdate);

  if (isNaN(birthdateAsDate.getTime())) {
    throw new CustomError("Invalid birthdate format", 400);
  }

  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    password: hashedPassword,
    birthdate: birthdateAsDate,
  });

  await user.save();

  const response = {
    email: user.email,
  };

  res
    .status(201)
    .json(new StandardResponse("User registered successfully", response));
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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY || "", {
    expiresIn: "1d",
  });

  const response = {
    email: user.email,
    token,
  };

  res
    .status(200)
    .json(new StandardResponse("User logged in successfully", response));
};

//forgot password
const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError("Email is required", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const resetToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY || "",
    {
      expiresIn: "10m",
    }
  );

  await mailSender(
    email,
    "Reset your password",
    `
	<div style="font-family: Arial, sans-serif; text-align: center;">
	  <h2>Reset your password</h2>
	  <p>Please click on the following link to reset your password:</p>
	  <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Reset password</a>
	  <p>expires in 10 minutes</p>
	  <p>Don't share this link with anyone!! </p>
	  <p>Thank you!</p>
	</div>
	`
  );

  res.status(200).json(new StandardResponse("Email sent successfully"));
};

//reset password
const resetPassword = async (req: Request, res: Response) => {
  const token = req.params.token;

  if (!token) {
    throw new CustomError("Token is required", 400);
  }

  const { newPassword } = req.body;

  if (!newPassword) {
    throw new CustomError("New password is required", 400);
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "") as {
    id: string;
  };

  const user = await User.findById(decodedToken.id);

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  await user.updateOne({ password: hashedPassword });

  res.status(200).json(new StandardResponse("Password reset successfully"));
};

export { register, login, forgotPassword, resetPassword };
