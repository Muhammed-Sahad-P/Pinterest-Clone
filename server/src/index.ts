import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connectDB from "./config/db";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
