import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.post("/login", loginUser);

export default router;