import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import authRoutes from "./routes/authRoutes";
import boardRoutes from "./routes/boardRoutes";
import pinRoutes from "./routes/pinRoutes";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";
import saveRoutes from "./routes/saveRoutes";
import userRoutes from "./routes/userRoutes";
import followRoutes from "./routes/followRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import searchRoutes from "./routes/searchRoutes";
import adminRoutes from "./routes/admin/adminRoutes";
import { CustomError } from "./utils/error/customError";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pins", pinRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/pins/like", likeRoutes);
app.use("/api/pins/save", saveRoutes);
app.use("/api/profile", userRoutes);
app.use("/api/users", followRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/search", searchRoutes);

app.use("*", (req, _res, next) => {
  next(new CustomError(`Cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
