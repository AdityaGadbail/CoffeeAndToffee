import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import supportRoutes from "./routes/supportRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const allowedOrigins = [
process.env.CLIENT_URL,
"http://localhost:5173"
].filter(Boolean);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/users", userRoutes);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Coffee & Toffee API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});