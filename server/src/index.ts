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
import { Server } from "socket.io";
import http from "http";
import startCronJob from "./jobs/cronJob";
import { setupScopeoConfig } from "./config/scopeoConfig";
import initializeScopeo, { scopeoErrorHandler } from "scopeo";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

setupScopeoConfig(); // Initialize Scopeo configuration
initializeScopeo(app);
startCronJob(); // Start the cron job for pinging (keep-alive) the server

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

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

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

connectDB();

scopeoErrorHandler(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { io };
