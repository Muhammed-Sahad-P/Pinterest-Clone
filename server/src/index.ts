import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.use(cors());

app.use("/api/auth", authRoutes);

app.use(globalErrorHandler);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
