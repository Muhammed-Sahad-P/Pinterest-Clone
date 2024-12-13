import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  profilePicture: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const EditUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  profilePicture: z.string().optional(),
  boards: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PinSchema = z.object({
  imageUrl: z.string().url("Invalid URL"),
  description: z.string().optional(),
  boardId: z.string().min(24, "Invalid board ID").optional(),
  createdBy: z.string().min(24, "Invalid user ID").optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const BoardSchema = z.object({
  name: z.string().min(3, "Board name must be at least 3 characters long"),
  description: z.string().optional(),
  createdBy: z.string().min(24, "Invalid user ID").optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CommentSchema = z.object({
  text: z.string().min(3, "Comment must be at least 3 characters long"),
  pinId: z.string().min(24, "Invalid pin ID"),
  createdBy: z.string().min(24, "Invalid user ID"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const LikeSchema = z.object({
  pinId: z.string().min(24, "Invalid pin ID"),
  likedBy: z.string().min(24, "Invalid user ID"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CategorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters long"),
  description: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const AdminSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
